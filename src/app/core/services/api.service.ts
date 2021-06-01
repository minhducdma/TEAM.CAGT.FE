import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { BehaviorSubject, Observable } from 'rxjs';
import { CacheItem, ICacheItem } from 'src/app/shared/models/cache-item.model';
import { IResponseData } from 'src/app/shared/models/response-data.model';
import { UrlConstant } from '../constants/url.constant';
import { CachingService } from './caching.service';

export abstract class AbstractRestService<T> {
    constructor(protected http: HttpClient) {}
}

@Injectable({
    providedIn: 'root',
})
export class ApiService extends BehaviorSubject<GridDataResult> {
    private apiUrl: string;

    private cache: ICacheItem[] = [];
    public loading: boolean;

    constructor(private http: HttpClient, private cachingService: CachingService) {
        super(null);
        // set environment
        this.apiUrl = UrlConstant.BASE_URL;
    }

    /**
     * Gets http client service
     * @param api
     * @param [params]
     * @param [isCache]
     * @returns get
     */
    get(
        api: string,
        // tslint:disable-next-line:ban-types
        params?: Object,
        isCache: boolean = false
    ): Observable<IResponseData<any>> {
        let url: string = this.apiUrl;
        let header: HttpHeaders;
        if (isCache) {
            header = new HttpHeaders({ 'cache-response': 'true' });
        }

        return this.http.get<IResponseData<any>>(url, {
            headers: header,
        });
    }

    /**
     * Puts http client service
     * @param api
     * @param data
     * @returns put
     */
    put(api: string, data: any): Observable<IResponseData<any>> {
        return this.http.put<IResponseData<any>>(this.apiUrl + api, data);
    }

    /**
     * Posts http client service
     * @param api
     * @param data
     * @param isRead
     * @returns post
     */
    post(api: string, data: any): Observable<IResponseData<any>> {
        return this.http.post<IResponseData<any>>(this.apiUrl + api, data, {});
    }

    /**
     * API delete for single && multiple record
     * @param api
     * @param [body]
     * @returns delete
     */
    delete(api: string, body?: any): Observable<any> {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body,
        };
        return this.http.delete(this.apiUrl + api, options);
    }


    /**
     * Parses param url
     * @param params
     * @returns
     */
    // tslint:disable-next-line:ban-types
    private parseParamURL(params: Object) {
        let urlParams = new HttpParams();

        for (const prop in params) {
            if (params.hasOwnProperty(prop)) {
                if (!params[prop] || params[prop].length === 0) {
                    delete params[prop];
                } else {
                    if (Array.isArray(params[prop])) {
                        params[prop].forEach(element => {
                            urlParams = urlParams.append(prop, String(element));
                        });
                    } else {
                        urlParams = urlParams.append(prop, String(params[prop]));
                    }
                }
            }
        }
        return urlParams;
    }

    /**
     * Gets cached item
     * @param url
     * @returns cached item
     */
    private getCachedItem(url: string): CacheItem {
        return this.cache.find(item => item.url === url);
    }

    /**
     * Caches data
     * @param [url]
     * @param [data]
     */
    private cacheData(url: string = '', data: any = null) {
        let cachedItem: CacheItem = this.getCachedItem(url);
        if (!cachedItem) {
            cachedItem = new CacheItem();
            cachedItem.url = url;
            this.cache.push(cachedItem);
        }
        cachedItem.data = data;
    }
}
