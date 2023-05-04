//This is the unique page for each listing
import '../index.css'
import Listing from '../Components/Listing';
import DetailedListing from '../Components/DetailedListing';
import { useAuth } from "../Hooks/Auth";
import UpdateListingForm from "../Components/UpdateListingForm";
import UpdateVehicleListingForm from "../Components/UpdateVehicleListingForm";
import UpdatePropertyListingForm from "../Components/UpdatePropertyListingForm";
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { storage }from "../firebase"
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';
const UserContext = createContext()


function ListingPage (props){
    const params = useParams();
    const auth = useAuth(); //access the authentication context 
    const [myListing, setMyListing] = useState([])
    const [shouldRefresh, setShouldRefresh] = useState(false)
    console.log(params.listingId)


    ///////////////////////////////////////////////////////////////////////////
    // States For Publisher
    ///////////////////////////////////////////////////////////////////////////
    const [publisher, setPublisher] = useState("");
    const [pulisherImage, setPublisherImage] = useState("");
    const [publisherFirstName,setPublisherFirstName] = useState("");
    const [publisherPronouns, setPublisherPronouns] = useState("");



    ///////////////////////////////////////////////////////////////////////////
    // States and event handlers for regular listings
    ///////////////////////////////////////////////////////////////////////////
    const [displayImage, setDisplayImage] = useState("");
    // Regular Listing States
    const [listingUserId, setListingUserId] = useState('')
    const [listingTitle,setListingTitle] = useState('')
    const [listingType,setListingType] = useState('')
    const [listingPrice,setListingPrice] = useState('')
    const [listingCategory,setListingCategory] = useState('')
    const [listingSubCategory,setListingSubCategory] = useState('')
    const [listingCondition,setListingCondition] = useState('')
    const [listingContactEmail, setListingContactEmail] = useState('')
    const [listingContactPhoneNumber, setListingContactPhoneNumber] = useState('');
    const [listingDescription,setListingDescription] = useState('')
    //Holds listng Images
    const [listingImage, setListingImage] = useState("")
    // const {listings} = props

    ///////////////////////////////////////////////////////////////////////////
    // States and event handlers for vehicle listings
    ///////////////////////////////////////////////////////////////////////////

    // Vehicle Listing States
    const [listingVehicleType, setListingVehicleType] = useState("");
    const [listingVehicleMake, setListingVehicleMake] = useState("");
    const [listingVehicleModel, setListingVehicleModel] = useState("");
    const [listingVehicleYear, setListingVehicleYear] = useState("");
    const [listingVehicleTransmission, setListingVehicleTransmission] = useState("");
    const [listingVehicleColor, setListingVehicleColor] = useState("");
    const [listingVehicleMilesDriven, setListingVehicleMilesDriven] = useState("");
    const [listingVehicleMpgMin, setListingVehicleMpgMin] = useState("");
    const [listingVehicleMpgMax, setListingVehicleMpgMax] = useState("");


    ///////////////////////////////////////////////////////////////////////////
    // States and event handlers for property listings
    ///////////////////////////////////////////////////////////////////////////
    
    // Property Listing States
    const [listingPropertyListingType, setListingPropertyListingType] = useState("Property Rentals");
    const [listingPropertyType, setListingPropertyType] = useState("");
    const [listingPropertyStreetAddress, setListingPropertyStreetAddress] = useState("");
    const [listingPropertyCity, setListingPropertyCity] = useState("");
    const [listingPropertyState, setListingPropertyState] = useState("");
    const [listingPropertyZipcode, setListingPropertyZipcode] = useState("");
    const [listingPropertyYearBuilt, setListingPropertyYearBuilt] = useState("");
    const [listingPropertyHasBasement, setListingPropertyHasBasement] = useState(false);
    const [listingPropertyHasGarage, setListingPropertyHasGarage] = useState(false);
    const [listingPropertyNumBedrooms, setListingPropertyNumBedrooms] = useState("");
    const [listingPropertyNumBathrooms, setListingPropertyNumBathrooms] = useState("");

    const {
        categoriesList,
        urlEndPoint
    } = props


    useEffect (()=>{
        axios.get(`${urlEndPoint}/listings/get-listing/${params.listingId}`)
        .then(function (response){
            console.log(response);
            setMyListing(response.data.listing[0]);
            console.log(myListing);
            setShouldRefresh(true)
            setListingUserId(response.data.listing[0].listingUserId)
            setListingImage(response.data.listing[0].listingImage)
            setListingType(response.data.listing[0].listingType)
            setListingTitle(response.data.listing[0].title)
            setListingPrice(response.data.listing[0].price)
            setListingCategory(response.data.listing[0].category)
            setListingSubCategory(response.data.listing[0].subCategory)
            setListingCondition(response.data.listing[0].condition)
            setListingContactEmail(response.data.listing[0].email)
            setListingContactPhoneNumber(response.data.listing[0].phoneNumber)
            setListingDescription(response.data.listing[0].description)
            console.log(listingType)
            //For Vehicles
            if(listingType === "vehicle"){
                setListingVehicleType(response.data.listing[0].vehicleType);
                console.log(listingVehicleType)
                setListingVehicleMake(response.data.listing[0].make);
                setListingVehicleModel(response.data.listing[0].model);
                setListingVehicleYear(response.data.listing[0].year);
                setListingVehicleTransmission(response.data.listing[0].transmission);
                setListingVehicleColor(response.data.listing[0].color);
                setListingVehicleMilesDriven(response.data.listing[0].milesDriven);
                setListingVehicleMpgMin(response.data.listing[0].minMpg);
                setListingVehicleMpgMax(response.data.listing[0].maxMpg);
            }



            //For Properties
            if(listingType === "property"){
                setListingPropertyListingType(response.data.listing[0].listingPropertyType);
                setListingPropertyType(response.data.listing[0].propertyType);
                setListingPropertyStreetAddress(response.data.listing[0].streetAddress);
                setListingPropertyCity(response.data.listing[0].city);
                setListingPropertyState(response.data.listing[0].state);
                setListingPropertyZipcode(response.data.listing[0].zipcode);
                setListingPropertyYearBuilt(response.data.listing[0].yearBuilt);
                setListingPropertyHasBasement(response.data.listing[0].hasBasement);
                setListingPropertyHasGarage(response.data.listing[0].hasGarage);
                setListingPropertyNumBedrooms(response.data.listing[0].numberOfBedrooms);
                setListingPropertyNumBathrooms(response.data.listing[0].numberOfBathrooms);
            }

        
        })
        .catch(function (error){
            console.log(error);
        })
        .finally(function (){
        //always executed
        })
        
        //Getting User info
        axios.get(`${urlEndPoint}/users/get-user/${listingUserId}`)
        .then(function (response){
            console.log(response);
            setPublisher(response.data.user);
            if(response.data.user.userImage !== null){
                setPublisherImage(response.data.user.userImage);
            }
            setPublisherFirstName(response.data.user.firstName);
            setPublisherPronouns(response.data.user.pronouns);
            console.log(publisher);
        })
        .catch(function (error){
            console.log(error);
        })
        .finally(function (){
        //always executed
        })

    },[shouldRefresh])


    return(
        <div>
            {myListing.listingType === "regular" && <Listing

            //Publisher Info props
            publisher = {publisher}
            setPublisher = {setPublisher}
            pulisherImage = {pulisherImage}
            setPublisherImage = {setPublisherImage}
            publisherFirstName = {publisherFirstName}
            setPublisherFirstName = {setPublisherFirstName}
            publisherPronouns = {publisherPronouns}
            setPublisherPronouns = {setPublisherPronouns}

            // Regular Listing props
            myListing = {myListing}
            listingType = {listingType}
            setListingType = {setListingType}
            displayImage = {displayImage} 
            setDisplayImage = {setDisplayImage}
            listingImage = {listingImage}
            setListingImage = {setListingImage}
            listingTitle = {listingTitle}
            setListingTitle = {setListingTitle}
            listingPrice = {listingPrice}
            setListingPrice = {setListingPrice}
            listingCategory = {listingCategory}
            setListingCategory = {setListingCategory}
            listingSubCategory = {listingSubCategory}
            setListingSubCategory = {setListingSubCategory}
            listingCondition = {listingCondition}
            setListingCondition = {setListingCondition}
            listingContactEmail = {listingContactEmail} 
            setListingContactEmail = {setListingContactEmail}
            listingContactPhoneNumber = {listingContactPhoneNumber} 
            setListingContactPhoneNumber ={setListingContactPhoneNumber}
            listingDescription = {listingDescription}
            setListingDescription = {setListingDescription}

            />}

            {myListing.listingType === "vehicle" && <DetailedListing

            //Publisher Info props
            publisher = {publisher}
            setPublisher = {setPublisher}
            pulisherImage = {pulisherImage}
            setPublisherImage = {setPublisherImage}
            publisherFirstName = {publisherFirstName}
            setPublisherFirstName = {setPublisherFirstName}
            publisherPronouns = {publisherPronouns}
            setPublisherPronouns = {setPublisherPronouns}

            // Regular Listing props
            myListing = {myListing}
            listingType = {listingType}
            setListingType = {setListingType}
            displayImage = {displayImage} 
            setDisplayImage = {setDisplayImage}
            listingImage = {listingImage}
            setListingImage = {setListingImage}
            listingTitle = {listingTitle}
            setListingTitle = {setListingTitle}
            listingPrice = {listingPrice}
            setListingPrice = {setListingPrice}
            listingCategory = {listingCategory}
            setListingCategory = {setListingCategory}
            listingSubCategory = {listingSubCategory}
            setListingSubCategory = {setListingSubCategory}
            listingCondition = {listingCondition}
            setListingCondition = {setListingCondition}
            listingContactEmail = {listingContactEmail} 
            setListingContactEmail = {setListingContactEmail}
            listingContactPhoneNumber = {listingContactPhoneNumber} 
            setListingContactPhoneNumber ={setListingContactPhoneNumber}
            listingDescription = {listingDescription}
            setListingDescription = {setListingDescription}


            // Vehicle Listing props
            listingVehicleType = {listingVehicleType}
            setListingVehicleType = {setListingVehicleType}
            listingVehicleMake = {listingVehicleMake}
            setListingVehicleMake = {setListingVehicleMake}
            listingVehicleModel = {listingVehicleModel}
            setListingVehicleModel = {setListingVehicleModel}
            listingVehicleYear = {listingVehicleYear}
            setListingVehicleYear = {setListingVehicleYear}
            listingVehicleTransmission = {listingVehicleTransmission}
            setListingVehicleTransmission = {setListingVehicleTransmission}
            listingVehicleColor = {listingVehicleColor}
            setListingVehicleColor = {setListingVehicleColor}
            listingVehicleMilesDriven = {listingVehicleMilesDriven}
            setListingVehicleMilesDriven = {setListingVehicleMilesDriven}
            listingVehicleMpgMin = {listingVehicleMpgMin}
            setListingVehicleMpgMin = {setListingVehicleMpgMin}
            listingVehicleMpgMax = {listingVehicleMpgMax}
            setListingVehicleMpgMax = {setListingVehicleMpgMax}
            />}




            { myListing.listingType === "property" && <DetailedListing
            categoriesList = {props.categoriesList}
            urlEndPoint = {props.urlEndPoint}
            setShouldRefresh = {props.setShouldRefresh}

            // Regular Listing props
            myListing = {myListing}
            listingType = {listingType}
            setListingType = {setListingType}
            displayImage = {displayImage} 
            setDisplayImage = {setDisplayImage}
            listingImage = {listingImage}
            setListingImage = {setListingImage}
            listingTitle = {listingTitle}
            setListingTitle = {setListingTitle}
            listingPrice = {listingPrice}
            setListingPrice = {setListingPrice}
            listingCategory = {listingCategory}
            setListingCategory = {setListingCategory}
            listingSubCategory = {listingSubCategory}
            setListingSubCategory = {setListingSubCategory}
            listingCondition = {listingCondition}
            setListingCondition = {setListingCondition}
            listingContactEmail = {listingContactEmail} 
            setListingContactEmail = {setListingContactEmail}
            listingContactPhoneNumber = {listingContactPhoneNumber} 
            setListingContactPhoneNumber ={setListingContactPhoneNumber}
            listingDescription = {listingDescription}
            setListingDescription = {setListingDescription}

            //Property Listing props
            listingPropertyListingType = {listingPropertyListingType}
            setListingPropertyListingType = {setListingPropertyListingType}
            listingPropertyType = {listingPropertyType}
            setListingPropertyType = {setListingPropertyType}
            listingPropertyStreetAddress = {listingPropertyStreetAddress}
            setListingPropertyStreetAddress = {setListingPropertyStreetAddress}
            listingPropertyCity = {listingPropertyCity}
            setListingPropertyCity = {setListingPropertyCity}
            listingPropertyState = {listingPropertyState}
            setListingPropertyState = {setListingPropertyState}
            listingPropertyZipcode = {listingPropertyZipcode}
            setListingPropertyZipcode = {setListingPropertyZipcode}
            listingPropertyYearBuilt = {listingPropertyYearBuilt}
            setListingPropertyYearBuilt = {setListingPropertyYearBuilt}
            listingPropertyHasBasement = {listingPropertyHasBasement}
            setListingPropertyHasBasement = {setListingPropertyHasBasement}
            listingPropertyHasGarage = {listingPropertyHasGarage}
            setListingPropertyHasGarage = {setListingPropertyHasGarage}
            listingPropertyNumBedrooms = {listingPropertyNumBedrooms}
            setListingPropertyNumBedrooms = {setListingPropertyNumBedrooms}
            listingPropertyNumBathrooms = {listingPropertyNumBathrooms}
            setListingPropertyNumBathrooms = {setListingPropertyNumBathrooms}
        
            /> }
        </div>

    )
}

export default ListingPage;