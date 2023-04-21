//The HomePage shows arranged listings by different users
import ListingCard from "../Components/ListingCard";
import CarouselCardContainer from "../Components/CarouselCardContainer";
function HomePage (props){
    console.log(props)
    return(

        <CarouselCardContainer listings = {props.listings}/>
        )
}

export default HomePage;