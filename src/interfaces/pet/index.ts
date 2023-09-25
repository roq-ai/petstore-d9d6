import { PurchaseInterface } from 'interfaces/purchase';
import { SaleInterface } from 'interfaces/sale';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PetInterface {
  id?: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  purchase?: PurchaseInterface[];
  sale?: SaleInterface[];
  user?: UserInterface;
  _count?: {
    purchase?: number;
    sale?: number;
  };
}

export interface PetGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  species?: string;
  breed?: string;
  user_id?: string;
}
