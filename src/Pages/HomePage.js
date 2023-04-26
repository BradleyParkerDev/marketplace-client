//The HomePage shows arranged listings by different users
import ListingCard from "../Components/ListingCard";
import { useState, useEffect } from 'react';

import CarouselCardContainer from "../Components/CarouselCardContainer";
import userEvent from "@testing-library/user-event";
import { list } from "firebase/storage";
function HomePage (props){
    const {listings} = props
    const {categoriesList} = props
    const {searchCategory} = props
    const {searchCategoryName} = props
    const {listingCategorySearchResult} = props


    return(
        <div id="card-container-outer-div">
            <div id="card-container-header">
                <div id="card-container-header-title">
                    <h1 id="card-container-header-text">{searchCategoryName}</h1>
                </div>
            </div>
            <div id="card-container">
                {searchCategory === "All Listings" && listings.map(listing=>(<ListingCard listing =  {listing}/>))}
                {listingCategorySearchResult.length > 0 && listingCategorySearchResult.map(listing=>(<ListingCard listing = {listing}/>))}


            </div>
    
        </div>

        )
}

export default HomePage;