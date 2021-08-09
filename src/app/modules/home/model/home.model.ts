export interface IMetaData{
    idNguoiTao: number;
    ngayTao: string;
    idNguoiCapNhat: number;
    ngayCapNhat: string;
    idNguoiDelete: number;
    ngayDelete: string;
    isDelete: boolean;
    isHienThi: boolean;
    status: boolean;
}

export interface ICategory {
    CategoryID: number;
    CategoryName: string;
    Description: string;
}

export interface IProduct extends IMetaData {
    ProductID: number;
    ProductName: string;
    SupplierID: number;
    CategoryID: number;
    QuantityPerUnit: string;
    UnitPrice: number;
    UnitsInStock: number;
    UnitsOnOrder: number;
    ReorderLevel: number;
    Discontinued: boolean;
    Category: ICategory;
}

export interface IKhachHang extends IMetaData {
    id: 5;
    hoTen: string;
    ngaySinh: string;
    gioiTinh: string;
    diaChi: string;
    soDienThoai: string;
    email: string;
    loaiKhachHang: string;
}