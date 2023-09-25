import { GetQueryInterface } from 'interfaces';

export interface PetProfileInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface PetProfileGetQueryInterface extends GetQueryInterface {
  id?: string;
}
