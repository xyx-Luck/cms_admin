<template>
    <div class="userList">
        <el-form :inline="true" :model="selectData" class="demo-form-inline">
            <el-form-item label="用户名">
                <el-input v-model="selectData.nickName" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="用户角色">
                <el-select v-model="selectData.role" label='全部' class="m-2" placeholder="请输入用户角色" size="large">
                    <el-option label="全部" :value=0 />
                    <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName"
                        :value="item.roleId" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查找</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="list" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="180" />
            <el-table-column prop="nickName" label="昵称" width="180" />
            <el-table-column prop="userName" label="用户名" />
            <el-table-column prop="" label="角色">
                <template #default="scope">
                    <el-button size="small" v-for="(val, index) in scope.row.role" :key="index" type="text">
                        {{ val.roleName }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column prop="" label="操作">
                <template #default="scope">
                    <el-button size="small" type="text" @click="editInfo(scope.row)">
                        编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 点击编辑的弹出框 -->
        <el-dialog v-model="isShow" title="修改用户信息">
            <el-form :model="isActive">
                <el-form-item label="用户名" label-width="50px">
                    <el-input v-model="isActive.nickName" autocomplete="off" />
                </el-form-item>
                <el-form-item label="角色" label-width="50px">
                    <el-select v-model="isActive.role" multiple placeholder="请选择角色">
                        <el-option 
                            v-for="(item,index) in roleList" 
                            :key="index" 
                            :label="item.roleName"
                            :value="item.roleId" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="isShow = false">取消</el-button>
                    <el-button type="primary" @click="confirmInfo">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import { getUserList, getRoleList } from '../request/api'
import { InitData, listInt } from '../type/user'
export default defineComponent({
    setup() {
        onMounted(() => {
            getUser()
            getRole()
        })
        //实例化InitData
        const data = reactive(new InitData())
        //获取用户列表
        const getUser = () => {
            getUserList().then(res => {
                data.list = res.data.data
            })
        }
        //获取角色列表
        const getRole = () => {
            getRoleList().then(res => {
                console.log(res.data.data)
                data.roleList = res.data.data;
            })
        }

        //点击搜索按钮执行搜索操作
        let arr: listInt[] = []
        const onSubmit = () => {
            // console.log(data.selectData.nickName)
            // console.log(data.selectData.role)
            if (data.selectData.nickName || data.selectData.role) {
                //单独搜索用户名
                if (data.selectData.nickName) {
                    arr = data.list.filter((v) => {
                        console.log(v)
                        return v.nickName.indexOf(data.selectData.nickName) !== -1
                    })
                }
                //单独搜索权限
                if (data.selectData.role) {
                    console.log('权限')
                    //data.selectData.nickName有值就从arr中筛选，否则就从data.list中筛选
                    arr = (data.selectData.nickName ? arr : data.list).filter((v) => {
                        console.log(v)
                        return v.role.find(item => item.role === data.selectData.role)
                    })
                }
            }
            data.list = arr;
        }

        //如果搜索框的内容清空了，数据恢复原样
        watch(
            [() => data.selectData.nickName, () => { data.selectData.role }],
            () => {
                if (data.selectData.nickName == '' || data.selectData.role == 0) {
                    //从新请求数据
                    getUser()
                }
            }
        )

        //点击编辑弹框
        
        const editInfo = (row: any) => {
            console.log(row.role)
            data.rowId=row.id
            data.isShow = true
            data.isActive = {
                id: row.id,
                nickName: row.nickName,
                role:row.role.map((item:any)=>item.role || item.roleName),
                userName: row.userName
            }
           
        }
        
        //点击确认
        const confirmInfo=()=>{
            // console.log(data.rowId,'rowID')
            // console.log(data.isActive)
            // console.log(data.list)
            //从data中找出id与rowid相同的一组数据
            let rowIdData:any=data.list.find(item=>item.id==data.rowId);
            
            rowIdData.nickName=data.isActive.nickName
            rowIdData.role=data.isActive.role
            //把rowIdData 赋值给data.list中id相同的项
            data.list.forEach(item=>{
                if(item.id===rowIdData.id){
                    rowIdData=item
                }
                 
            })
            // localStorage.setItem('userList',data.list)
            console.log(data.list)
            console.log(data.isActive)
            data.isShow=false;
        }
 

        return { ...toRefs(data), getUser, getRole, onSubmit, editInfo,confirmInfo }
    }
})
</script>

<style scoped>

</style>