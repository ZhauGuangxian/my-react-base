import { _import } from './util';
const  HomePage: any = _import(()=>import(/* webpackChunkName: "HomePage" */'@/views/homePage/index.jsx'));

const MenuItem1: any = _import(() => import(/* webpackChunkName: "MenuOne" */ '@/views/MenuOne/index.tsx'))

const App = _import(()=>import(/* webpackChunkName: "APP" */ '@/app.tsx'))
const LoginPage = _import(()=>import(/* webpackChunkName: "HomePage" */'@/views/login/login.jsx'));
const routeConfig=[
    {
        path: '/login',
        component: LoginPage,
        requiresAuth: false
    },
    {
        path:'/',
        component:App,
        redirect: HomePage,
        requiresAuth: true,
        routes:[
            {
                path:'/home',
                component:HomePage,
                requiresAuth: true,
                exact: true,
                title: '首页'
            },{
                path:'/MenuOne',
                requiresAuth: true,
                exact: true,
                title: '菜单1',
                component:MenuItem1
            }
        ]
    }
]

export default routeConfig;