import '../index.css'
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

function UpdateListingPage (props){
    const params = useParams();
    const auth = useAuth(); //access the authentication context 
    const [myListing, setMyListing] = useState({
        listingType: ''
    })
    const [shouldRefresh, setShouldRefresh] = useState(false)

    const {
        categoriesList,
        urlEndPoint
    } = props


    useEffect (()=>{
        axios.get(`${urlEndPoint}/listings/get-listing/${params.listingId}`)
        .then(function (response){
            setMyListing(response.data.listing);
            setShouldRefresh(true)
        
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
            {myListing.listingType === "regular" && <UpdateListingForm
            categoriesList = {categoriesList}
            urlEndPoint = {urlEndPoint}
            setShouldRefresh = {setShouldRefresh}
            />}

            {myListing.listingType === "vehicle" && <UpdateVehicleListingForm
            categoriesList = {categoriesList}
            urlEndPoint = {urlEndPoint}
            setShouldRefresh = {setShouldRefresh}
            />}

            { myListing.listingType === "property" && <UpdatePropertyListingForm
            categoriesList = {categoriesList}
            urlEndPoint = {urlEndPoint}
            setShouldRefresh = {setShouldRefresh}  
            /> }
        </div>
        )
}

export default UpdateListingPage;