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

  successTime(title: string, text?: string) {
    return Swal.fire({
      icon: 'success',
      title,
      text,
      confirmButtonText: '確定',
      timer: 1500,
      timerProgressBar: true
    });
  }

  toastSuccess(title: string, num: number = 1) {
    if (num == 1) {
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
    else {
      return Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon: 'success',
        title,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        theme: 'dark'
      });
    }
  }

  toastInfo(title: string, background = '#ffffff') {
    return Swal.fire({
      toast: true,
      position: 'bottom-start',
      icon: 'info',
      title,
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      background,
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
