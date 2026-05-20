import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../../@service/news-service';
import { LogService } from '../../../@service/log-service';
import { Authservice } from '../../../@service/authservice';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-news-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './news-form-component.html',
})
export class NewsFormComponent implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private newsService = inject(NewsService);
  private logservice = inject(LogService);
  private authservice = inject(Authservice);

  form!: FormGroup;
  imagePreview = signal<string>('');
  id: number | null = null;
  isEdit = false;
  ipAdrress = signal<string>('');

  ngOnInit(): void {

    // 1. 建 form
    this.form = this.fb.group({
      adminId: [1, Validators.required],
      category: ['', Validators.required],
      status: [0, Validators.required],
      title: ['', Validators.required],
      intro: [''],
      content: [''],
      seoTitle: [''],
      seoDesc: [''],
      cover: [''],
    });

    // 2. 判斷是否 edit
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.id = Number(idParam);
      this.isEdit = true;
      this.loadData(this.id);
    }
  }

  // 3. 載入資料（edit 才會用）
  loadData(id: number) {
    this.newsService.getById(id).subscribe(res => {
      this.form.patchValue(res);
      this.imagePreview.set(res.cover);
    });
  }

  // 4. submit（create / update 共用）
  onSubmit() {
    this.authservice.getClientIPAddress().pipe(

      switchMap(ip => {

        const log = {
          userId: 1,
          action: this.isEdit
            ? `更新消息 id:${this.id}`
            : '新增一筆新聞',
          ipAddress: ip,
        };

        const data = this.form.value;

        const request = this.isEdit && this.id
          ? this.newsService.update(this.id, data)
          : this.newsService.create(data);

        return request.pipe(
          switchMap(() => this.logservice.postLog(log))
        );
      })

    ).subscribe(() => {

      alert(this.isEdit ? '更新成功' : '新增成功');

      this.router.navigate(['/admin/news']);

    });
  }
  onFileChange(event: Event) {

    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    const file = input.files[0];

    // 預覽
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview.set(reader.result as string);
    };

    reader.readAsDataURL(file);

    // 上傳圖片
    this.uploadImage(file);

  }
  uploadImage(file: File) {

    const formData = new FormData();

    formData.append('file', file);

    this.newsService.uploadImage(formData)
      .subscribe((res: any) => {
        // 存 URL 到 form
        this.form.patchValue({
          cover: res.url
        });

      });

  }
}
