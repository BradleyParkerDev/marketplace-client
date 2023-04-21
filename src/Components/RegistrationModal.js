//The modal allows users to login or register
import { useAuth } from "../Hooks/Auth";
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const urlEndPoint = process.env.REACT_APP_URL_ENDPOINT;

const RegistrationModal = (props) =>{

    const auth = useAuth(); //access the authentication context 
    const navigate = useNavigate();
    const [registerMessage, setRegisterMessage] = useState("");

    const [show, setShow] = useState(false);

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dob,setDob] = useState("");
    const [pronouns, setPronouns] = useState("")
    const [genderValue, setGenderValue] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    function genderForm(){
      return(
        <div id = "genderDiv">
            <input 
              id="pronouns"
              class="form-control"
              type = "text" 
              name = "pronouns"
              placeholder = "Pronouns"
              autocomplete = "off"

            />
            <input 
              id="genderInputText"
              class="form-control"
              type = "text" 
              name = "gender"
              placeholder = "Gender"
              autocomplete = "off"

            />
        </div>

      )
    }



    function handleGenderChange(e){
      setGenderValue(e.target.value)
    }
    function handleFirstNameChange(e){
      setFirstName(e.target.value)
    }    
    function handleLastNameChange(e){
      setLastName(e.target.value)
    }   

    function handleEmailChange(e){
      setEmail(e.target.value)
    }
    function handlePasswordChange(e){
      setPassword(e.target.value)
    }    
    function handleDobChange(e){
      setDob(e.target.value)
    }  
    return (
      <>
        <Button id="registrationButton" variant="success" onClick={handleShow}>
          Create Account
        </Button>

      <div id="registrationModal">
        <Modal show={show} onHide={handleClose}>
          {/* Text Inputs */}
          <div id="registration">

            <div id="name">
              <input 
                id="firstName"
                class="form-control"
                type = "text" 
                name = "firstName"
                placeholder = "First Name"
                autocomplete = "off"
                onChange={handleFirstNameChange}
              />
              <input
                id="lastName" 
                class="form-control"

                type = "text" 
                name = "lastName"
                placeholder = "Last Name"
                autocomplete = "off"
                onChange={handleLastNameChange}


              />
            </div>

            <br/>
            <input 
              id="email"
              class="form-control"
              type = "text" 
              name = "email"
              placeholder = "Email"
              autocomplete = "off"
              onChange={handleEmailChange}

            /> 
            <br/> 
            <input 
              id="password"
              class="form-control"
              type = "password" 
              name = "password"
              placeholder = "Password"
              autocomplete = "off"
              onChange={handlePasswordChange}



            />  
            <br /> 
            {/* Birthday  */}
            <div id = "birthday">
              <input 
                class="form-control"
                type = "date" 
                name = "date"
                onChange={handleDobChange}


              /> 
            </div>
            <br /> 
            {/* Gender */}
            <div id = "gender">

              {/* male div */}
              <div id="male">
                <label>Male</label>
                {" "}
                <input 
                  type="radio" 
                  name = "gender"
                  value="male"
                  onChange = {handleGenderChange}
                  checked = {genderValue === "male" }
                />
              </div>
              {/* female div */}
              <div id="female">
                <label>Female</label>
                {" "}
                <input 
                  type="radio" 
                  name = "gender"
                  value="female"
                  onChange = {handleGenderChange}
                  checked = {genderValue === "female"}
                />                
              </div>
              {/* custom div */}
              <div id="custom">
                <label>Custom</label>
                {" "}
                <input 
                  type="radio"
                  name = "gender" 
                  value="custom"
                  onChange = {handleGenderChange}
                  checked = {genderValue === "custom"}
                />              
              </div>


          </div>
          {genderValue === "custom"&& genderForm()}

        </div>

        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button 
              variant="success" 
              // onClick={handleClose}
              onClick={async () => {
                const newUser = {
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  password: password,
                  dob: dob,
                  gender: genderValue,
                  pronouns: pronouns

                }
                const registerResult = await auth.register(newUser);
                if (registerResult.success) {
                  navigate("/");
                }
                if (!registerResult.success) {
                  setRegisterMessage(registerResult.message);
                }
                handleClose()

              }}
              
              >
              Sign Up
            </Button>
        </Modal.Footer>
        </Modal>

      </div>

      </>
    );
}
export default RegistrationModal;