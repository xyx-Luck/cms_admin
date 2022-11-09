<template>
    <div>
        <el-button type="primary" @click='open'>新增</el-button>
        <el-table :data="list" border style="width: 100%">
            <el-table-column prop="roleId" label="ID" width="180" />
            <el-table-column prop="roleName" label="角色名" width="180" />
            <el-table-column prop="" label="操作">
                <template #default="scope">
                    <el-button size="small" link type="primary" @click="handleEdit(scope.row)">修改权限</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { getRoleList } from '../request/api'
import { initData, roleInt } from '../type/role'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
export default defineComponent({
    setup() {
        onMounted(() => {
            getRole()

        })
        const data = reactive(new initData())
        const router = useRouter()
        //调用角色的接口
        const getRole = () => {
            getRoleList().then(res => {
                console.log(res.data.data)
                data.list = res.data.data
            })
        }
        //修改权限
        const handleEdit = (row: roleInt) => {
            //跳转到权限列表页面并携带参数
            console.log(row)
            router.push({
                name: 'authority',
                params: {
                    authority:JSON.stringify(row.authority),
                    // authority:row.authority,
                    id: row.roleId,
                }
            })
        }
        //点击新增
        const open = () => {
            ElMessageBox.prompt('请输入角色名称', '新增', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputErrorMessage: 'Invalid Email',
            }).then(({ value }) => {
                console.log(value)
                //把输入的值添加到table中
                data.list.push({ roleId: data.list.length + 1, roleName: value, authority: [] })
                localStorage.setItem('roleList', JSON.stringify(data.list))
                //    let val:string=localStorage.getItem('roleList')
                //    data.list=JSON.parse(val)
                ElMessage({
                    type: 'success',
                    message: '成功'
                })
            }).catch(() => {
                ElMessage({
                    type: 'info',
                    message: '失败',
                })
            })

        }


        return { getRole, ...toRefs(data), handleEdit, open }
    }
})
</script>

<style scoped>

</style>