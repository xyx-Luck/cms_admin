<template>
    <div id="login-box">
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="70px"
            class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username" type="username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
            </el-form-item>

            <el-form-item class="form-btn">
                <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { login } from '../request/api'
//给ruleForm定义接口
interface loginForm {
    password: string,
    username: string
}
export default defineComponent({
    setup() {

        const ruleForm: loginForm = reactive({
            password: '123456',
            username: 'admin',
        })

        const rules = reactive({
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 3, max: 10, message: '用户名的长度在3-10位之间', trigger: 'blur' },
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 3, max: 10, message: '密码的长度在3-10位之间', trigger: 'blur' },
            ],
        })
        const ruleFormRef = ref<any>();
        const router=useRouter();
        const submitForm = (formEl: any | undefined) => {
            if (!formEl) return
            formEl.validate((valid: boolean, fields: object) => {
                if (valid) {
                    //ajax请求
                    login(ruleForm).then((res) => {
                        console.log(res)
                        if (res.data.data.code === 200) {
                            ElMessage({
                                message: res.data.data.msg,
                                type: 'success',
                            })
                          //把token存储在localstorage中
                          localStorage.setItem('token',res.data.data.token);
                          //页面跳转：跳转到首页也
                          router.push({ path:'/'})  
                        }
                    });

                } else {
                    console.log('error submit!', fields)
                }
            })
        }

        const resetForm = (formEl: any | undefined) => {
            if (!formEl) return
            formEl.resetFields()
        }



        return {
            ruleForm,
            rules,
            ruleFormRef,
            submitForm,
            resetForm
        }
    }
})
</script>

<style scoped>
#login-box {
    width: 100%;
    height: 100%;
    background: url(../assets/bg.webp);
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;

}

.demo-ruleForm {
    width: 500px;
    background: rgba(0, 0, 0, .3);
    padding: 50px 50px 50px 40px;
    border-radius: 5%;
}

.form-btn {
    display: flex;
    justify-content: space-between;
}

.form-btn .el-button {
    width: 48%;
}

.el-form-item__label {
    color: '#fff' !important;
}
</style>