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
    const [customGender, setCustomGender] = useState(false)
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
              value = {pronouns}
              autocomplete = "off"
              onChange = {handlePronounsInput}

            />
            <input 
              id="genderInputText"
              class="form-control"
              type = "text" 
              name = "gender"
              value = {genderValue}
              onChange={handleGenderInput}
              placeholder = "Gender"
              autocomplete = "off"

            />
        </div>

      )
    }


    function handlePronounsInput(e){
      setPronouns(e.target.value)
    }
    function handleGenderInput(e){
      setGenderValue(e.target.value)
    }
    function handleGenderChange(e){
      if(e.target.value === "male"){
        setGenderValue(e.target.value)
        setPronouns("(Him/He)")
      }
      if(e.target.value === "female"){
        setGenderValue(e.target.value)
        setPronouns("(She/Her)")
      }
      if(e.target.value === "custom"){
        setPronouns("")
        setGenderValue("")

        setCustomGender(true)

      }else{
        setCustomGender(false)
      }
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
    // function togglePassord() {
    //   var x = document.getElementById("password");
    //   if (x.type === "password") {
    //     x.type = "text";
    //   } else {
    //     x.type = "password";
    //   }
    // }  
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
                value = {firstName}
                autocomplete = "off"
                onChange={handleFirstNameChange}
              />
              <input
                id="lastName" 
                class="form-control"

                type = "text" 
                name = "lastName"
                placeholder = "Last Name"
                value = {lastName}
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
              value = {email}
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
              value = {password}
              autocomplete = "off"
              onChange={handlePasswordChange}
            />  
            
            {/* couldnt get toggle to work here */}
            
            {/* <div className="showPassword">

            <input type="checkbox" onClick={togglePassord}/> 
              <p id="showPassText">Show Password</p>
            </div>  */}


            {/* <br />  */}
            {/* Birthday  */}
            {/* <div id = "birthday">
              <input 
                class="form-control"
                type = "date" 
                name = "date"
                value = {dob}
                onChange={handleDobChange}


              /> 
            </div> */}

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
                  checked = {customGender}
                />              
              </div>


          </div>
          {customGender && genderForm()}

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
                  // dob: dob,
                  gender: genderValue,
                  pronouns: pronouns

                }
                // if()
                const registerResult = await auth.register(newUser);
                if (registerResult.success) {
                  setFirstName("")
                  setLastName("")
                  setEmail("")
                  setPassword("")
                  setDob("")
                  setGenderValue("")
                  setPronouns("")
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