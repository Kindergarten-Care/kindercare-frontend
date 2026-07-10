export interface NotificationPayload {
  notifId:    number;
  userId:     number;
  title:      string;
  message:    string;
  type:       string;
  isRead:     0 | 1;
  isCritical: 0 | 1;
  dataPayload: string;
  createdAt:  number;
  updatedAt:  number;
}

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  /** Fired whenever a new notification is created for the authenticated user */
  new_notification: (notification: NotificationPayload) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  /** Join a private room so the server can target events at this user */
  join_room: (room: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
