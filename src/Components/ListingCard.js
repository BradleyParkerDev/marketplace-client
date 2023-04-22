//The ListingCard shows a listing's title, main photo, seller name, and description.
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function ListingCard(props){

    const {listings} = props;
    const {searchCategoryName} = props;
    const {listingCategorySearchResult} = props;
    const {searchCategory} = props;
    const {categoriesList} = props;
    console.log(listings)
       
    // Displays a blank card
    function showBlankCard(props){
        return(


            <div className="listingCard">

                <div className="innerCardOne">
                    <div className="listingPhoto"></div>
                </div>
                <div className="innerCardTwo">
                    <div className="cardTextArea">
                        <div className="cardPrice">
                            {/* <p>{`${searchCategoryName}`}</p> */}
                        </div>
                        <div className="cardTitle">

                        </div>
                    </div>
                </div>
        
            </div>

        )
    }

    // Displays cards for all listings
    function showAllListingCards(props){
        return(
            listings.map(listing=>(
                <div className="listingCard">

                <div className="innerCardOne">
                    <div className="listingPhoto">
                        <img className ="listingPhoto" 
                            src={`/css/ListingPhotos/${listing.title}.jpg`}
                            alt={listing.title}
                        /> 
                    </div>
                </div>
                <div className="innerCardTwo">
                    <div className="cardTextArea">
                        <div className="cardPrice">
                            <p>{`$${listing.price}`}</p>
                        </div>
                        <div className="cardTitle">
                            <p>{listing.title}</p>
                        </div>
                    </div>
                </div>
        
                </div>
            ))
        )
    }

    // Displays cards for a searched category
    function showSearchCategoryCards(props){
        return(
            listingCategorySearchResult.map(searchedListing=>(
                <div className="listingCard">

                <div className="innerCardOne">
                    <div className="listingPhoto">
                        <img className ="listingPhoto" 
                            src={`/css/ListingPhotos/${searchedListing.title}.jpg`}
                            alt={searchedListing.title}
                        /> 
                    </div>
                </div>
                <div className="innerCardTwo">
                    <div className="cardTextArea">
                        <div className="cardPrice">
                            <p>{`$${searchedListing.price}`}</p>
                        </div>
                        <div className="cardTitle">
                            <p>{searchedListing.title}</p>
                        </div>
                    </div>
                </div>
        
                </div>
            ))

        )
    }
    
    return(

        <div>{ showBlankCard()}</div>

    ) 

    
}
export default ListingCard;

