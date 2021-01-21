import queryInfoData from './queryInfoData';
import queryFilter from '@commons/http/queryFilter';
import { alarmSocket } from '@commons/http/ws';

export const alarmReadNotice = (data = {}) => {
  const queryData = queryInfoData['alarmReadNotice'];
  const info = queryFilter({ queryData, originDataInfo: { ...data, action: 'read' } });
  return alarmSocket.ws.send(JSON.stringify(info));
};

export const alarmNoReturn = (data = {}) => {
  const queryData = queryInfoData['alarmNoReturn'];
  const info = queryFilter({ queryData, originDataInfo: { ...data, action: 'done' } });
  return alarmSocket.ws.send(JSON.stringify(info));
};
