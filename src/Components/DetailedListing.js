//The ListingCard shows a listing's title, main photo, seller name, and description.
import { useAuth } from "../Hooks/Auth";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState, useEffect, createContext } from 'react';
import { Navigate, useNavigate  } from 'react-router-dom';

const UserContext = createContext()

const urlEndPoint = process.env.REACT_APP_URL_ENDPOINT;

const DetailedListing = (props) => {
    const { urlEndPoint ,
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

        //Vehicle Listing
        listingVehicleType, 
        setListingVehicleType, 
        listingVehicleMake, 
        setListingVehicleMake, 
        listingVehicleModel, 
        setListingVehicleModel, 
        listingVehicleYear, 
        setListingVehicleYear, 
        listingVehicleTransmission, 
        setListingVehicleTransmission, 
        listingVehicleColor, 
        setListingVehicleColor, 
        listingVehicleMilesDriven, 
        setListingVehicleMilesDriven, 
        listingVehicleMpgMin, 
        setListingVehicleMpgMin, 
        listingVehicleMpgMax, 
        setListingVehicleMpgMax, 

        //property Listing
        listingPropertyListingType,
        setListingPropertyListingType,
        listingPropertyType,
        setListingPropertyType,
        listingPropertyStreetAddress,
        setListingPropertyStreetAddress,
        listingPropertyCity,
        setListingPropertyCity,
        listingPropertyState,
        setListingPropertyState,
        listingPropertyZipcode,
        setListingPropertyZipcode,
        listingPropertyYearBuilt,
        setListingPropertyYearBuilt,
        listingPropertyHasBasement,
        setListingPropertyHasBasement,
        listingPropertyHasGarage,
        setListingPropertyHasGarage,
        listingPropertyNumBedrooms,
        setListingPropertyNumBedrooms,
        listingPropertyNumBathrooms,
        setListingPropertyNumBathrooms


    } = props;


    function showVehicleDetails(props){

        return(
            <div id="listing-vehicle-details">
                <div className="vehicleDetailsRow">
                    <div className="vRowLabel">
                        <p>Make:</p>
                    </div>
                    <div className="vRowCell">
                        <p>{listingVehicleMake}</p>

                    </div>
                </div>
                <div className="vehicleDetailsRow">
                    <div className="vRowLabel">
                        <p>Model:</p>

                    </div>
                    <div className="vRowCell">
                        <p>{listingVehicleModel}</p>
                    </div>
                </div>
                <div className="vehicleDetailsRow">
                    <div className="vRowLabel">
                        <p>Year:</p>

                    </div>
                    <div className="vRowCell">
                        <p>{listingVehicleYear}</p>
                    </div>
                </div>
                <div className="vehicleDetailsRow">
                    <div className="vRowLabel">
                        <p>Transmission:</p>

                    </div>
                    <div className="vRowCell">
                        <p>{listingVehicleTransmission}</p>
                    </div>
                </div>
                <div className="vehicleDetailsRow">
                    <div className="vRowLabel">
                        <p>Color:</p>

                    </div>
                    <div className="vRowCell">
                        <p>{listingVehicleColor}</p>
                    </div>
                </div>
                <div className="vehicleDetailsRow">
                    <div className="vRowLabel">
                        <p>Miles Driven:</p>

                    </div>
                    <div className="vRowCell">
                        <p>{listingVehicleMilesDriven}</p>

                    </div>
                </div>


                <div className="vehicleDetailsRow">
                    <div className="vRowLabel">
                        <p>Mileage Range:</p>

                    </div>
                    <div className="vRowCell">
                        <p>{`${listingVehicleMpgMin} to ${listingVehicleMpgMax} MPG`}</p>
                    </div>
                </div>


            </div>
        )

    }

    function showPropertyDetails(props){

        return(
            <div id="listing-property-details">
                <div className="propertyDetailsRow">
                    <div className="pRowLabel">
                        <p>Street Address:</p>
                    </div>
                    <div className="pRowCell">
                        <p>{listingPropertyStreetAddress}</p>

                    </div>
                </div>
                <div className="propertyDetailsRow">
                    <div className="pRowLabel">
                        <p>City:</p>

                    </div>
                    <div className="pRowCell">
                        <p>{listingPropertyCity}</p>

                    </div>
                </div>
                <div className="propertyDetailsRow">
                    <div className="pRowLabel">
                        <p>State:</p>

                    </div>
                    <div className="pRowCell">
                        <p>{listingPropertyState}</p>

                    </div>
                </div>
                <div className="propertyDetailsRow">
                    <div className="pRowLabel">
                        <p>Zipcode:</p>

                    </div>
                    <div className="pRowCell">
                        <p>{listingPropertyZipcode}</p>
                    </div>
                </div>
                <div className="propertyDetailsRow">
                    <div className="pRowLabel">
                        <p>Bedrooms:</p>

                    </div>
                    <div className="pRowCell">
                        <p>{listingPropertyNumBedrooms}</p>

                    </div>
                </div>
                <div className="propertyDetailsRow">
                    <div className="pRowLabel">
                        <p>Bathrooms:</p>

                    </div>
                    <div className="pRowCell">
                        <p>{listingPropertyNumBathrooms}</p>

                    </div>
                </div>


                <div className="propertyDetailsRow">
                    <div className="pRowLabel">
                        <p>Year Built:</p>

                    </div>
                    <div className="pRowCell">
                        <p>{listingPropertyYearBuilt}</p>

                    </div>
                </div>

            </div>
        )
        
    }
    return(
        <div className = "detailedListingPageDiv">
            <div className = "detailedListingPageHeader">
                <div className = "detailedListingPageTitle">
                    {/* <h1>Title</h1> */}
                    <h1>{listingTitle}</h1>
                </div>

            </div>
            <div className = "detailedListingPageBody">
                <div id = "detailedBodyRow1">
                    <div className="detailedListing-image">
                        <img
                        className="actualListingImage"
                        src = {listingImage}
                        
                        />
                    </div>
                    <div className = "detailedListing-info">
                        {listingType === "vehicle" && showVehicleDetails()}
                        {listingType === "property" && showPropertyDetails()}

                    </div>
                </div>
                <div id = "detailedBodyRow2">
                    <div className="detailedRowDiv">
                        <div className="Detailed-Listing-Column-Div">
                            <p>${listingPrice}</p>
                        </div>
                    </div>
                    <div className="detailedRowDiv">
                        <div className="Detailed-Listing-Column-Div">
                            <p>{listingCondition}</p>

                        </div>
                    </div>
                    <div className="detailedRowDiv">
                        <div className="Detailed-Listing-Column-Div">
                            {listingType === "vehicle" && <p>Vehicles</p>}
                            {listingType === "property" && <p>{listingPropertyListingType}</p>}

                        </div>
                        <div className="Detailed-Listing-Column-Div">
                            {listingType === "vehicle" && <p>{listingVehicleType}</p>}
                            {listingType === "property" && <p>{listingPropertyType}</p>}

                            
                        </div>
                    </div>
                </div>
                <div id="detailedDescription">
                    <p>{listingDescription}</p>
                </div>
            </div>
            <div className = "detailedListingPageFooter">
                <div className = "detailedListingPublisherInfo">
                    <div className = "publisherImage">
                        <p>Publisher Image</p>
                    </div>
                    <div className = "publisherInfo">
                        <div className = "publisherName">
                            <p>Publisher Name</p>
                        </div>
                        <div className = "publisherPronouns">
                            <p>Publisher Pronouns</p>
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

export default DetailedListing;