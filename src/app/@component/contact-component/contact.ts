import { Component } from '@angular/core';
import { ContactService } from '../../@service/contact.service';
import { ContactRequest } from '../../@interface/contact.interface';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class ContactComponent {
  // 建立表單物件 (全部改小寫)
  formData: ContactRequest = {
    name: '',
    email: '',
    subject: '',
    content: ''
  };
constructor(private contactService: ContactService, private http: HttpClient) {}


  // 在你的 contact.component.ts 中
onSubmit() {
  // 簡單檢查一下有沒有填資料
  if (!this.formData.name || !this.formData.content) {
    alert('請填寫完整資訊');
    return;
  }


this.http.post('https://localhost:7215/api/Contact', this.formData)
    .subscribe({
      next: (res) => {
        alert('訊息已送出，請注意信箱來信！');
        this.formData = { name: '', email: '', subject: '', content: '' }; // 清空表單
      },
      error: (err) => {
        console.error('送出失敗', err);
        alert('系統忙碌中，請稍後再試');
      }
    });
}
}


