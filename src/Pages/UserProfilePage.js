//Page allows user to create, read, update, and delete listings and their user profile
import { useAuth } from "../Hooks/Auth";
import UpdateUserInfoForm from "../Components/UpdateUserInfoForm";
//The HomePage shows arranged listings by different users
import ListingCard from "../Components/ListingCard";
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { storage }from "../firebase"
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';
const UserContext = createContext()

const urlEndPoint = process.env.REACT_APP_URL_ENDPOINT;


function UserProfilePage (props){
    // console.log(props);
    const auth = useAuth(); //access the authentication context 
    const [userData,setUserData] = useState(null)
    
    const {
        categoriesList,
        searchCategory,
        searchCategoryName,
        listingCategorySearchResult
    } = props

    const [shouldRefresh, setShouldRefresh] = useState(false);
    const [myListings, setMyListings] = useState([])
    const [userImage, setUserImage] = useState("");
    const [displayImage, setDisplayImage] = useState("")
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dob,setDob] = useState("");
    const [pronouns, setPronouns] = useState("")
    const [genderValue, setGenderValue] = useState('');
    const [customGender, setCustomGender] = useState(false)
    //Getting user listings and info




    useEffect(()=>{
        //Getting User listings
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


    

        //Getting User info
        axios.get(`${urlEndPoint}/users/get-user/${auth.userId}`)
        .then(function (response){
        console.log(response);
            setUserData(response.data.user);
            setFirstName(response.data.user.firstName)

            if(response.data.user.userImage !== null){
                setDisplayImage(response.data.user.userImage);
            }

            setFirstName(response.data.user.firstName);
            setLastName(response.data.user.lastName);
            setEmail(response.data.user.email);
            // setPassword(userData.password);
            setDob(response.data.user.dob);
            setPronouns(response.data.user.pronouns);
            setGenderValue(response.data.user.gender);
            setCustomGender(false)
            console.log(firstName)
            console.log(userData);

        })
        .catch(function (error){
            console.log(error);
        })
        .finally(function (){
        //always executed
        })

    },[auth.userId,shouldRefresh])    

    console.log(auth.userId)

    ///////////////////////////////////////////////////////////////////////////
    // updateUser
    ///////////////////////////////////////////////////////////////////////////
    
    const [imageUpload, setImageUpload] = useState(null)
    const imageListRef = ref(storage, "userImages/")
    const updateUser = () => {
        setShouldRefresh(true)
        auth.setIsAuthLoading(true)
        //Uploading images to firebase
        if(imageUpload == null) {
            putUserUpdate(displayImage)
            // console.log("No image") 
            return
        };
        const imageRef = ref(storage, `userImages/${imageUpload.name + v4() }`)
        uploadBytes(imageRef, imageUpload).then((snapshot) =>{
            getDownloadURL(snapshot.ref).then((url) => {
                console.log(url)
                setUserImage([url]);
                console.log(userImage)
                return url

            }).then((url)=>{
                console.log("Put User Update")
                putUserUpdate(url)
                // navigate('/')
            })
            // alert("Image Uploaded")
        })

    } 

    const putUserUpdate = (url) =>{
        // setShouldRefresh(true)

        const req ={
            userImage: url,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            // dob: dob,
            gender: genderValue,
            pronouns: pronouns
        }
        console.log(req)

        axios.put(`${urlEndPoint}/users/update-user/${auth.userId}`, req)
        .then(function (response) {
            console.log(response);
            setShouldRefresh(false);

            auth.setIsAuthLoading(false)
            },{
                'Content-Type': 'application/x-www-form-urlencoded'
            })
            .catch(function (error) {
            console.log(error);
        });
        setPassword('') 
    }

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
                        <div id="containerOneUpperDiv">
                            <div id="userProfileImage">
                                <img
                                    id="userImg"
                                    src = {`${displayImage}.jpg`}

                                />
                            </div>                            
                        </div>
                        <div id ="containterOneLowerDiv">
                            <div id="cOnePhotoUploadDiv">
                                <input 
                                type="file"
                                onChange={(event)=>{setImageUpload(event.target.files[0])}}

                                />
                            </div>
              

                        </div>


                    </div>
                    <div id ="userUpdateContainer2">
                        <UpdateUserInfoForm
                            userDate = {userData} 
                            firstName = {firstName}
                            setFirstName = {setFirstName}
                            lastName = {lastName}
                            setLastName = {setLastName}
                            email = {email}
                            setEmail = {setEmail}
                            password = {password}
                            setPassword = {setPassword}
                            dob = {dob}
                            setDob = {setDob}
                            pronouns = {pronouns}
                            setPronouns = {setPronouns}   
                            genderValue = {genderValue}
                            setGenderValue = {setGenderValue}
                            customGender = {customGender}
                            setCustomGender = {setCustomGender}                               
                        />
                        <div id="userUpdateContainer2Footer">
                            <Button 
                            id = "userUpdateButton" 
                            variant="success"                
                            onClick={()=>{
                            updateUser()
                            }}
                            >
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
                    {myListings.length > 0 && myListings.map(listing=>(<ListingCard listing = {listing} />))}
                </div>
            </div>
        </div>
    )
}

export default UserProfilePage;