import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(private socket: Socket) { }

  getLines() {
    this.socket.emit('listLines');
  }
  
  onNewProcessedLines() {
    return this.socket.fromEvent('newProcessedLine');
  }
}