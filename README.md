# Ngx-Gtm

[![Build](https://github.com/jerkovicl/ngx-gtm/actions/workflows/ci.yml/badge.svg)](https://github.com/jerkovicl/ngx-gtm/actions/workflows/ci.yml)
[![Release](https://github.com/jerkovicl/ngx-gtm/actions/workflows/release.yml/badge.svg)](https://github.com/jerkovicl/ngx-gtm/actions/workflows/release.yml)
![NPM Downloads](https://img.shields.io/npm/dt/@jerkovicl/ngx-gtm)

Angular library that automatically injects the script tag required to use [Google Tag Manager](https://tagmanager.google.com/?hl=en).

## Installation

npm:

```bash
npm install --save @jerkovicl/ngx-gtm
```

Yarn:

```bash
yarn add @jerkovicl/ngx-gtm
```

## Compatibility

| Version | Angular Version |
| ------- | --------------- |
| `1.x.x` | `>=16 <18`      |

## Features

- Automatically inject scripts for [Google Tag Manager](https://tagmanager.google.com/?hl=en).

## Usage

Import `provideGtm` from `ngx-gtm` and pass the required configuration when using it as a provider during application bootstrap.

```typescript
import { provideGtm } from '@jerkovicl/ngx-gtm';

@NgModule({
  providers: [
    provideGtm({
      enabled: true,
      id: 'tag-id',
    }),
  ],
})
export class AppModule {}

// Or if you are using standalone bootstrap

bootstrapApplication(AppComponent, {
  providers: [
    provideGtm({
      enabled: true,
      id: 'tag-id',
    }),
  ],
});
```

Checkout the demo application in the [demo](./apps/demo) folder for a working example.

The supported configuration parameters are:

| Property | Requirement | Description                                                                                         |
| -------- | ----------- | --------------------------------------------------------------------------------------------------- |
| enabled  | Required    | Whether or not this module is enabled. Useful for disabling the script in development environments. |
| id       | Required    | Your Google Tag Manager tag Id. This is found in the Google Tag Manager settings page.              |

## License

MIT
