import { Component } from '@angular/core';
import { ContactService } from '../../@service/contact.service';
import { ContactRequest } from '../../@interface/contact.interface';
import { FormsModule } from '@angular/forms';

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
constructor(private contactService: ContactService) {}
  

  onSubmit() {
  
  this.contactService.sendContactMessage(this.formData).subscribe({
    // 2. 幫 res 加上 : any
    next: (res: any) => {
      alert('訊息已送出！');
      
      this.formData = { name: '', email: '', subject: '', content: '' };
    },
    // 3. 幫 err 加上 : any
    error: (err: any) => {
      console.error(err);
      alert('送出失敗，請檢查後端連線');
    }
  });
}
  }

