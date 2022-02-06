import {ClientModel} from '../../client.model';
import {CoachModel} from '../../../coach/coach.model';

export interface ClientPtModel{
  id: number;
  client: ClientModel;
  coach: CoachModel;
  startDate: Date;
  endDate: Date;
  time: string;
  sessions: number;
  payment: number;
  balance: number;
  paymentMethod: string;
  paymentDate: Date;
  remarks: string;
}
