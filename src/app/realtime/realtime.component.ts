import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.scss']
})
export class RealtimeComponent implements OnInit, OnDestroy {
  lines = [];
  subs: Subscription;

  constructor(
    private socketService: SocketService
  ) { }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.subs = this.socketService.onNewProcessedLines().subscribe((data: any) => this.lines.push(data))
  }
}
