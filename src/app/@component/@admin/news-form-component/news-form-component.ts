import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../../@service/news-service';

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

  form!: FormGroup;
  imageUrl: string | null = null;
  imageFile: File | null = null;
  id: number | null = null;
  isEdit = false;

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
    });
  }

  // 4. submit（create / update 共用）
  onSubmit() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value;

    if (this.isEdit && this.id) {

      // update
      this.newsService.update(this.id, data).subscribe(() => {
        alert('更新成功');
        this.router.navigate(['/admin/news']);
      });

    } else {

      // create
      this.newsService.create(data).subscribe(() => {
        alert('新增成功');
        this.router.navigate(['/admin/news']);
      });

    }
  }
}
