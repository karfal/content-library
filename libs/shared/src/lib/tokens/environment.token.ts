import { InjectionToken } from '@angular/core';

import { IEnvironmentModel } from '../models/environment.model';

export const ENVIRONMENT: InjectionToken<IEnvironmentModel> = new InjectionToken<IEnvironmentModel>('ENVIRONMENT');
