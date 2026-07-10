import { io, Socket } from 'socket.io-client';
import { SOCKET_URL } from '../config/constants';
import { ClientToServerEvents, ServerToClientEvents } from '../config/types/socket';

class SocketService {
  private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

  public connect(token?: string): void {
    if (this.socket?.connected) return;

    // If a socket exists but isn't connected, clean it up first
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }

    this.socket = io(SOCKET_URL, {
      transports: ['polling', 'websocket'],
      autoConnect: true,
      auth: token ? { token } : undefined,
    });

    this.socket.on('connect', () => {
    });

    this.socket.on('connect_error', (err) => {
    });

    this.socket.on('disconnect', (reason) => {
    });
  }

  /** Convenience: connect with a JWT token for authenticated users. */
  public connectWithAuth(token: string): void {
    this.connect(token);
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.socket?.on(event, listener as any);
  }

  public off<T extends keyof ServerToClientEvents>(
    event: T,
    listener: ServerToClientEvents[T]
  ): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.socket?.off(event, listener as any);
  }
}

export const socketService = new SocketService();
