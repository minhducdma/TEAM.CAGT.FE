export const AppConstant = {
    VERSION: 'v1',
    SSO_LINK: arg =>
        `/auth/realms/vnu/protocol/openid-connect/auth?kc_locale=vi&scope=openid&response_type=code&client_id=hrm&redirect_uri=${arg}/oauth/callback`,
    SSO_LOGOUT: arg => `/auth/realms/vnu/protocol/openid-connect/logout?kc_locale=vi&redirect_uri=${arg}/login?kc_locale%3Dvi`,
    NO_AVATAR_URL: './assets/images/no-avatar.jpg',
    CURRENT_LANG: 'current_lang',
    TITLE: 'Thông báo',
    TYPE: {
        SUCCESS: 'success',
        DANGER: 'danger',
        WARNING: 'warning',
    },
};

export const FOLDER = {
    
};

export const PageConfig = {
    buttonCount: 5,
    pageSizes: [10, 20, 50],
    previousNext: true,
};

export const ModalDeleteConfig = {
    title: 'Bạn có muốn xóa dòng này ?',
    content: '<b style="color: red;">Xác nhận xóa</b>',
    yes: 'Đồng ý',
    no: 'Không',
};

export const ReziseTable = 142;
