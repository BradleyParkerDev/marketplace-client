//The HomePage shows arranged listings by different users
import ListingCard from "../Components/ListingCard";
import { useState, useEffect } from 'react';

import CarouselCardContainer from "../Components/CarouselCardContainer";
import userEvent from "@testing-library/user-event";
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
                    <h1 id="card-container-header-text">{`${searchCategoryName}`}</h1>


                </div>

            </div>
            <div id="card-container">
            {/* <h1>{`${searchCategory}`}</h1> */}
                {/* <ListingCard 
                    searchCategoryName = {props.searchCategoryName}
                    listingCategorySearchResult = {props.listingCategorySearchResult}
                    searchCategory = {props.searchCategory}
                    categoriesList = {props.categoriesList}
                    listings = {props.listings}

                /> */}
                {searchCategory === "All Listings" && <ListingCard 
                                                        listings = {props.listings}
                                                        searchCategoryName = {props.searchCategoryName}
                                                        />}
                {searchCategory !== "All Listings" && <ListingCard listingCategorySearchResult = {props.listingCategorySearchResult}/>}

                {/* <ListingCard />
                <ListingCard />
                <ListingCard />
                <ListingCard />
                <ListingCard />
                <ListingCard />
                <ListingCard />
                <ListingCard />
                <ListingCard />
                <ListingCard />
                <ListingCard />
                <ListingCard />
                <ListingCard />
                <ListingCard />
                <ListingCard />
                <ListingCard />
                <ListingCard />
                <ListingCard />
                <ListingCard />
                <ListingCard />
                <ListingCard />
                <ListingCard />
                <ListingCard /> */}

            </div>
    
        </div>

        )
}

export default HomePage;