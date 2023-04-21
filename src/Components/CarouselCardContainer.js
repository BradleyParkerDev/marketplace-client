import '../index.css'
import { useState, useEffect } from 'react';
import ListingCard from './ListingCard';
function CarouselCardContainer(props){
    // const {listings} = props
    const [header, setHeader] = useState("All Listings")
    const [rowCategory, setRowCategory] = useState("Apparel")
    const [rowFooterMessage, setRowFooterMessage] = useState("See More")

    console.log(props)
    return(


            <div id ="carouselOuterDiv">
                <div id= "rowCategory">
                    <p>{rowCategory}</p>
                </div>
                <div id="carouselCardContainer">
                    <ListingCard />
                    <ListingCard />
                    <ListingCard />
                    <ListingCard />
                    <ListingCard />
                    <ListingCard />
                    <ListingCard />
                    <ListingCard />
                    <ListingCard />
                </div>
                <div id="rowFooter">
                <div id="seeMore">
                    See More
                </div>            
                </div>
            </div>)
}
export default CarouselCardContainer;

            