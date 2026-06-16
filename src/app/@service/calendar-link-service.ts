import { Injectable } from '@angular/core';

export interface CalendarEventInfo {
  title: string;
  startAt: string | Date;
  endAt: string | Date;
  location?: string;
  details?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CalendarLinkService {
  buildGoogleCalendarUrl(event: CalendarEventInfo): string {
    const title = encodeURIComponent(event.title || '預約行程');
    const details = encodeURIComponent(event.details || '');
    const location = encodeURIComponent(event.location || '');

    const start = this.toGoogleLocalDateTime(event.startAt);
    const end = this.toGoogleLocalDateTime(event.endAt);

    return [
      'https://calendar.google.com/calendar/render?action=TEMPLATE',
      `text=${title}`,
      `dates=${start}/${end}`,
      `ctz=Asia/Taipei`,
      `details=${details}`,
      `location=${location}`
    ].join('&');
  }

  openGoogleCalendar(event: CalendarEventInfo): void {
    const url = this.buildGoogleCalendarUrl(event);
    window.open(url, '_blank');
  }

  private toGoogleLocalDateTime(value: string | Date): string {
    const date = value instanceof Date ? value : this.parseDate(value);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    return `${yyyy}${mm}${dd}T${hh}${min}${ss}`;
  }

  private parseDate(value: string): Date {
    const normalized = String(value)
      .trim()
      .replace(/\//g, '-')
      .replace(' ', 'T');

    return new Date(normalized);
  }
}
