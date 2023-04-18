import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";

const Layout = (props) => {
    return (
        <div id="layoutDiv">

            <NavBar categoriesList = {props.categoriesList}/>
            <Outlet/>
        </div>
    );
}

export default Layout;