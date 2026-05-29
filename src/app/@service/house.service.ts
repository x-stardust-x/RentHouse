import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  private apiUrl = 'https://localhost:7215/api/RentHouse';

  constructor(private http: HttpClient) { }

  // ==========================================
  // 🏠 共居空間 (House) 相關 API
  // ==========================================

  // 🔍 查 (Read) - 取得所有房屋
  getHouses() {
    return this.http.get<any[]>(this.apiUrl);
  }

  // 🆕 新 (Create) - 新增房屋
  createHouse(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  // ✏️ 修 (Update) - 修改房屋
  updateHouse(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // 核准API
  approveHouseStatus(id: number) {
    return this.http.put(`${this.apiUrl}/Approve/${id}`, {});
  }

  // 🗑️ 刪 (Delete) - 刪除房屋
  deleteHouse(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

  // ==========================================
  // 🖼️ 共用圖片 (Image) 相關 API
  // ==========================================
  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('files', file); // ⚠️ 這裡的 'files' 必須跟 C# Swagger 上寫的參數名稱一模一樣！

    // 注意網址！上傳是呼叫 /api/Image/Upload
    return this.http.post('https://localhost:7215/api/Image/Upload', formData);
  }

  // 呼叫設定首圖的 API
  setCoverImage(imageId: number) {
    return this.http.put(`${this.apiUrl}/Image/${imageId}/SetCover`, {});
  }

  addImageRecord(data: any) {
    return this.http.post(`${this.apiUrl}/Image/AddRecord`, data);
  }

  deleteImage(imageId: number) {
    return this.http.delete(`${this.apiUrl}/Image/${imageId}`);
  }

  // ==========================================
  // 🛠️ 資產 / 技能 (Product) 相關 API
  // ==========================================

  // 🌟 0. 取得所有資產 (給「前台探索大廳」專用，有防護牆，只會撈出 IsOnline = true)
  getProducts() {
    return this.http.get<any[]>('https://localhost:7215/api/RentProduct');
  }

  // 1. 新增資產申請
  createProduct(data: any) {
    return this.http.post('https://localhost:7215/api/RentProduct', data);
  }

  // 2. 綁定資產的照片 (注意網址是 RentProduct/Image/AddRecord)
  addProductImageRecord(data: any) {
    return this.http.post('https://localhost:7215/api/RentProduct/Image/AddRecord', data);
  }

  // 3. 取得所有資產給管理員 (會撈出所有狀態，包含待審核)
  getAllProductsForAdmin() {
    return this.http.get<any[]>(`https://localhost:7215/api/RentProduct/AllForAdmin`);
  }

  // 4. 核准資產
  approveProduct(id: number) {
    return this.http.put(`https://localhost:7215/api/RentProduct/Approve/${id}`, {});
  }

  // 5. 強制下架資產 (變成待審核)
 takeDownProduct(id: number) {
  return this.http.delete(`https://localhost:7215/api/RentProduct/TakeDown/${id}`);
}

  // 6. 刪除資產 (退回申請時使用)
  deleteProduct(id: number) {
    return this.http.delete(`https://localhost:7215/api/RentProduct/${id}`);
  }

}
