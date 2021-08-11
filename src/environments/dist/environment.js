"use strict";
exports.__esModule = true;
exports.environment = void 0;
var baseUrl = 'http://localhost:4200';
exports.environment = {
    production: false,
    application: {
        baseUrl: baseUrl,
        name: 'SiPM',
        logoUrl: ''
    },
    oAuthConfig: {
        issuer: 'https://apisipm.cagt.top',
        redirectUri: baseUrl,
        clientId: 'SiPM_App',
        responseType: 'code',
        scope: 'offline_access openid profile role email phone SiPM',
        requireHttps: false
    },
    apis: {
        "default": {
            url: 'https://apisipm.cagt.top',
            // urlConstant: 'https://apisipm.cagt.top/api/app',
            rootNamespace: 'SiPM'
        }
    }
};
