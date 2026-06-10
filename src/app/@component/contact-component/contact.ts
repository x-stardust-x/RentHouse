import { Component } from '@angular/core';
import { ContactService } from '../../@service/contact.service';
import { ContactRequest } from '../../@interface/contact.interface';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
// 🌟 引入美美的彈窗套件
import Swal from 'sweetalert2';
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



onSubmit() {

    if (!this.formData.name || !this.formData.content || !this.formData.email) {

      Swal.fire({
        title: '資料不完整',
        text: '請填寫完整資訊再送出喔！',
        icon: 'warning',
        confirmButtonText: '我知道了',
        confirmButtonColor: '#f39c12'
      });
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.formData.email)) {
      Swal.fire({
        title: '信箱格式錯誤',
        text: '請輸入有效的 Email 格式 (例如: example@email.com)',
        icon: 'error',
        confirmButtonText: '重新輸入',
        confirmButtonColor: '#d33'
      });
      return;
    }

    this.http.post('https://localhost:7215/api/Contact', this.formData)
      .subscribe({
        next: (res) => {
          // 🌟 升級 2：成功通知彈窗
          Swal.fire({
            title: '寄送成功！',
            text: '訊息已送出，請注意信箱來信！',
            icon: 'success',
            confirmButtonText: '確定',
            confirmButtonColor: '#28a745'
          });

          this.formData = { name: '', email: '', subject: '', content: '' }; // 清空表單
        },
        error: (err) => {
          console.error('送出失敗', err);

          // 🌟 升級 3：失敗錯誤彈窗
          Swal.fire({
            title: '系統發生錯誤',
            text: '系統忙碌中，請稍後再試。',
            icon: 'error',
            confirmButtonText: '關閉',
            confirmButtonColor: '#d33'
          });
        }
      });
}
}


