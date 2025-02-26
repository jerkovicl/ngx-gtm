import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { InjectionToken, makeEnvironmentProviders, PLATFORM_ID, type EnvironmentProviders, inject, provideEnvironmentInitializer } from '@angular/core';

function googleTagManagerScript(id: string): string {
  return ` window.dataLayer = window.dataLayer || []; (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=1;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${id}');`;
}

const GTM_CONFIG_TOKEN = new InjectionToken<GoogleTagManagerConfiguration>('gtmConfig');

export type GoogleTagManagerConfiguration = Readonly<{
  /**
   * Whether or not this module is enabled. Useful for disabling the analytics script in development environments.
   */
  enabled: boolean;
  /**
   * The Google Tag Manager ID.
   */
  id: string;
}>;

/**
 * Builds configured providers for injecting Google Tag Manager scripts during
 * application initialization.
 * @usageNotes
 * ```typescript
 *  provideGtm({
 *    enabled: true,
 *    id: 'id',
 *  })
 * ```
 * @param config The runtime configuration for the Google Tag Manager providers.
 * @returns the Google Tag Manager providers.
 */
export function provideGtm(config: GoogleTagManagerConfiguration): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: GTM_CONFIG_TOKEN, useValue: config },
    provideEnvironmentInitializer(() => {
        const initializerFn = ((platformId: object, d: Document, { enabled, id }: GoogleTagManagerConfiguration) => {
        return () => {
          if (isPlatformBrowser(platformId) && enabled) {
            const s = d.createElement('script');
            s.type = 'text/javascript';
            s.innerHTML = googleTagManagerScript(id);
            d.head.appendChild(s);
          }
        };
      })(inject(PLATFORM_ID), inject(DOCUMENT), inject(GTM_CONFIG_TOKEN));
        return initializerFn();
      }),
  ]);
}
