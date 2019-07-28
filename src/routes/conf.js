

import HomePage from '@/views/homePage/index.jsx';
import PlayingPage from '@/views/playingPage/playingPage.jsx';
import App from '@/app.jsx';
//import {Router,BrowserRouter} from 'react-router-dom';
const routeConfig=[
    {
        path:'/',
        component:App,
        indexRoute:{
            component:HomePage
        },
        routes:[
            {
                path:'/home',
                component:HomePage
            },{
                path:'/playingPage',
                component:PlayingPage
            }
        ]
    }
]

export default routeConfig;