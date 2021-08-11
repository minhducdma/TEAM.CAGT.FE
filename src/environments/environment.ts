import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'SiPM',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://apisipm.cagt.top',
    redirectUri: baseUrl,
    clientId: 'SiPM_App',
    responseType: 'code',
    scope: 'offline_access openid profile role email phone SiPM',
    requireHttps: false,
    // strictDiscoveryDocumentValidation: false,
    // skipIssuerCheck: true,
  },
  apis: {
    default: {
      url: 'https://apisipm.cagt.top',
      // urlConstant: 'https://apisipm.cagt.top/api/app',
      rootNamespace: 'SiPM',
    },
  },
} as Environment;
