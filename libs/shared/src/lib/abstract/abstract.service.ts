import { Injectable } from '@angular/core';
import { ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

/**
 * This is an abstract service that provides a basic operations structure.
 * It is designed to be extended by other services to implement common functionalities.
 * The service is generic, allowing it to work with any type T[] or T.
 */
@Injectable()
export abstract class AbstractService<T> {

  /**
   * Return an array of instances
   * @param paramMap{ParamMap}
   */
  abstract search$(paramMap: ParamMap): Observable<T[]>;

  /**
   * Return a single instance
   * @param slug{string}
   */
  abstract get$(slug: string): Observable<T>;

  /**
   * Return an array of all instances
   */
  abstract getAll$(): Observable<T[]>;

}
