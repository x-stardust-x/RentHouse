import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  // ⚠️ 關鍵提醒：請務必去確認你 C# Swagger 網址上的 Port 號！
  // 如果你的不是 44368，請把這行數字改成你的！
  private apiUrl = 'https://localhost:7215/api/RentHouse';

  constructor(private http: HttpClient) { }

  // 🔍 查 (Read) - 取得所有房屋
  getHouses()
  {
    return this.http.get<any[]>(this.apiUrl);
  }

  // 🆕 新 (Create) - 新增房屋
  createHouse(data: any)
  {
    return this.http.post(this.apiUrl, data);
  }

  // ✏️ 修 (Update) - 修改房屋
  updateHouse(id: number, data: any)
  {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // 🗑️ 刪 (Delete) - 刪除房屋
  deleteHouse(id: number)
   {

    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
//  圖片上傳相關 API //
  uploadImage(file: File)
  {
    const formData = new FormData();
    formData.append('files', file); // ⚠️ 這裡的 'files' 必須跟 C# Swagger 上寫的參數名稱一模一樣！

    // 注意網址！上傳是呼叫 /api/Image/Upload
    return this.http.post('https://localhost:44368/api/Image/Upload', formData);
  }

  // 呼叫設定首圖的 API
  setCoverImage(imageId: number)
  {
    return this.http.put(`${this.apiUrl}/Image/${imageId}/SetCover`, {});
  }

  addImageRecord(data: any)
  {
    return this.http.post(`${this.apiUrl}/Image/AddRecord`, data);
  }

  deleteImage(imageId: number)
  {
    return this.http.delete(`${this.apiUrl}/Image/${imageId}`);
  }


}
