"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApiService = exports.AbstractRestService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var cache_item_model_1 = require("src/app/shared/models/cache-item.model");
var environment_1 = require("src/environments/environment");
var AbstractRestService = /** @class */ (function () {
    function AbstractRestService(http) {
        this.http = http;
    }
    return AbstractRestService;
}());
exports.AbstractRestService = AbstractRestService;
var ApiService = /** @class */ (function (_super) {
    __extends(ApiService, _super);
    function ApiService(http, cachingService) {
        var _this = _super.call(this, null) || this;
        _this.http = http;
        _this.cachingService = cachingService;
        _this.cache = [];
        // set environment
        _this.apiUrl = environment_1.environment.apis["default"].url + '/api/app';
        return _this;
    }
    /**
     * Gets http client service
     * @param api
     * @param [params]
     * @param [isCache]
     * @returns get
     */
    ApiService.prototype.get = function (api, 
    // tslint:disable-next-line:ban-types
    params, isCache) {
        if (isCache === void 0) { isCache = false; }
        var url = this.apiUrl + api;
        var header;
        if (isCache) {
            header = new http_1.HttpHeaders({ 'cache-response': 'true' });
        }
        header = new http_1.HttpHeaders({ 'accept': 'text/plain' });
        return this.http.get(url, {
            headers: header
        });
    };
    /**
     * Puts http client service
     * @param api
     * @param data
     * @returns put
     */
    ApiService.prototype.put = function (api, data) {
        return this.http.put(this.apiUrl + api, data);
    };
    /**
     * Posts http client service
     * @param api
     * @param data
     * @param isRead
     * @returns post
     */
    ApiService.prototype.post = function (api, data) {
        return this.http.post(this.apiUrl + api, data, {});
    };
    /**
     * API delete for single && multiple record
     * @param api
     * @param [body]
     * @returns delete
     */
    ApiService.prototype["delete"] = function (api, body) {
        var options = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json'
            }),
            body: body
        };
        return this.http["delete"](this.apiUrl + api, options);
    };
    /**
     * Parses param url
     * @param params
     * @returns
     */
    // tslint:disable-next-line:ban-types
    ApiService.prototype.parseParamURL = function (params) {
        var urlParams = new http_1.HttpParams();
        var _loop_1 = function (prop) {
            if (params.hasOwnProperty(prop)) {
                if (!params[prop] || params[prop].length === 0) {
                    delete params[prop];
                }
                else {
                    if (Array.isArray(params[prop])) {
                        params[prop].forEach(function (element) {
                            urlParams = urlParams.append(prop, String(element));
                        });
                    }
                    else {
                        urlParams = urlParams.append(prop, String(params[prop]));
                    }
                }
            }
        };
        for (var prop in params) {
            _loop_1(prop);
        }
        return urlParams;
    };
    /**
     * Gets cached item
     * @param url
     * @returns cached item
     */
    ApiService.prototype.getCachedItem = function (url) {
        return this.cache.find(function (item) { return item.url === url; });
    };
    /**
     * Caches data
     * @param [url]
     * @param [data]
     */
    ApiService.prototype.cacheData = function (url, data) {
        if (url === void 0) { url = ''; }
        if (data === void 0) { data = null; }
        var cachedItem = this.getCachedItem(url);
        if (!cachedItem) {
            cachedItem = new cache_item_model_1.CacheItem();
            cachedItem.url = url;
            this.cache.push(cachedItem);
        }
        cachedItem.data = data;
    };
    ApiService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ApiService);
    return ApiService;
}(rxjs_1.BehaviorSubject));
exports.ApiService = ApiService;
