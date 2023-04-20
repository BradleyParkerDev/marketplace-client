/* 
Displays a login/registration button, a create listing button, a list of Categories.
The login/registration button will turn into users name and image when they login.
The NavBar will take up the left side of the page.
*/
import RegistrationModal from "../Components/RegistrationModal";
import Button from 'react-bootstrap/Button';
import { useNavigate  } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from "../Hooks/Auth";

const NavBar = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    const auth = useAuth(); //access the authentication context 
    const navigate = useNavigate();

    const {categoriesList} = props;
    console.log(categoriesList)

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



    function CategoryDivs(){
        return(
            categoriesList.map(category=>(
                <div className="categoryMenuCard">
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


    return(
        <div id = "navDiv">
            <h1 id="logo" onClick={()=>{
                    navigate("/") }}>
                Parker's Market</h1>
            {/* divider */}
            <h3>{auth.userEmail && `${auth.userEmail}`}</h3>

            <hr class="solid"/> 
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

