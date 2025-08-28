import { Params } from '@angular/router';

export interface IMenu {
  link: string;
  name: string;
  params?: Params;
  icon?: string;
}
