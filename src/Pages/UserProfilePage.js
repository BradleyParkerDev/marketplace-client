//Page allows user to create, read, update, and delete listings and their user profile
import { useAuth } from "../Hooks/Auth";

//The HomePage shows arranged listings by different users
import ListingCard from "../Components/ListingCard";
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
const UserContext = createContext()

const urlEndPoint = process.env.REACT_APP_URL_ENDPOINT;


function UserProfilePage (props){
    const auth = useAuth(); //access the authentication context 
    const {categoriesList} = props
    const {searchCategory} = props
    const {searchCategoryName} = props
    const {listingCategorySearchResult} = props
    const [myListings, setMyListings] = useState([])

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dob,setDob] = useState("");
    const [pronouns, setPronouns] = useState("")
    const [genderValue, setGenderValue] = useState('');

    useEffect(()=> {


        axios.get(`${urlEndPoint}/listings/get-listings-by-user-id/${auth.userId}`)
        .then(function (response){
          console.log(response);
            setMyListings(response.data.listings);
            console.log(myListings);
      
        })
        .catch(function (error){
            console.log(error);
        })
        .finally(function (){
          //always executed
        })
    },[searchCategory])




    return(
        <div id="card-container-outer-div">
            <div id="card-container-header">
                <div id="card-container-header-title">
                    <h1 id="card-container-header-text">{`${auth.userFirstName}'s Listings`}</h1>
                </div>
            </div>
            <div id="card-container">
                {/* {searchCategory === "All Listings" && myListings.map(listing=>(<ListingCard listing =  {listing}/>))} */}
                {/* {listingCategorySearchResult.length > 0 && listingCategorySearchResult.map(listing=>(<ListingCard listing = {listing}/>))} */}


            </div>
    
        </div>

        )
}

export default UserProfilePage;