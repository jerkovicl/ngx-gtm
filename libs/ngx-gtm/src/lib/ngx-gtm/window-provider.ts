import { InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken<Window>('Global window object', {
  providedIn: 'root',
  factory: () => window,
});
