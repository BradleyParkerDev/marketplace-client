import UpdateListingForm from "../Components/UpdateListingForm";
import UpdateVehicleListingForm from "../Components/UpdateVehicleListingForm";
import UpdatePropertyListingForm from "../Components/UpdatePropertyListingForm";
import { useState, useEffect } from 'react';


function UpdateListingPage (props){
    // const {listings} = props
    const {categoriesList} = props
    // const {searchCategory} = props
    // const {searchCategoryName} = props
    // const {listingCategorySearchResult} = props
    const{urlEndpoint} = props


    return(
        <div>
            <UpdateListingForm
           categoriesList = {props.categoriesList}
           urlEndPoint = {props.urlEndPoint}
           setShouldRefresh = {props.setShouldRefresh}
            />
            <UpdateVehicleListingForm
           categoriesList = {props.categoriesList}
           urlEndPoint = {props.urlEndPoint}
           setShouldRefresh = {props.setShouldRefresh}
            />
            <UpdatePropertyListingForm
           categoriesList = {props.categoriesList}
           urlEndPoint = {props.urlEndPoint}
           setShouldRefresh = {props.setShouldRefresh}
            />
        </div>
        )
}

export default UpdateListingPage;