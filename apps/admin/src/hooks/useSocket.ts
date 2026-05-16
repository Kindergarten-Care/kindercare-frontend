import { useEffect } from 'react';
import { socketService } from '../services/SocketService';
import { ServerToClientEvents } from '../config/types/socket';

export const useSocket = <T extends keyof ServerToClientEvents>(
  event: T,
  handler: ServerToClientEvents[T]
) => {
  useEffect(() => {
    socketService.on(event, handler);
    return () => {
      socketService.off(event, handler);
    };
  }, [event, handler]);

  return {
    emit: socketService.emit.bind(socketService),
    socket: socketService.getSocket(),
  };
};
