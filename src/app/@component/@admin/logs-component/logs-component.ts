import { Component, inject, signal, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Log } from '../../../@interface/log';
import { LogService } from '../../../@service/log-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-logs-component',
  imports: [MatTableModule,MatPaginatorModule,DatePipe],
  templateUrl: './logs-component.html',
  styleUrl: './logs-component.scss',
})
export class LogsComponent {

  logsev = inject(LogService);
  LogData = signal<Log[]>([]);
  dataSource = new MatTableDataSource<Log>([]);

  constructor() {
    this.logsev.getLogs().subscribe(res =>{
      console.log(res);

      this.LogData.set(res);
      this.dataSource.data = res;
    });
  }

  displayedColumns: string[] = ['id', 'userId', 'action', 'ipAddress', 'createdAt'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
