import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAppConfig } from './app-config.model';
import { AppConstant } from '../constants/app.constant';
import { environment } from 'src/environments/environment';

@Injectable()
export class AppConfig {
    static settings: IAppConfig;

    constructor(private http: HttpClient) {}

    load() {
        const jsonFile = `_config/config.${environment.application.name}.json?v=${AppConstant.VERSION}`;
        return new Promise<void>((resolve, reject) => {
            this.http
                .get(jsonFile)
                .toPromise()
                .then((response: IAppConfig) => {
                    AppConfig.settings = response as IAppConfig;
                    resolve();
                })
                .catch((response: any) => {
                    reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
                });
        });
    }

    getConfig() {
        return AppConfig.settings;
    }
}
