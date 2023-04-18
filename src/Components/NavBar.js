/* 
Displays a login/registration button, a create listing button, a list of Categories.
The login/registration button will turn into users name and image when they login.
The NavBar will take up the left side of the page.
*/
import RegistrationModal from "../Components/RegistrationModal";
import Button from 'react-bootstrap/Button';

const NavBar = (props) => {


    const {categoriesList} = props;
    console.log(categoriesList)
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
            <h1 id="logo">Parker's Market</h1>
            {/* divider */}
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
                /> 

                <br/> 
                <input 
                id="loginPassword"
                class="form-control"
                type = "password" 
                name = "password"
                placeholder = "Password"
                autocomplete = "off"
                /> 
                <Button id="loginButton" variant="primary">
                    Login
                </Button>
                <br/>
                <RegistrationModal />
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

