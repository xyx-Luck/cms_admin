export interface listInt {
    name: string,
    roleId: number,
    roleList?: listInt[],//?代表可选
    viewRole?: string,
}

//定义一个类
export class initData {
    id: number
    authority: number[]
    constructor(id: number, authority: number[]) {
        this.id = id;
        this.authority = authority
    }
    list:listInt[]=[]
}