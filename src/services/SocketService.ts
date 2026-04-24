import { io, Socket } from 'socket.io-client';
import { SOCKET_URL } from '../config/constants';
import { ClientToServerEvents, ServerToClientEvents } from '../config/types/socket';

class SocketService {
  private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

  public connect(): void {
    if (this.socket) return;

    this.socket = io(SOCKET_URL, {
      transports: ['websocket'],
      autoConnect: true,
    });

    this.socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public getSocket(): Socket<ServerToClientEvents, ClientToServerEvents> | null {
    return this.socket;
  }

  public emit<T extends keyof ClientToServerEvents>(
    event: T,
    ...args: Parameters<ClientToServerEvents[T]>
  ): void {
    this.socket?.emit(event, ...args);
  }

  public on<T extends keyof ServerToClientEvents>(
    event: T,
    listener: ServerToClientEvents[T]
  ): void {
    this.socket?.on(event, listener as any);
  }

  public off<T extends keyof ServerToClientEvents>(
    event: T,
    listener: ServerToClientEvents[T]
  ): void {
    this.socket?.off(event, listener as any);
  }
}

export const socketService = new SocketService();
