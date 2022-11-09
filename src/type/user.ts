export interface listInt {
    id: number,
    nickName: string
    role: roleInt[],
    userName: string
}

//定义role的接口
interface roleInt {
    role: number,
    roleName: string
}

//定义一个搜索用户信息的接口
interface selectDataInt {
    nickName: string,
    role: number
    
}

//定义一个用来接收角色信息的接口
interface roleDataInt {
    authority: number[],
    roleId: number
    roleName: string
}
//定义编辑框回显的数据接口
interface activeInt{
    id:number,
    nickName: string
    role: number[],
    userName:string
}
//定义一个类
export class InitData {
    // 搜索用户信息
    selectData: selectDataInt = {
        nickName: '',
        role: 0
    }
    //list为listInt类型，并设置默认值为[]
    list: listInt[] = []
    //定义角色信息
    roleList: roleDataInt[] = []
    isShow=false//控制弹出框的显示与隐藏
    isActive:activeInt={//回显的数据
        id:0,
        nickName:'',
        role:[],
        userName:''
    }
    rowId=0;
}