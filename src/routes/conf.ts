import { _import } from './util';
const  HomePage: any = _import(()=>import(/* webpackChunkName: "HomePage" */'@/views/homePage/index.jsx'));

const MenuItem1: any = _import(() => import(/* webpackChunkName: "MenuOne" */ '@/views/MenuOne/index.tsx'))

const App = _import(()=>import(/* webpackChunkName: "APP" */ '@/app.tsx'))
const LoginPage = _import(()=>import(/* webpackChunkName: "HomePage" */'@/views/login/login.jsx'));

function cleanList (list: Array<any> = []):Array<any>{
    let result = [];
    for (let i = 0; i < list.length; i++) {
        let temp = {
            title: list[i].title || '',
            path: list[i].title || '',
            showBack: list[i].title || false,
            hide: list[i].title || false,
            backTo: list[i].title || '',
            routes: list[i].routes || []
         };
        

        if (temp.routes instanceof Array && temp.routes.length > 0) {
            temp.routes = cleanList(temp.routes);
        }
        result.push(temp);
    }
    return result;
};


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

const cleanConf = cleanList(routeConfig[1].routes);

export {
    cleanConf
}

export default routeConfig;