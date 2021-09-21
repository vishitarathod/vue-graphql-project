import VueRouter from 'vue-router';

let routes=[
    {
    path:'/register',
    component: () => import('../components/auth/RegisterComponent'),
    meta: { requiredAuth: false },

    },
    {
        path:'/login',
        component: () => import('../components/auth/LoginComponent'),
        meta: { requiredAuth: false },

    },
    {
        path:'/forgot',
        component: () => import('../components/auth/ForgotComponent'),
        meta: { requiredAuth: true },
    },
    {
        path:'/reset/:token',
        component: () => import('../components/auth/ResetComponent'),
        meta: { requiredAuth: true },
    },
    {
        path: '/edituser/:id',
        name: 'edituser',
        component: () => import('../components/user/EditUserComponent'),
        meta: { requiredAuth: true },
    },
    {
        path:'/adduser',
        component: () => import('../components/user/AddUserComponent'),
        meta: { requiredAuth: true },
    },
    {
        path:'/addpost',
        component:()=>import('../components/post/AddPostComponent'),
        meta: { requiredAuth: true },
    },
    {
        path:'/post',
        component:()=>import('../components/post/PostComponent'),
        meta: { requiredAuth: true },
    },
    {
        path:'/users',
        component:()=>import('../components/user/UserComponent'),
        meta: { requiredAuth: true },
    },
    {
        path:'/userpost',
        component:()=>import('../components/post/UserPostComponent'),
        meta: { requiredAuth: true },
    },
    {
        path: '/editpost/:id',
        name: 'editpost',
        component: () => import('../components/post/EditPostComponent'),
        meta: { requiredAuth: true },
    },
    {
        path:'/logout',
        component:()=>import('../components/auth/LogoutComponent'),
        meta: { requiredAuth: true }
    },
]

export const router=new VueRouter({
    base: 'public', 
    mode: 'history',
    routes
    
},
);
// router.beforeEach((to,from,next) => {
//     let isAuthenticated = localStorage.getItem("isAuthenticated");
//     if(to.meta.requiredAuth&&!isAuthenticated){
//         next('/login')
//     }else{
//         next()
//     }
// })
