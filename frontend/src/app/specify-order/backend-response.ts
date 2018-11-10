import { Purchasable } from '../purchasable';

export interface BackendResponse {
  success: boolean;
  data: Purchasable;
}
