import React, { useState } from 'react';

const UpdateUserInfoForm = (props) =>{
    const {firstName} = props;
    const {setFirstName} = props;
    const {lastName} = props;
    const {setLastName} = props;
    const {email} = props;
    const {setEmail} = props;
    const {password} = props;
    const {setPassword} = props;
    const {dob} = props;
    const {setDob} = props;
    const {pronouns} = props;
    const {setPronouns} = props;   
    const {genderValue} = props;
    const {setGenderValue} = props;
    const {customGender} = props;
    const {setCustomGender} = props;                                    

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


    return(
        <div id="registrationModal">
            {/* Text Inputs */}
            <div id="registration">
                {/* Name */}
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
                {/* Email */}
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
                {/* Password */}
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


                <br /> 
                {/* Birthday  */}
                <div id = "birthday">
                    <input 
                    class="form-control"
                    type = "date" 
                    name = "date"
                    value = {dob}
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
                        checked = {customGender}
                        />              
                    </div>
                </div>
                {customGender && genderForm()}
            </div>  
        </div>
    )
}

export default UpdateUserInfoForm;