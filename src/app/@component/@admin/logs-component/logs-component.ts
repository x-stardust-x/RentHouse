import { Component, inject, signal, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Log } from '../../../@interface/log';
import { LogService } from '../../../@service/log-service';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-logs-component',
  imports: [MatTableModule, MatPaginatorModule, DatePipe, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, FormsModule],
  templateUrl: './logs-component.html',
  styleUrl: './logs-component.scss',
})
export class LogsComponent {

  logsev = inject(LogService);
  LogData = signal<Log[]>([]);
  dataSource = new MatTableDataSource<Log>([]);

  startDate: Date | null = null;
  endDate: Date | null = null;

  filterValue = '';
  today : Date = new Date();

  constructor() {
    this.logsev.getLogs().subscribe(res => {
      console.log(res);

      this.LogData.set(res);
      this.dataSource.data = res;
    });
  }

  displayedColumns: string[] = ['name', 'action', 'ipAddress', 'createdAt'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.loadData();

    this.dataSource.filterPredicate = (data: any, filter: string) => {

      const f = JSON.parse(filter);

      // 🔍 keyword search
      const text = (
        data.name +
        data.action +
        data.ipAddress
      ).toLowerCase();

      const matchText = text.includes((f.keyword || '').toLowerCase());

      // 📅 date filter
      const created = new Date(data.createdAt);

      const matchStart =
        !f.startDate || created >= new Date(f.startDate);

      const matchEnd =
        !f.endDate || created <= new Date(f.endDate);

      return matchText && matchStart && matchEnd;
    };
  }

  loadData() {
    this.logsev.getLogs().subscribe(res => {
      this.dataSource.data = res.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      console.log(res);
    });
  }

  applyFilter(event: Event) {
    const keyword = (event.target as HTMLInputElement).value;

    this.updateFilter({ keyword });
  }
  applyDateFilter() {
    this.updateFilter({
      startDate: this.startDate,
      endDate: this.endDate
    });
  }
  updateFilter(partial: any) {

    const current = this.filterValue
      ? JSON.parse(this.filterValue)
      : {};

    const merged = {
      ...current,
      ...partial
    };

    this.filterValue = JSON.stringify(merged);

    this.dataSource.filter = this.filterValue;
  }
}
