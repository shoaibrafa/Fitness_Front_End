import {ClientModel} from '../../client.model';
import {MembershipModel} from '../../../membership/membership.model';

export interface ClientMembershipModel{
  client: ClientModel;
  client_id: string;
  membership: MembershipModel;
  start_date: Date;
  end_date: Date;
  payment: number;
  balance: number;
  payment_date: Date;
  payment_method: string;
  remarks: string;
}
