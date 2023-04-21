//The ListingCard shows a listing's title, main photo, seller name, and description.
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function ListingCard(props){

    const {listings} = props;
    console.log(listings)
        
     
    
    return(
        <div className="listingCard">

            <div className="innerCardOne">
                
            </div>
            <div className="innerCardTwo">
                
            </div>

        
        </div>
    )
}
export default ListingCard;


// {listings.map(listing=>(

//     <div class="listingCard">
//         <img className ="listingPhoto" src={`/css/ListingPhotos/${listing.title}.jpg`}
//             alt={listing.title} /> 
//         <div class="cardContainer">
//             <h4><b>{`$${listing.price}`}</b></h4>
//             <p>{listing.title}</p>
//         </div>
//     </div> 

//     ))}



// {listings.map(listing=>(
//     <div className="listingCardBody">
//         <div className="listingPhoto">
//             <img 
//                 className="listingPhoto"
//                 src={`/css/ListingPhotos/${listing.title}.jpg`}
//                 alt={`${listing.title}`}       
//             />
//         </div>
//         <div className="listingInfo">
//             <ul>
//                 <li>{`$${listing.price}`}</li>
//                 <li>{listing.title}</li>
//             </ul>
//         </div>
//     </div>
// )
// ) }