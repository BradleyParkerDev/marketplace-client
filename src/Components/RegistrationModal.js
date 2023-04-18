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
    const [show, setShow] = useState(false);
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

              />
              <input
                id="lastName" 
                class="form-control"

                type = "text" 
                name = "lastName"
                placeholder = "Last Name"
                autocomplete = "off"


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

            /> 
            <br/> 
            <input 
              id="password"
              class="form-control"

              type = "text" 
              name = "password"
              placeholder = "Password"
              autocomplete = "off"


            />  
            <br /> 
            {/* Birthday  */}
            <div id = "birthday">
              <input 
                class="form-control"

                type = "date" 
                name = "date"

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
                  checked = {genderValue === "male"}
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
            <Button variant="success" onClick={handleClose}>
              Sign Up
            </Button>
        </Modal.Footer>
        </Modal>

      </div>

      </>
    );
}
export default RegistrationModal;