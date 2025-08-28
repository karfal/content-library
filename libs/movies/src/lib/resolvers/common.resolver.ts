import { inject, ProviderToken } from '@angular/core';
import { ActivatedRouteSnapshot, ParamMap, ResolveFn } from '@angular/router';

import { Observable } from 'rxjs';

/**
 * Common function that can be used by all resolvers who return an T[] or T.
 * @param serviceInjectionToken{ProviderToken}
 */
export const searchAndGetResolveFn = <T>(serviceInjectionToken: ProviderToken<{ search$: (paramMap: ParamMap) => Observable<T[]>, get$: (slug: string) => Observable<T> }>):
  ResolveFn<T[] | T> => (route: ActivatedRouteSnapshot) => {

  const service = inject(serviceInjectionToken);

  if (route.paramMap.has('slug')) {
    return service.get$(String(route.paramMap.get('slug')));
  }

  return service.search$(route.queryParamMap);
};
