import { _import } from './util';
const  HomePage = _import(()=>import(/* webpackChunkName: "HomePage" */'@/views/homePage/index.jsx'));
const PlayingPage = _import(()=>import(/* webpackChunkName: "plauingPage" */'@/views/playingPage/playingPage.jsx'));
// const App = _import(()=>import('@/app.jsx'));
// const LoginPage = _import(() => import('@/views/login/login.jsx'));




import App from '@/app.tsx';
import  LoginPage from '@/views/login/login.jsx';
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
                exact: true
            },{
                path:'/playingPage',
                requiresAuth: true,
                exact: true,
                component:PlayingPage
            }
        ]
    }
]

export default routeConfig;