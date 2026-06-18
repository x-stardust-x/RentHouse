import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  success(title: string, text?: string) {
    return Swal.fire({
      icon: 'success',
      title,
      text,
      confirmButtonText: '確定',
    });
  }

  error(title: string, text?: string) {
    return Swal.fire({
      icon: 'error',
      title,
      text,
      confirmButtonText: '確定',
    });
  }

  warning(title: string, text?: string) {
    return Swal.fire({
      icon: 'warning',
      title,
      text,
      confirmButtonText: '確定',
    });
  }

  toastSuccess(title: string) {
    return Swal.fire({
      toast: true,
      position: 'bottom-start',
      icon: 'success',
      title,
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  }

  confirm(
    title: string,
    text?: string,
    confirmButtonText = '確定',
    cancelButtonText = '取消'
  ) {
    return Swal.fire({
      icon: 'warning',
      title,
      text,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      reverseButtons: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d'
    });
  }
}
