//封装接口

import server from './index'
//给data添加类型
interface logindata{
    username:string,
    password:string
}
//登录的接口
export function login(data:logindata){
    return server({
   url:"/login",
    method:'post',
    data
})}

//商品列表的接口
export function getGoodsList(){
   return server({
    url:'/getGoodsList',
    method:'get'
   })
}
//用户列表的接口
export function getUserList(){
   return server({
    url:'/getUserList',
    method:'get'
   })
}
//角色列表的接口
export function getRoleList(){
   return server({
    url:'/getRoleList',
    method:'get'
   })
}
//权限列表的接口
export function getAuthority(){
   return server({
    url:'/getAuthorityList',
    method:'get'
   })
}