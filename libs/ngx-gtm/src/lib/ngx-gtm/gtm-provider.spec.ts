import { DOCUMENT } from '@angular/common';
import { getTestBed } from '@angular/core/testing';
import { provideGtm } from './gtm-provider';

describe('provideGtm', () => {
  const id = 'id';

  afterEach(() => {
    fetchScript()?.remove();
  });

  describe('when enabled', () => {
    configureEnvironment(true);

    it('should bootstrap and inject gtm script', () => {
      const script = fetchScript();
      expect(script).toBeTruthy();
      expect(script.async).toEqual(1);
    });
  });

  describe('when disabled', () => {
    configureEnvironment(false);

    it('should bootstrap but not inject gtm script', () => {
      const script = fetchScript();
      expect(script).toBeFalsy();
    });
  });

  function fetchScript() {
    const document = getTestBed().inject(DOCUMENT);
    return document.querySelector(
      `script[src='https://www.googletagmanager.com/gtm.js?id=${id}']`
    ) as HTMLScriptElement;
  }

  function configureEnvironment(enabled: boolean) {
    beforeEach(() => {
      getTestBed().configureTestingModule({
        providers: [provideGtm({ enabled, id })],
      });
    });
  }
});
