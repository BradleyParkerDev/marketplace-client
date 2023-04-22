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
        <div>
            <h1>{`${searchCategoryName}`}</h1>
            {/* {result.length > 0 && <CarouselCardContainer result = {props.result}/>} */}
    
        </div>

        )
}

export default HomePage;