//The ListingCard shows a listing's title, main photo, seller name, and description.
import { useAuth } from "../Hooks/Auth";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState, useEffect, createContext } from 'react';
import { Navigate, useNavigate  } from 'react-router-dom';

const UserContext = createContext()

const urlEndPoint = process.env.REACT_APP_URL_ENDPOINT;
function ListingCard(props){
    const auth = useAuth(); //access the authentication context 
    const navigate = useNavigate();

    const {
        listing,
        searchCategoryName,
        listingCategorySearchResult,
        searchCategory,
        categoriesList,
    } = props;

    console.log(categoriesList)

    // console.log(auth.userId)
    // console.log(listing.listingUserId)

    const deleteListing= (listingId)=>{
        // setShouldRefresh(true)

        axios.delete(`${urlEndPoint}/listings/delete-listing/${listing.listingId}`)
        .then(function (response) {
            // setShouldRefresh(false);
        },{
          'Content-Type': 'application/x-www-form-urlencoded'
        })
        .catch(function (error) {
          console.log(error);
        }); 
    
        
    }

    function showUpdateDelete(props){
        return(
            <div className="cardUpdateDelete">
                <Button 
                variant ="success"
                onClick={()=>{
                    navigate(`/listings/update-listing/${listing.listingId}`)
                }}
                >
                    Update
                </Button>

                <Button 
                variant = "danger"
                onClick={()=>{
                    deleteListing(listing.listingId)
                }}
                >
                    Delete
                </Button>
            </div>
        )
    }

    return(
        <div className="listingCard">

            <div className="innerCardOne">
                <div className="listingPhoto">
                    <img className ="listingPhoto" 
                        src={`${listing.listingImage}.jpg`}
                        alt={listing.title}
                        onClick={()=>{
                            navigate(`/listings/get-listing/${listing.listingId}`)
                        }}
                                                
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
                {auth.userId === listing.listingUserId && showUpdateDelete()}

                {/* {`${auth.userID}`===`${listing.listingUserId}` && showUpdateDelete()} */}
            </div>

        </div>

    ) 

    
}
export default ListingCard;

