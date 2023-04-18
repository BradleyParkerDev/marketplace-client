//The ListingCard shows a listing's title, main photo, seller name, and description.

function ListingCard(props){

    const {listings} = props;
    console.log(listings)
        
     
    
    return(
        <div>

            {listings.map(listing=>(
                <div className="listingCardBody">
                    <div className="listingPhoto">
                        <img 
                            className="listingPhoto"
                            src={`/css/ListingPhotos/${listing.title}.jpg`}
                            alt={`${listing.title}`}
                        
                        />
                    </div>
                    <div className="listingInfo">
                        <ul>
                            <li>{`$${listing.price}`}</li>
                            <li>{listing.title}</li>
                            {/* <li>{listing.description}</li> */}
                            

                        </ul>


                    </div>

                </div>
            

            )
        ) }




        </div>

    )

}
export default ListingCard;