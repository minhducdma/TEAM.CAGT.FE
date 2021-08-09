import { environment } from "src/environments/environment";
export const UrlConstant = {
    BASE_URL: environment.apiUrl,

    API: {
        KHACH_HANG: '/khach-hangs'
    },

    ROUTE: {
        LOGIN: '/login',
        // DASHBOARD: '/management/dashboard',
        // FORBIDEN: '/management/403',
        // PROFILE: '/management/profile',
        // MODULE: '/management/module',
    }
}