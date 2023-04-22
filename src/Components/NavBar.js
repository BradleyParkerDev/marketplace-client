/* 
Displays a login/registration button, a create listing button, a list of Categories.
The login/registration button will turn into users name and image when they login.
The NavBar will take up the left side of the page.
*/
import RegistrationModal from "../Components/RegistrationModal";
import Button from 'react-bootstrap/Button';
import { useNavigate  } from 'react-router-dom';
import { useState, useEffect,createContext } from 'react';
import { useAuth } from "../Hooks/Auth";
import axios from 'axios';
const UserContext = createContext()
const urlEndPoint = process.env.REACT_APP_URL_ENDPOINT;

const NavBar = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");

    // const [listingCategorySearch, setListingCategorySearch] = useState([])
    // const [searchCategory, setSearchCategory] = useState("")

    const auth = useAuth(); //access the authentication context 
    const navigate = useNavigate();

    const {categoriesList} = props;
    const {shouldRefresh} = props
    const {searchCategory} = props
    const {setSearchCategory} = props
    const {searchCategoryName} = props
    const {setSearchCategoryName} = props
    // console.log(categoriesList)

    function ShowLogoutButton(){
        return(
                <Button onClick={()=>{
                    auth.logout()
                }}>Logout</Button> 
        )

    }

    function ShowLoginRegistration(){
        return <RegistrationModal />
    }

    function LoggedIn() {
        const isLoggedIn = auth.userToken;
        if (isLoggedIn) {
          return <ShowLogoutButton/>;
        }
        return <ShowLoginRegistration/>;
    }




    function CategoryDivs(props){
        return(
            categoriesList.map(category=>(
                <div className="categoryMenuCard"
                onClick={()=>{
                    setSearchCategory(`${category._id}`)
                    setSearchCategoryName(`${category.name}`)
                    console.log(searchCategory)
                }}

                >
                    <div className="categoryPhoto">
                        <img 
                            src={`/css/Icons/${category.name}.png`}
                            alt={`${category.name}`}
                        
                        />
                    </div>
                    <div className="categoryName">
                        <p>{category.name}</p>
                    </div>

                </div>
                )
            )         
        )
    }

    // useEffect(()=> {
    //     //Get Listings
    //     axios.get(`${urlEndPoint}/listings/get-listings-by-category/${searchCategory}`)
    //     .then(function (response){
    //       console.log(response.data);
    //         setListingCategorySearch("")
    //         setListingCategorySearch(response.data.listings);
    //         console.log(listingCategorySearch);
    
    //     })
    //     .catch(function (error){
    //         console.log(error);
    //     })
    //     .finally(function (){
    //       //always executed
    //     })
    // },[])
    

    return(
        <div id = "navDiv">
            <h1 id="logo" onClick={()=>{
                    setSearchCategory("All Listings")
                    setSearchCategoryName("All Listings")
                    console.log(searchCategory)
                    navigate("/") }}>
                Parker's Market</h1>
            {/* divider */}
            <hr class="solid"/> 
            <h3>{auth.userEmail && `Hi, ${auth.userEmail}`}</h3>
            <div id = "login">
                <p id="loginMessage">(Login to create a listing)</p>
                <input 
                id="loginEmail"
                class="form-control"

                type = "text" 
                name = "email"
                placeholder = "Email"
                autocomplete = "off"
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
                /> 

                <br/> 
                <input 
                id="loginPassword"
                class="form-control"
                type = "password" 
                name = "password"
                placeholder = "Password"
                autocomplete = "off"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                /> 
                <Button 
                    id="loginButton" 
                    variant="primary"
                    onClick={async () => {
                        //login in using auth context
                        const loginResult = await auth.login(email, password);
                        console.log("button onclick loginResult: ", loginResult)
                        if (loginResult.success) {
                          navigate("/")
                        }
                        if (!loginResult.success) {
                          setLoginMessage(loginResult.message)
                        }
                      }}
                    >
                    Login
                </Button>
                <br/>
                <RegistrationModal />
                <Button id="createButton" onClick={()=>{
                    navigate("/listings/create-listing")
                    }}>
                    + Create New Listing
                </Button>
                <Button id="logoutButton" variant="secondary" onClick={()=>{
                    auth.logout()
                }}>Logout</Button> 
            </div>
            {/* divider */}
            <hr class="solid"/> 

            <div id = "categories">
                <h3>Categories</h3>
                {categoriesList.length > 0 && CategoryDivs()}

            </div>


        </div>
    )
}
export default NavBar;

