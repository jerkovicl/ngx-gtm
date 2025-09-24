import 'zone.js';

import 'zone.js/testing';

import { getTestBed } from '@angular/core/testing';
// import '@angular/localize/init';

import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv({ errorOnUnknownElements: true, errorOnUnknownProperties: true });
getTestBed().resetTestEnvironment();
getTestBed().initTestEnvironment(BrowserTestingModule, platformBrowserTesting(), {
  teardown: { destroyAfterEach: true },
});
