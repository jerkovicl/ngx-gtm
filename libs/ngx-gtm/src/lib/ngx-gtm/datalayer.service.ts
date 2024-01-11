import { inject, Injectable } from '@angular/core';
import { WINDOW } from './window-provider';

export interface GtmTag {
  event: string; // event name, default is 'page'
  pageName: string; // NavigationEnd urlAfterRedirects
  data?: Record<string,any>; // extra data to send
}
/**
 * For usage with Google Tag Manager to push dataLayer events
 *
 * @export
 * @class DataLayerService
 */
@Injectable({
  providedIn: 'root',
})
export class DataLayerService {
  private readonly window: Window = inject(WINDOW);

  private pingHome(obj: Record<string,any>): void {
    if (obj) (<any>this.window)['dataLayer']?.push(obj);
  }

  //list of all dataLayer methods
  logPageView(item: GtmTag): void {
    const hit: GtmTag = {
      ...item,
      event: 'page',
    };
    this.pingHome(hit);
  }

  logCustomEvent(item: Record<string, any>): void {
    this.pingHome(item);
  }

  logCustomDimensionTest(value: any): void {
    const hit = {
      event: 'custom-dimension',
      value: value,
    };
    this.pingHome(hit);
  }
}
