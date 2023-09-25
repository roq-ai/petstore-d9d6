import { PetInterface } from 'interfaces/pet';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SaleInterface {
  id?: string;
  pet_id: string;
  user_id: string;
  sale_date?: any;
  price: number;
  payment_method: string;
  created_at?: any;
  updated_at?: any;

  pet?: PetInterface;
  user?: UserInterface;
  _count?: {};
}

export interface SaleGetQueryInterface extends GetQueryInterface {
  id?: string;
  pet_id?: string;
  user_id?: string;
  payment_method?: string;
}
