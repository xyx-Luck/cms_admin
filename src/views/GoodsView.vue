<template>
    <div class="goodsList">
        <el-form :inline="true" :model="selectData" class="demo-form-inline">
            <el-form-item label="标题">
                <el-input v-model="selectData.title" placeholder="请输入标题" />
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="selectData.introduce" placeholder="请输入描述" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查找</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="dataList.comList" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="180" />
            <el-table-column prop="title" label="标题" width="180" />
            <el-table-column prop="introduce" label="描述" />
        </el-table>
        <!-- 分页 -->
        <div class="example-pagination-block">
            <el-pagination @size-change='sizeChanege' @current-change='currentChange' layout="prev, pager, next"
                :total="selectData.count * 2" />
        </div>
    </div>
</template>

<script lang="ts">
//toRefs 解构对象
import { defineComponent, reactive, toRefs, computed,watch } from 'vue'
import { getGoodsList } from '../request/api'
import { ListInt, InitData } from '../type/goods'
export default defineComponent({
    setup() {
        const data = reactive(new InitData())
        getGoodsList().then((res) => {
            // console.log(res)
            data.list = res.data.data
            data.selectData.count = res.data.data.length
        })
        //默认一页显示几条
        const sizeChanege = (size: number) => {
            data.selectData.pagesize = size
        }
        //默认当前显示第几页
        const currentChange = (currentpage: number) => {
            data.selectData.page = currentpage
        }
        const dataList = reactive({
            comList: computed(() => {
                return data.list.slice(
                    (data.selectData.page - 1) * data.selectData.pagesize,
                    data.selectData.page * data.selectData.pagesize
                )
            })
        })
        //搜索
        const onSubmit = () => {
            // debugger;
            let arr: ListInt[] = [];
            if (data.selectData.title || data.selectData.introduce) {
                //如果搜索的是标题
                if (data.selectData.title) {
                    arr = data.list.filter((v) => {
                        return v.title.indexOf(data.selectData.title) !== -1
                    })
                }
                //如果搜索的是介绍
                if (data.selectData.introduce) {
                    arr = data.list.filter((v) => {
                        return v.title.indexOf(data.selectData.introduce) !== -1
                    })
                }


                data.list = arr;
                //设置总页数
                data.selectData.count = data.list.length
            }
        }
        //监听：标题和介绍都位空时，数据复原
        watch(
            [() =>data.selectData.title, () => data.selectData.introduce],
            () => {
                if (data.selectData.title == '' && data.selectData.introduce == '') {
                    getGoodsList().then((res) => {
                        data.list = res.data.data
                        data.selectData.count = res.data.data.length
                    })
                }
            }
        )
        return { ...toRefs(data), sizeChanege, currentChange, dataList, onSubmit }
    }
})
</script>

<style scoped>
.example-pagination-block+.example-pagination-block {
    margin-top: 10px;
}
</style>