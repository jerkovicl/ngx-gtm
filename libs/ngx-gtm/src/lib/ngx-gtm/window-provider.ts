
import { inject, InjectionToken, DOCUMENT } from '@angular/core';

export const WINDOW = new InjectionToken<Window>('Global window object', {
  providedIn: 'root',
  factory: (): Window => {
    const { defaultView } = inject(DOCUMENT);

    if (!defaultView) {
      throw new Error('Window is not available');
    }

    return defaultView;
  },
});
