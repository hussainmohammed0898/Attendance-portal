import HomeLayout from "../component/layout/HomeLayout";
import Login from "../component/owner/Login";

export const route = [{
    element:<HomeLayout/>,
    children:[
        {
            path:"/",
            element:<Login/>
        }
    ]
}]