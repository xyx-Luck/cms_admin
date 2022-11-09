import { createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import HomeView from '../views/HomeView.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect:'goods',
    component: HomeView,
    children:[
      {
        path:'/goods',
        name:'goods',
        meta:{
          isShow:true,
          title:'商品列表'
        },
        component: () => import(/* webpackChunkName: "goods" */ '../views/GoodsView.vue')
      },
      {
        path:'/user',
        name:'user',
        meta:{
          isShow:true,
          title:'用户列表'
        },
        component: () => import(/* webpackChunkName: "user" */ '../views/UserView.vue')
      },
      {
        path:'/role',
        name:'role',
        meta:{
          isShow:true,
          title:'角色列表'
        },
        component: () => import(/* webpackChunkName: "role" */ '../views/RoleView.vue')
      },
      {
        path:'/authority/:id/:authority',
        // path:'/authority',
        name:'authority',
        meta:{
          isShow:false,
          title:'权限列表'
        },
        component: () => import(/* webpackChunkName: "authority" */ '../views/AuthorityView.vue')
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  }
]




const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//路由导航守卫
router.beforeEach((to,from ,next)=>{
  console.log(to)
    const token:string|null=localStorage.getItem('token');
    //如果没有token并且进入的不是登录页面
    if(!token && to.path!=='/login'){
       next('/login')
    }else{
      next()
    }
})

export default router
