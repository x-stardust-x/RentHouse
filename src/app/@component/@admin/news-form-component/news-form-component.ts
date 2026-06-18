import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../../@service/news-service';
import { LogService } from '../../../@service/log-service';
import { Authservice } from '../../../@service/authservice';
import { switchMap } from 'rxjs';
import { AlertService } from '../../../@service/alert-service';

@Component({
  selector: 'app-news-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './news-form-component.html',
  styleUrl: './news-form-component.scss'
})
export class NewsFormComponent implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private newsService = inject(NewsService);
  private logservice = inject(LogService);
  private authservice = inject(Authservice);
  private alert = inject(AlertService);

  isSubmitting = signal(false);
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

    this.newsService.getById(id).subscribe({

      next: res => {

        this.form.patchValue(res);
        this.imagePreview.set(res.cover);

      },

      error: err => {

        console.error(err);

        this.alert.error(
          '讀取失敗',
          '無法取得消息資料'
        );

        this.router.navigate(['/admin/news']);
      }

    });

  }

  // 4. submit（create / update 共用）
  onSubmit() {

    if (this.isSubmitting()) {
      return;
    }

    if (this.form.invalid) {
      this.alert.warning(
        '資料未填寫完整',
        '請確認必填欄位皆已填寫'
      );
      return;
    }

    this.isSubmitting.set(true);

    this.authservice.getClientIPAddress().pipe(

      switchMap(ip => {

        const title = this.form.get('title')?.value ?? '未命名消息';

        const log = {
          userId: this.authservice.getAdminId() ?? 0,
          action: this.isEdit
            ? `更新消息: ${title}`
            : `新增消息: ${title}`,
          ipAddress: ip,
        };

        const data = this.form.value;

        const request =
          this.isEdit && this.id
            ? this.newsService.update(this.id, data)
            : this.newsService.create(data);

        return request.pipe(
          switchMap(() => this.logservice.postLog(log))
        );
      })

    ).subscribe({

      next: async () => {

        await this.alert.toastSuccess(
          this.isEdit ? '更新成功' : '新增成功'
        );

        this.router.navigate(['/admin/news']);
      },

      error: (err) => {

        this.isSubmitting.set(false);

        this.alert.error(
          this.isEdit ? '更新失敗' : '新增失敗',
          err.error?.message ?? '請稍後再試'
        );
      }

    });

  }
  onFileChange(event: Event) {

    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    const file = input.files[0];

    if (file.size > 5 * 1024 * 1024) {

      this.alert.warning(
        '圖片過大',
        '請選擇 5MB 以下的圖片'
      );

      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview.set(reader.result as string);
    };

    reader.readAsDataURL(file);

    this.uploadImage(file);
  }
  uploadImage(file: File) {

    const formData = new FormData();

    formData.append('file', file);

    this.newsService.uploadImage(formData)
      .subscribe({

        next: (res: any) => {

          this.form.patchValue({
            cover: res.url
          });

        },

        error: err => {

          console.error(err);

          this.alert.error(
            '圖片上傳失敗',
            err.error?.message ?? '請重新上傳'
          );

        }

      });

  }
}
