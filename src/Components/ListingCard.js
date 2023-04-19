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


// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';

// function BasicExample() {
//   return (
//     <Card style={{ width: '18rem' }}>
//       <Card.Img variant="top" src="holder.js/100px180" />
//       <Card.Body>
//         <Card.Title>Card Title</Card.Title>
//         <Card.Text>
//           Some quick example text to build on the card title and make up the
//           bulk of the card's content.
//         </Card.Text>
//         <Button variant="primary">Go somewhere</Button>
//       </Card.Body>
//     </Card>
//   );
// }

// export default BasicExample;