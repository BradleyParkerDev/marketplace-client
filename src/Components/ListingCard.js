//The ListingCard shows a listing's title, main photo, seller name, and description.
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function ListingCard(props){

    const {listing} = props;
    const {searchCategoryName} = props;
    const {listingCategorySearchResult} = props;
    const {searchCategory} = props;
    const {categoriesList} = props;
       

    // Displays cards for all listings
    function showCards(props){
        return(
                <div className="listingCard">

                <div className="innerCardOne">
                    <div className="listingPhoto">
                        <img className ="listingPhoto" 
                            src={`${listing.listingImages}.jpg`}
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
        )
    }


    return(

        <div>{ showCards()}</div>
        // <div>{showBlankCard()}</div>

    ) 

    
}
export default ListingCard;

