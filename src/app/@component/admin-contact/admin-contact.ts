import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // 🌟 DatePipe 是為了你在 HTML 用的時間格式化
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../@service/alert-service';

@Component({
  selector: 'app-admin-contact',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule], // 🌟 記得這裡要放 DatePipe
  templateUrl: './admin-contact.html', // 確保這裡對應你的 HTML 檔名
  styleUrl: './admin-contact.scss'
})
export class AdminContactComponent implements OnInit {

  // 宣告 messages 變數 (使用 Angular Signal，預設為空陣列)
  messages = signal<any[]>([]);
  selectedMsg: any = null;
  replyText: string = '';
  isBatchMode: boolean = false; // 是否進入批次模式
  selectedIds: number[] = [];
  constructor(private http: HttpClient,private alert: AlertService) {}

  ngOnInit() {
    this.loadMessages(); // 元件一載入就去抓資料
  }

  //  去後端抓資料的方法
  loadMessages() {

    this.http.get<any[]>('https://localhost:7215/api/Contact')
      .subscribe({
        next: (data) => {
          console.log('抓到的留言：', data);
          this.messages.set(data); // 把後端傳來的資料塞給畫面
        },
        error: (err) => {
          console.error('抓取留言失敗', err);
        }
      });

  }
  sendReply() {
    if (!this.replyText.trim()) {
      this.alert.warning('請先輸入回信內容！');
      return;
    }

    // 準備要寄給後端的包裹 (對應 C# 的 ReplyDto)
    const payload = {
      id: this.selectedMsg.id,
      replyContent: this.replyText
    };
    // 呼叫寄信 API
    this.http.post('https://localhost:7215/api/Contact/Reply', payload)
      .subscribe({
        next: (res: any) => {
          this.alert.success('回信成功寄出囉！');
          this.loadMessages();
        },
        error: (err) => {
          console.error('回信失敗', err);
          this.alert.error('寄信失敗，請檢查後端錯誤訊息。');
        }
      });
  }
  // 新增刪除留言的方法
  async deleteMessage(id: number) {
    // 跳出確認視窗，避免誤觸

    var res = await this.alert.confirm(`確定要刪除這筆留言嗎？刪除後無法復原喔！`);

    if (res.isConfirmed) {

      // 呼叫後端的 HttpDelete API (注意網址後面要接上 id)
      this.http.delete(`https://localhost:7215/api/Contact/${id}`)
        .subscribe({
          next: (res: any) => {
            this.alert.success('刪除成功！');
            this.loadMessages(); // 刪除完馬上重新抓取資料，畫面就會瞬間更新
          },
          error: (err) => {
            console.error('刪除失敗', err);
            this.alert.error('刪除失敗，請稍後再試。');
          }
        });
    }
  }


// 2. 新增一個方法，當按鈕被點擊時，把那筆留言存進去
openModal(msg: any) {
  this.selectedMsg = msg;
}
// 🌟 2. 判斷某個 ID 是否被勾選 (給 HTML 綁定用)
  isSelected(id: number): boolean {
    return this.selectedIds.includes(id);
  }

  // 🌟 3. 單一勾選/取消勾選的邏輯
  toggleSelection(id: number, event: any) {
    if (event.target.checked) {
      this.selectedIds.push(id); // 勾選就加入陣列
    } else {
      this.selectedIds = this.selectedIds.filter(i => i !== id); // 取消勾選就從陣列剔除
    }
  }

  // 🌟 4. 全選/取消全選的邏輯
  toggleAll(event: any) {
    if (event.target.checked) {
      // 把畫面上所有留言的 ID 都塞進陣列
      this.selectedIds = this.messages().map(m => m.id);
    } else {
      this.selectedIds = []; // 清空陣列
    }
  }

  // 🌟 5. 執行批次刪除
  async batchDelete() {
    if (this.selectedIds.length === 0) {
      this.alert.toastInfo('請先勾選要刪除的資料！');
      return;
    }

    var res = await this.alert.confirm(`確定要一口氣刪除這 ${this.selectedIds.length} 筆資料嗎？刪了就回不來囉！`);

    if (res.isConfirmed) {
      // 呼叫我們剛寫好的 BatchDelete API
      this.http.post('https://localhost:7215/api/Contact/BatchDelete', this.selectedIds)
        .subscribe({
          next: (res: any) => {
            this.alert.success('批次刪除成功！');
            this.selectedIds = []; // 🌟 刪除成功後，清空勾選名單
            this.loadMessages();   // 重新整理表格
          },
          error: (err) => {
            console.error('批次刪除失敗', err);
            this.alert.error('刪除失敗，請稍後再試。');
          }
        });
    }
}
toggleBatchMode() {
    this.isBatchMode = !this.isBatchMode; // 把開關反轉 (true 變 false，false 變 true)

    // 如果是「退出」批次管理模式，順便把已經勾選的名單清空，比較安全
    if (!this.isBatchMode) {
      this.selectedIds = [];
    }
  }

}
