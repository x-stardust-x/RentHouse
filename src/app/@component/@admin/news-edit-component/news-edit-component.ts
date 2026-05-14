import { NewsService } from './../../../@service/news-service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-news-edit-component',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './news-edit-component.html',
  styleUrl: './news-edit-component.scss',
})
export class NewsEditComponent {
  public newsId: number = 0;
  public newsForm!: FormGroup;
  private newsService = inject(NewsService);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    // 在這裡可以使用 ActivatedRoute 來獲取路由參數 newsId
    // 例如：
    const route = inject(ActivatedRoute);
    this.newsId = Number(route.snapshot.paramMap.get('id')) || 0;
  }

  ngOnInit(): void {
    // 在這裡可以根據 newsId 加載新聞數據
    // 例如：
    this.newsForm = this.fb.group({
      adminId: [1, Validators.required],
      category: ['', Validators.required],
      status: [1, Validators.required],
      title: ['', Validators.required],
      intro: [''],
      content: [''],
      seoTitle: [''],
      seoDesc: [''],
    });
    this.newsService.getById(this.newsId).subscribe(news => {
      console.log(news);
      // 將新聞數據綁定到表單中
      this.newsForm.patchValue(news);
    });
  }

  // 在這裡可以添加保存新聞的方法
  saveNews() {
  //   // 根據表單數據創建或更新新聞
  }
  onSubmit() {
    // 在這裡處理表單提交，例如調用 saveNews 方法
    const formData = this.newsForm.getRawValue();
    this.newsService.update(this.newsId, formData).subscribe(() => {
      // 更新成功後可以導航回新聞列表頁面
      this.router.navigate(['/admin/news']);
    });
  }
}
