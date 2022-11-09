<template>
    <div>
        <el-tree 
            :data="list" 
            show-checkbox 
            node-key="roleId" 
            :default-checked-keys="authority" 
            :props="{
                children: 'roleList',
                label: 'name',
            }" 
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { initData } from '../type/authority'
import { getAuthority } from '../request/api'
export default defineComponent({
    setup() {
        onMounted(() => {
            getauthority()
        })

        const route = useRoute();
        const params = route.params;
        const data = reactive(new initData(Number(params.id), JSON.parse(params.authority)));
        // const defaultProps = {
        //     children: 'roleList',
        //     label: 'name',
        // }
        //调用接口
        const getauthority = () => {
            getAuthority().then(res => {
                console.log(res.data.data);
                data.list = res.data.data
            })
        }
        console.log(data)
        return { ...toRefs(data), getauthority }
    }
})
</script>

<style scoped>

</style>