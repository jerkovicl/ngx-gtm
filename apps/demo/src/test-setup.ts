import 'zone.js';

import 'zone.js/testing';

import { getTestBed } from '@angular/core/testing';
// import '@angular/localize/init';

import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv({ errorOnUnknownElements: true, errorOnUnknownProperties: true });
getTestBed().resetTestEnvironment();
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
  teardown: { destroyAfterEach: true },
});
