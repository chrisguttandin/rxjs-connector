import { TClientEvent } from './client-event';
import { TRequestEvent } from './request-event';

export type TWebSocketEvent = TClientEvent | TRequestEvent;
