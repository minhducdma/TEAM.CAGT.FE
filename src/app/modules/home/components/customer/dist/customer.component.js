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
exports.CustomerComponent = void 0;
var core_1 = require("@angular/core");
var kendo_angular_dialog_1 = require("@progress/kendo-angular-dialog");
var app_constant_1 = require("src/app/core/constants/app.constant");
var enum_constant_1 = require("src/app/core/constants/enum.constant");
var url_constant_1 = require("src/app/core/constants/url.constant");
var base_list_component_1 = require("../../base/base-list.component");
var form_customer_component_1 = require("./form-customer/form-customer.component");
var CustomerComponent = /** @class */ (function (_super) {
    __extends(CustomerComponent, _super);
    function CustomerComponent(injector, api, authService, modal) {
        var _this = _super.call(this, injector) || this;
        _this.api = api;
        _this.authService = authService;
        _this.modal = modal;
        _this.url = url_constant_1.UrlConstant.API.KHACH_HANG;
        _this.queryOption = {
            filter: null,
            trangThaiKhachHangs: null,
            loaiKhachHangs: null,
            nguonKhachHangs: null,
            nguoiPhuTrachs: null,
            sapXep: null,
            thoiGianTu: 1,
            thoiGianDen: 1
        };
        _this.listDMLoaiKH = [];
        _this.listDMNhanVienPhuTrach = [];
        return _this;
    }
    CustomerComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.getDanhMucLoaiKH();
        this.getDanhMucNVPhuTrach();
    };
    CustomerComponent.prototype.showFormCreateOrUpdate = function () {
        var _this = this;
        this.opened = true;
        var windowRef = this.windowService.open({
            title: this.translate.get('HOME.CUS.CAP_NHAT'),
            content: form_customer_component_1.FormCustomerComponent,
            width: 850,
            top: 10,
            autoFocusedElement: 'body'
        });
        var param = windowRef.content.instance;
        param.action = this.action;
        param.model = this.model;
        windowRef.result.subscribe(function (result) {
            if (result instanceof kendo_angular_dialog_1.WindowCloseResult) {
                _this.opened = false;
                _this.loadItems();
            }
        });
    };
    CustomerComponent.prototype.loadItems = function () {
        var _this = this;
        this.apiService.get(url_constant_1.UrlConstant.API.KHACH_HANG, {}).subscribe(function (res) {
            if (res != null && res.items.length > 0) {
                _this.gridData = {
                    data: res.items,
                    total: res.totalCount
                };
            }
            else {
                _this.gridData = {
                    data: [],
                    total: 0
                };
            }
        });
    };
    CustomerComponent.prototype.removeHandler = function (dataItem) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.id);
        this.removeSelectedHandler();
    };
    CustomerComponent.prototype.removeSelectedHandler = function () {
        var _this = this;
        if (this.selectionIds.length > 0) {
            var body = {
                id: this.selectionIds[0]
            };
            this.modal.confirm({
                nzTitle: app_constant_1.ModalDeleteConfig.title,
                nzContent: app_constant_1.ModalDeleteConfig.content,
                nzOkText: app_constant_1.ModalDeleteConfig.yes,
                nzOkType: 'danger',
                nzOnOk: function () {
                    _this.apiService["delete"](_this.url)
                        .subscribe(function (res) {
                        _this.selectionIds = [];
                        _this.loadItems();
                    });
                },
                nzCancelText: app_constant_1.ModalDeleteConfig.no,
                nzOnCancel: function () { }
            });
        }
    };
    CustomerComponent.prototype.editHandler = function (dataItem) {
        this.action = enum_constant_1.ActionEnum.UPDATE;
        this.model = dataItem;
        this.showFormCreateOrUpdate();
    };
    CustomerComponent.prototype.onExportExcel = function () {
        this.authService.navigateToLogin();
    };
    CustomerComponent.prototype.getDanhMucLoaiKH = function () {
        var _this = this;
        this.apiService.get(url_constant_1.UrlConstant.API.DANH_MUC + "?tenBang=GetKhachHangs&tenCot=LoaiKhachHang").subscribe(function (res) {
            _this.listDMLoaiKH = res;
        });
    };
    CustomerComponent.prototype.getDanhMucNVPhuTrach = function () {
        var _this = this;
        this.apiService.get(url_constant_1.UrlConstant.API.DANH_MUC + "?tenBang=GetKhachHangs&tenCot=NhanVienPhuTrach").subscribe(function (res) {
            _this.listDMNhanVienPhuTrach = res;
        });
    };
    CustomerComponent = __decorate([
        core_1.Component({
            selector: 'app-customer',
            templateUrl: './customer.component.html'
        })
    ], CustomerComponent);
    return CustomerComponent;
}(base_list_component_1.BaseListComponent));
exports.CustomerComponent = CustomerComponent;
