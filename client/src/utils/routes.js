import AddMoney from "../compoments/AddMoney/AddMoney";
import Admin from "../compoments/Admin/Admin";
import Basket from "../compoments/Basket/Basket";
import Login from "../compoments/Login/Login";
import Main from "../compoments/MainPage/Main";
import Profile from "../compoments/Profile/Profile";
import Register from "../compoments/Register/Register";
import Rules from "../compoments/Rules/Rules";


export const REDIRECT_PATH = {
    RULES: "/hakkımızda",
    HOME_PAGE: "/",
    BASKET: "/basket",
    LOGIN: "/login",
    ADMIN: "/admin",
    REGISTER: "/register",
    BALANCE: "/addBalance",
    PROFILE: "/profile"
}

const routes = [
    {
        component: Rules,
        path: REDIRECT_PATH.RULES
    },
    {
        component: Basket,
        path: REDIRECT_PATH.BASKET
    },
    {
        component: Login,
        path: REDIRECT_PATH.LOGIN
    },
    {
        component: Register,
        path: REDIRECT_PATH.REGISTER
    },
    {
        component: Main,
        path: REDIRECT_PATH.HOME_PAGE,
    },
    {
        component: Admin,
        path: REDIRECT_PATH.ADMIN,
    },
    {
        component: AddMoney,
        path: REDIRECT_PATH.BALANCE
    },
    {
        component: Profile,
        path: REDIRECT_PATH.PROFILE
    }
]

export function getRouteResults() {
    const results = [];
    routes.forEach(route => getRouteResult(route).forEach(result => results.push(result)));
    return results;
}

function getRouteResult(route) {
    const results = [];
    results.push({ path: route.path, route: route });
    if (Array.isArray(route.children) && route.children.length) route.children.forEach(child => {
        const resultFromChild = getRouteResult(child);
        resultFromChild.forEach(result => results.push({ path: route.path + result.path, route: result.route }));
    });
    return results;
}

export default routes;