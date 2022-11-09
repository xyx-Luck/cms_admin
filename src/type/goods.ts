//定义商品的接口
export interface ListInt{
    id: number,
    introduce: string,
    title: string,
    userId: number,
}
//定义搜索数据的接口
interface selectDataInt{
    title:string,
    introduce:string,
    //设置分页的数据
    page:number,//页码
    count:number,//总条数
    pagesize:number//默认一页展示几条
}
export class InitData{
    //搜索的数据
    selectData:selectDataInt={
        title:'',
        introduce:'',
        page:1,
        count:0,
        pagesize:5
    }
    //商品列表的数据
    list:ListInt[]=[]//展示的内容的数据
}