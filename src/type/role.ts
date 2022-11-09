//定义角色数据的接口
export interface roleInt {
    authority: number[],
    roleId: number
    roleName: string
}

export class initData{
    list:roleInt[]=[]
}