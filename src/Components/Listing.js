//The ListingCard shows a listing's title, main photo, seller name, and description.
import { useAuth } from "../Hooks/Auth";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState, useEffect, createContext } from 'react';
import { Navigate, useNavigate  } from 'react-router-dom';

const UserContext = createContext()

const urlEndPoint = process.env.REACT_APP_URL_ENDPOINT;

const Listing = (props) => {
    const { urlEndPoint ,
        categoriesList,

        publisherImage,
        publisherFirstName,
        publisherPronouns,
        // Regular Listing

        myListing,
        listingType,
        setListingType,
        displayImage, 
        setDisplayImage,
        listingImage,
        setListingImage,   
        listingTitle, 
        setListingTitle, 
        listingPrice, 
        setListingPrice,
        listingCategory,
        setListingCategory,
        listingSubCategory,
        setListingSubCategory,
        listingCondition,
        setListingCondition,
        listingContactEmail, 
        setListingContactEmail,
        listingContactPhoneNumber,
        setListingContactPhoneNumber,
        listingDescription,
        setListingDescription,

    } = props;

    console.log(categoriesList)
    console.log(listingCategory)
    const category = categoriesList.find(c=>c._id === listingCategory)
    console.log(category.name)

    return(
        <div className = "listingPageDiv">
            <div className = "listingPageHeader">
                <div className = "listingPageTitle">
                    <h1>{listingTitle}</h1>
                </div>

            </div>
            <div className = "listingPageBody">
                <div className="listing-image">
                    <img
                    className = "actualListingImage"
                    src = {listingImage}
                    
                    />
                </div>
                <div className = "listing-info">
                    <div className = "listingInfoRow">
                        <div className = "listing-Row-Div">
                            <p>{`$${listingPrice}`}</p>
                        </div> 

                    </div>
                    <div className = "listingInfoRow">
                        <div className = "listing-Row-Div">
                            <p>{listingCondition}</p>
                        </div>                       

                    </div>
                    <div className = "listingInfoRow">
                        <div className = "listing-Row-Div">
                            <p>{category.name}</p>
                        </div> 
                        <div className = "listing-Row-Div">
                            <p>{listingSubCategory}</p>
                        </div> 
                    </div>
                </div>
                <div className = "listing-description">
                    <p>{listingDescription}</p>
                </div>
            </div>
            <div className = "listingPageFooter">
                <div className = "listingPublisherInfo">
                    <div className = "publisherImage">
                        <img
                        className="actualPublisherImage"
                        src = {`${publisherImage}.jpg`}
                        />
                    </div>
                    <div className = "publisherInfo">
                        <div className = "publisherName">
                            <p>{publisherFirstName}</p>
                        </div>
                        <div className = "publisherPronouns">
                            <p>{publisherPronouns}</p>
                        </div>
                        <div className = "publisherEmail">
                            <p>{listingContactEmail}</p>
                        </div>
                        <div className = "publisherPhone">
                            <p>{listingContactPhoneNumber}</p>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )

}

export default Listing;