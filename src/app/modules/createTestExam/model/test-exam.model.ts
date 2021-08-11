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


export interface ICauHoi{
    id: 0,
    parentId: 0,
    codeCauHoi: 0,
    tenCauHoi: string,
    noiDungCauHoi: string,
    chiaSeUsers: string,
    loaiCauHoi: string,
    trangThaiCauHoi: string,
    tongSoDiem: 0,
    tongThoiGian: 0,
    metadata: string
  }