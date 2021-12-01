import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { Observable, of } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(private socket: Socket) { }

  join(room) {
    this.socket.emit('joim_room', room);
  }

  getSocket(): Socket {
    return this.socket
  }
  
  onNewProcessedLines() {
    return this.socket.fromEvent('newProcessedLine');
  }

  onPushNotification() {
    return this.socket.fromEvent('PUSH');
  }
}