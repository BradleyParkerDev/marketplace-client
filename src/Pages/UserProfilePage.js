//Page allows user to create, read, update, and delete listings and their user profile
import { useAuth } from "../Hooks/Auth";
import UpdateUserInfoForm from "../Components/UpdateUserInfoForm";
//The HomePage shows arranged listings by different users
import ListingCard from "../Components/ListingCard";
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const UserContext = createContext()

const urlEndPoint = process.env.REACT_APP_URL_ENDPOINT;


function UserProfilePage (props){
    const auth = useAuth(); //access the authentication context 
    const {categoriesList} = props
    const {searchCategory} = props
    const {searchCategoryName} = props
    const {listingCategorySearchResult} = props
    const [myListings, setMyListings] = useState([])

    const [userImage, setUserImage] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dob,setDob] = useState("");
    const [pronouns, setPronouns] = useState("")
    const [genderValue, setGenderValue] = useState('');
    const [customGender, setCustomGender] = useState(false)

    console.log(auth.userId)

    useEffect(()=> {
        //Getting User Info
        axios.get(`${urlEndPoint}/listings/get-listing-by-user-id/${auth.userId}`)
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




        //Getting User Listings
        axios.get(`${urlEndPoint}/listings/get-listing-by-user-id/${auth.userId}`)
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
    },[auth.userId])




    return(
        <div id="userProfileDiv">
            <div id ="updateUserDiv">
                <div id="userProfileHeader">
                    <div id="userProfileHeaderTitle">
                        <h1>Update Info</h1>
                    </div>
                </div>
                <div id = "userUpdateBody">
                    <div id ="userUpdateContainer1">
                        <div id="userProfileImage">

                        </div>
                    </div>
                    <div id ="userUpdateContainer2">
                        <UpdateUserInfoForm 
                            firstName = {props.firstName}
                            setFirstName = {props.setFirstName}
                            lastName = {props.lastName}
                            setLastName = {props.setLastName}
                            email = {props.email}
                            setEmail = {props.setEmail}
                            password = {props.password}
                            setPassword = {props.setPassword}
                            dob = {props.dob}
                            setDob = {props.setDob}
                            pronouns = {props.pronouns}
                            setPronouns = {props.setPronouns}   
                            genderValue = {props.genderValue}
                            setGenderValue = {props.setGenderValue}
                            customGender = {props.customGender}
                            setCustomGender = {props.setCustomGender}                               
                        />
                        <div id="userUpdateContainer2Footer">
                            <Button id = "userUpdateButton" variant="success">
                                Update
                            </Button>                            
                        </div>

                    </div>



                </div>
            </div>
            <div id="card-container-outer-div">
                <div id="card-container-header">
                    <div id="card-container-header-title">
                        <h1 id="card-container-header-text">{`${auth.userFirstName}'s Listings`}</h1>
                    </div>
                </div>
                <div id="card-container">
                    {/* {searchCategory === "All Listings" && myListings.map(listing=>(<ListingCard listing =  {listing}/>))} */}
                    {myListings.length > 0 && myListings.map(listing=>(<ListingCard listing = {listing}/>))}
                </div>
            </div>
        </div>
    )
}

export default UserProfilePage;