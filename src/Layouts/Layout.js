import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";

const Layout = (props) => {
    return (
        <div id="layoutDiv">

            <NavBar 
                categoriesList = {props.categoriesList}
                setShouldRefresh={props.setShouldRefresh}
                searchCategory={props.searchCategory}
                searchCategoryName={props.searchCategoryName}

                setSearchCategoryName={props.setSearchCategoryName}
                setSearchCategory={props.setSearchCategory}
            />
            <div id="siteBackground">
                <Outlet
                />                
            </div>

        </div>
    );
}

export default Layout;