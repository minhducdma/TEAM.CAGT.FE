import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, mapTo, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UrlConstant } from '../constants/url.constant';
import { IResponseData } from 'src/app/shared/models/response-data.model';
import { ITokenInfo, IUserInfo } from 'src/app/shared/auth/models/user-token.model';
import { AuthStore } from 'src/app/shared/auth/authStore/auth.store';
import { SecurityUtil } from 'src/app/shared/utils/security';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HandlerService } from './handler-error.service';


@Injectable({ providedIn: 'root' }) 
export class AuthService {
    private apiUrl: string | undefined;
    private jwtToken = 'jwt-token';
    private identityKey = 'keyLogin';
    private helper = new JwtHelperService();
    
    constructor(
        private http: HttpClient,
        private cookieService: CookieService,
        private authStore: AuthStore,
        private router: Router,
        private handlerError: HandlerService,
    ){}

    doLogout(model: any) {
        return this.http
            .post(`${this.apiUrl + UrlConstant.API.ACL_ACCOUNT}/Logout`, model)
            .subscribe(
                () => {
                    // if result is oke: token is revoke -> clear access token and refresh token in browser
                    this.doBackLogin();
                },
                () => {
                    this.doBackLogin();
                }
            );
    }

    doBackLogin() {
        localStorage.removeItem(this.jwtToken);
        // redirect login page
        this.router.navigate([UrlConstant.ROUTE.LOGIN]);
    }
    
    doRefreshToken(requestRefreshToken : any): Observable<ITokenInfo> {
        const url = `${this.apiUrl + UrlConstant.API.ACL_ACCOUNT}/Refresh-Token`;
        return this.http
            .post<IResponseData<ITokenInfo>>(url, requestRefreshToken)
            .pipe(
                map((res : any) => res.result),
                catchError(this.handlerError.handleError)
            );
    }

    doLogin(requestLogin: any)
    {
        const header = new HttpHeaders({ Post: 'true' });
        const url = `${this.apiUrl + UrlConstant.API.ACL_ACCOUNT}/Login`;
        // this.loader.setLoading(true, url);
        return this.http
            .post(url, requestLogin, {
                headers: header,
            })
            .pipe(
                map((res: any) => {
                    // set user token
                    if (res.result) {
                        this.setUserToken(res.result);
                        // update
                        this.authStore.setCurrentUser(this.getUserInfo());
                        return true;
                    }
                    return false;
                })
            );
    }

    setUserToken(userToken: ITokenInfo) {
        localStorage.setItem(this.jwtToken, JSON.stringify(userToken));
    }

    getUserInfo() {
        const accessToken = this.getAccessToken();
        if (!accessToken) {
            return;
        }
        return this.helper.decodeToken(accessToken);
    }

    getAccessToken() {
        const userToken = JSON.parse(
            localStorage.getItem(this.jwtToken) || '{}'
        ) as ITokenInfo;
        if (!userToken) {
            return;
        }

        return userToken.accessToken;
    }

    getExpiredTime() {
        const userToken = JSON.parse(
            localStorage.getItem(this.jwtToken) || '{}'
        ) as ITokenInfo;
        if (!userToken) {
            return;
        }

        return userToken.expiresIn;
    }

    isAuthorized() {
        return this.getAccessToken();
    }

    hasPermissionAccess() {
        return true;
    }

    isExcuteRefreshToken() {
        let expiredTime = this.getExpiredTime() || 0;
        let refreshTime = this.getTimeSkipUtilForRefreshToken() || 0;
        // Nếu token lớn hơn 5 phút thì refresh token
        return (
            expiredTime - refreshTime > 5 * 60
        );
    }

    tokenExpired() {
        const accessToken = this.getAccessToken();
        if (!accessToken) {
            return;
        }

        const userInfo = this.helper.decodeToken(accessToken) as IUserInfo;
        if (!userInfo) {
            return;
        }

        const expiryRemaining = userInfo.exp || 0 - Math.floor(new Date().getTime() / 1000);
        // delay 5s chờ refresh token khi chuyển page
        return expiryRemaining > -5;
    }

    setCookieKeyLogin(value: string) {
        this.cookieService.set(this.identityKey, value);
    }

    getCookieKeyLogin() {
        const key = this.cookieService.get(this.identityKey);
        if (key) {
            return key;
        }

        const newKey = SecurityUtil.generateGuid();
        this.setCookieKeyLogin(newKey);
        return newKey;
    }

    clearAll() {
        localStorage.clear();
    }

    private getTimeSkipUtilForRefreshToken() {
        const accessToken = this.getAccessToken();
        if (!accessToken) {
            return;
        }

        const userInfo = this.helper.decodeToken(accessToken) as IUserInfo;
        if (!userInfo) {
            return;
        }

        let expriedTime = userInfo.exp || 0;

        return expriedTime - Math.floor(new Date().getTime() / 1000);
    }

    private setRequestLogin(url: string, request: any) {
        return this.http.post(url, request).pipe(
            map((res: any) => {
                // set user token
                if (res.result) {
                    this.setUserToken(res.result);

                    // update
                    this.authStore.setCurrentUser(this.getUserInfo());
                    return true;
                }
                return false;
            })
        );
    }

    getRefreshToken() {
        const userToken = JSON.parse(
            localStorage.getItem(this.jwtToken) || '{}'
        ) as ITokenInfo;
        if (!userToken) {
            return;
        }

        return userToken.refreshToken;
    }
 


}