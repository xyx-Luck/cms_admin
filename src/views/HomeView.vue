<template>
  <div class="home">
    <div class="common-layout">
      <el-container>
        <el-header>
          <el-row :gutter="20">
            <el-col :span="4">
              <img src="../assets/logo.png" />
            </el-col>
            <el-col :span="16">
              <h2 class="title">后台管理系统</h2>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="logOut">退出登录</el-button>
            </el-col>
          </el-row>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <el-menu 
            active-text-color="#ffd04b" 
            background-color="#545c64" 
            class="el-menu-vertical-demo"
            :default-active="path" 
            text-color="#fff"
            router
            >
            <!-- router:开启路由模式 -->
              <el-menu-item :index="val.path" v-for="val in routeShow" :key="val.path">
                <el-icon>
                  <icon-menu />
                </el-icon>
                <span>{{val.meta.title}}</span>
              </el-menu-item>
            </el-menu>
          </el-aside>
          <el-main>
            <router-view />
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter,useRoute } from 'vue-router';

export default defineComponent({
  name: 'HomeView',
  components: {
    // HelloWorld,
  },
  setup(){
    const router=useRouter();
    const route=useRoute();
    const path=route.path;
    //可以获取页面所有的路由信息
    //过滤出路由信息中带meta:isshow:true的信息
    const routeShow=router.getRoutes().filter(v=>v.meta.isShow);
    //退出登录
    const logOut=()=>{
       //清除token
       localStorage.removeItem('token')
       //跳转到登录页面
       router.push('/login')
    }
    return {
      routeShow,
      path,
      logOut
    }
  }
});
</script>
<style>
.el-header {
  height: 80px;
  line-height: 80px;
  background: rgba(0, 0, 0, .8);
}

.el-header img {
  vertical-align: middle;
  height: 60px;
}

.el-header .title {
  color: #fff;
  text-align: center;
}
.el-aside{
  height: calc(100vh - 80px);
  background:#545c64;
}
</style>
