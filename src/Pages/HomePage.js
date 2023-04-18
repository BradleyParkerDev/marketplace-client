//The HomePage shows arranged listings by different users
import ListingCard from "../Components/ListingCard";
function HomePage (props){
    console.log(props)
    return(
        <div id="homepageCardContainer">

            {props.listings.length > 0 && <ListingCard listings={props.listings}/>}
        </div>
    )
}

export default HomePage;