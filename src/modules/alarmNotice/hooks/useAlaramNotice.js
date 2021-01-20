import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alaramNoticeConnection } from '@modules/alarmNotice';
import { alarmSocket } from '@commons/http/ws';

export function useAlaramNoticeConnection() {
  const dispatch = useDispatch();
  const pending = useSelector((state) => state.pending[alaramNoticeConnection.TYPE]);
  const error = useSelector((state) => state.error[alaramNoticeConnection.TYPE]);

  useEffect(() => {
    if (!alarmSocket.ws || alarmSocket.ws?.readyState !== 1) {
      alarmSocket
        .onConnection()
        .setOnmessage((event) => dispatch(alaramNoticeConnection.request({ event })))
        .setOnerror(
          function (event) {
            if (this.ws.readyState === 3 && this.connectionRetry <= 1) {
              setTimeout(() => {
                this.onConnection(this.ws);
                this.connectionRetry++;
              }, 2000);
            } else dispatch(alaramNoticeConnection.failure({ event }));
          }.bind(alarmSocket)
        );
    }
    return () => {
      alarmSocket.onClose();
    };
  }, [dispatch]);

  return { pending, error };
}
