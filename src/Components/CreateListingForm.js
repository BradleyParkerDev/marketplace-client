import '../index.css'
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function CreateListingForm(props){
    const navigate = useNavigate();
    const { urlEndPoint } = props;
    const {categoriesList} = props;
    const {setShouldRefresh} = props;
    // const { setShouldRefresh } = props;

    const [listingType, setListingType] = useState("regular")
    //User id
    const [listingUserId, setListingUserId] = useState("");

    // Regular Listing States
    const [listingTitle,setListingTitle] = useState("")
    const [listingPrice,setListingPrice] = useState(0)
    const [listingCategory,setListingCategory] = useState("")
    const [listingSubCategory,setListingSubCategory] = useState("")
    const [listingCondition,setListingCondition] = useState("")
    const [listingContactEmail, setListingContactEmail] = useState("")
    const [listingContactPhoneNumber, setListingContactPhoneNumber] = useState("");
    const [listingDescription,setListingDescription] = useState("")

    // Vehicle Listing States
    const [listingVehicleType, setListingVehicleType] = useState("");
    const [listingVehicleMake, setListingVehicleMake] = useState("");
    const [listingVehicleModel, setListingVehicleModel] = useState("");
    const [listingVehicleYear, setListingVehicleYear] = useState("");
    const [listingVehicleTransmission, setListingVehicleTransmission] = useState("");
    const [listingVehicleColor, setListingVehicleColor] = useState("");
    const [listingVehicleMilesDriven, setListingVehicleMilesDriven] = useState("");
    const [listingVehicleMpgMin, setListingVehicleMpgMin] = useState("");
    const [listingVehicleMpgMax, setListingVehicleMpgMax] = useState("");

    // Property Listing States
    const [listingPropertyType, setListingPropertyType] = useState("");
    const [listingPropertyStreetAddress, setListingPropertyStreetAddress] = useState("");
    const [listingPropertyCity, setListingPropertyCity] = useState("");
    const [listingPropertyState, setListingPropertyState] = useState("");
    const [listingPropertyZipcode, setListingPropertyZipcode] = useState("");
    const [listingPropertyYearBuilt, setListingPropertyYearBuilt] = useState("");
    const [listingPropertyHasBasement, setListingPropertyHasBasement] = useState("");
    const [listingPropertyHasGarage, setListingPropertyHasGarage] = useState("");
    const [listingPropertyNumBedrooms, setListingPropertyNumBedrooms] = useState("");
    const [listingPropertyNumBathrooms, setListingPropertyNumBathrooms] = useState("");



    console.log(categoriesList)


    const postListing = () =>{
        setShouldRefresh(true)
        console.log(urlEndPoint)
        const req =  {
            title: listingTitle,
            price: listingPrice,
            category: listingCategory,
            subCategory: listingSubCategory,
            condition: listingCondition,
            email: listingContactEmail,
            phoneNumber: listingContactPhoneNumber,
            description: listingDescription,

        }
        axios.post(`${urlEndPoint}/listings/create-listing`, req)
        .then(function (response) {
          console.log(response);
            setShouldRefresh(false);
    
        },{
          'Content-Type': 'application/x-www-form-urlencoded'
        })
        .catch(function (error) {
          console.log(error);
        }); 
    
    }
    


    function handleTitleChange(e){
        setListingTitle(e.target.value)
    }
    function handlePriceChange(e){
        setListingPrice(e.target.value)
    }
    function handleCategoryChange(e){
        setListingCategory(e.target.value)
    }
    function handleSubCategoryChange(e){
        setListingSubCategory(e.target.value)
    }
    function handleConditionChange(e){
        setListingCondition(e.target.value)
    }
    function handleEmailChange(e){
        setListingContactEmail(e.target.value)
    }
    function handlePhoneNumberChange(e){
        setListingContactPhoneNumber(e.target.value)
    }
    function handleDescriptionChange(e){
        setListingDescription(e.target.value)
    }

    //Shows vehicle form details
    function showVehicleFormDetails(){
        return(  
            <div className="createListingDetails">
                <div id="createVehicleHeader">
                    <p>Vehicle Details</p>
                </div>
                <div id="createVehicleFacts">
                    <input 
                        id="createVehicleMake"
                        class="form-control"
                        type = "text" 
                        name = "createVehicleMake"
                        placeholder = "Make"
                        autocomplete = "off"
                    />
                    <input 
                        id="createVehicleModel"
                        class="form-control"
                        type = "text" 
                        name = "createVehicleModel"
                        placeholder = "Model"
                        autocomplete = "off"
                    />
                    <input 
                        id="createVehicleYear"
                        class="form-control"
                        type = "text" 
                        name = "createVehicleYear"
                        placeholder = "Year"
                        autocomplete = "off"
                    />
                </div>
                <div id="createVehicleFactsL2">
                    <Form.Select class="form-control" id ="createVehicleTransmisson" aria-label="condition">
                            <option value = "">Transmission</option>
                            <option value="Automatic">Automatic</option>
                            <option value="Manual">Manual</option>
                    </Form.Select>  
                    <input 
                        id="createVehicleColor"
                        class="form-control"
                        type = "text" 
                        name = "createVehicleColor"
                        placeholder = "Color"
                        autocomplete = "off"
                    />   
                    <input 
                        id="createVehicleMilesDriven"
                        class="form-control"
                        type = "text" 
                        name = "createVehicleMilesDriven"
                        placeholder = "# of Miles Driven"
                        autocomplete = "off"
                    />      
                </div>
                <div id="createVehicleFactsL3">
                    <div id="createMileageLabel">
                        <p>Mileage Range: </p>
                    </div>
                    <input 
                        id="createVehicleMpg1"
                        class="form-control"
                        type = "text" 
                        name = "createVehicleMpg1"
                        placeholder = ""
                        autocomplete = "off"
                    /> 
                    <div className="rangeLabels">
                        <p> to </p>
                    </div>
                    <input 
                        id="createVehicleMpg2"
                        class="form-control"
                        type = "text" 
                        name = "createVehicleMpg2"
                        placeholder = ""
                        autocomplete = "off"
                    /> 
                    <div className="rangeLabels">
                        <p> MPG </p>
                    </div>  
                </div>
            </div>
        )
    }
    //Shows property form details
    function showPropertyFormDetails(){
        return(  
            <div className="createListingDetails">
                <div id="createVehicleHeader">
                    <p>Property Details</p>
                </div>
                <div id="createVehicleFacts">


                    <input 
                        id="createStreetAddress"
                        class="form-control"
                        type = "text" 
                        name = "address"
                        placeholder = "Street Address"
                        autocomplete = "off"
                    />   
                    <input 
                        id="createCity"
                        class="form-control"
                        type = "text" 
                        name = "createCity"
                        placeholder = "City"
                        autocomplete = "off"
                    /> 
                    <input 
                        id="createState"
                        class="form-control"
                        type = "text" 
                        name = "createState"
                        placeholder = "State"
                        autocomplete = "off"
                    />
                    <input 
                        id="createZipCode"
                        class="form-control"
                        type = "text" 
                        name = "createZipCode"
                        placeholder = "Zipcode"
                        autocomplete = "off"
                    />

                </div>
                <div id="createVehicleFactsL2">

                    <input 
                        id="createPropertyYearBuilt"
                        class="form-control"
                        type = "text" 
                        name = "createPropertyYearBuilt"
                        placeholder = "Year Built"
                        autocomplete = "off"
                    />
                    <div id="createBedroomLabel">
                        <p>Basement: </p>
                    </div>
                    <input 
                        id="createBasement"
                        type = "checkbox" 
                        name = "createBasement"
                    /> 
                    <div id="createBathroomLabel">
                        <p>Garage: </p>
                    </div>
                    <input 
                        id="createGarage"
                        type = "checkbox" 
                        name = "createGarage"
                    />
                </div>
                <div id="createVehicleFactsL3">
                    <div id="createMileageLabel">
                        <p>Number of Bedrooms: </p>
                    </div>
                    <input 
                        id="createVehicleMpg1"
                        class="form-control"
                        type = "text" 
                        name = "createVehicleMpg1"
                        placeholder = ""
                        autocomplete = "off"
                    /> 
                    <div id="createMileageLabel">
                        <p>Number of Bathrooms: </p>
                    </div>
                    <input 
                        id="createVehicleMpg1"
                        class="form-control"
                        type = "text" 
                        name = "createVehicleMpg1"
                        placeholder = ""
                        autocomplete = "off"
                    /> 
                </div>
            </div>
        )
    }
    //Shows property radio buttons
    function showPropertyRadios(){
        return(

            <div id="propertyRadio">
            <div className='createRadio'>
                <label>For Rent</label>
                {" "}
                <input 
                    type="radio"
                    name ="propertyListingType"
                    value ="vehicle"
                />
            </div>
            <div className='createRadio'>
                <label>For Sale</label>
                {" "}
                <input 
                    type="radio"
                    name ="propertyListingType"
                    value ="property"
                />                                    
            </div> 
            </div>
        )
    }

    // displays subcategories
    function showSubCategoryOptions(){
        return(
            <Form.Select class="form-control" id ="subCategorySelector" aria-label="subCategory">
                <option value = "">Subcategory</option>
            </Form.Select> 
        )
    }
    // displays vehicle type options
    function showVehicleTypeOptions(){
        return(
            <Form.Select class="form-control" id ="subCategorySelector" aria-label="subCategory">
                <option value = "">Vehicle Type</option>
            </Form.Select>
        )
    }
    // dislpays property type options
    function showPropertyTypeOptions(){
        return(
            <Form.Select class="form-control" id ="subCategorySelector" aria-label="subCategory">
                <option value = "">Property Type</option>
            </Form.Select>
        )
    }

    function handleTypeChange(e){
        setListingType(e.target.value)
        console.log(listingType)
    }

    return(
        <div id="createListingDiv">
            {/* createContainerOne */}
            <div id="createContainerOne">
                <div id = "createTextArea">
                    <div id="createHeaderContainer">
                        <div id = "cld-title">
                            <h1>New Listing</h1>
                        </div>
                        <div id="listingType">
                            <div id="lt-title">Listing Type:</div>
                            <div id = "listingRadio">
                                {/* Regular */}
                                <div className='createRadio'>
                                    <label>Regular</label>
                                    {" "}
                                    <input 
                                        type="radio"
                                        name ="listingType"
                                        value ="regular"
                                        onChange = {handleTypeChange}
                                        checked = {listingType === "regular"}

                                    />
                                </div>
                                {/* Vehicle */}
                                <div className='createRadio'>
                                    <label>Vehicle</label>
                                    {" "}
                                    <input 
                                        type="radio"
                                        name ="listingType"
                                        value ="vehicle"
                                        onChange = {handleTypeChange}
                                        checked = {listingType === "vehicle"}
                                    />
                                </div>
                                {/* Property */}
                                <div className='createRadio'>
                                    <label>Property</label>
                                    {" "}
                                    <input 
                                        type="radio"
                                        name ="listingType"
                                        value ="property"
                                        onChange = {handleTypeChange}
                                        checked = {listingType === "property"}
                                    />                                    
                                </div>
                            </div>
                            <div>

                            {listingType === "property"&& showPropertyRadios()}

                            </div>

                        </div>
                    </div>

                    <input 
                        id="newListingTitle"
                        class="form-control"

                        type = "text" 
                        name = "title"
                        placeholder = "Title"
                        autocomplete = "off"
                        onChange = {handleTitleChange}
                    /> 
                    <div>
                        <div id="priceCategorySubcategory">
                            <input 
                                id="newListingPrice"
                                class="form-control"
                                type = "text" 
                                name = "title"
                                placeholder = "Price"
                                autocomplete = "off"
                                onChange = {handlePriceChange}

                            /> 

                            <Form.Select class="form-control" id ="categorySelector" aria-label="category">
                                <option value = "">Category</option>
                                {categoriesList.map(category=>(
                                <option value={`${category.id}`}>{category.name}</option>))} 
                            </Form.Select>

                            {/* Dispays options for subcategories */}
                            {listingType === "property"&& showPropertyTypeOptions()}
                            {listingType === "vehicle"&& showVehicleTypeOptions()}
                            {listingType === "regular"&& showSubCategoryOptions()}

                        </div>
                        <div id="conditionContact">
                        <Form.Select class="form-control" id ="conditionSelector" aria-label="condition">
                                <option value = "">Condition</option>
                                <option value="New">New</option>
                                <option value="Used - Like New">Used - Like New</option>
                                <option value="Used - Good">Used - Good</option>
                                <option value="Used - Fair">Used - Fair</option>

                            </Form.Select>                            
                            <input 
                                id="contactEmail"
                                class="form-control"
                                type = "text" 
                                name = "contactEmail"
                                placeholder = "Contact Email"
                                autocomplete = "off"
                            />
                            <input 
                                id="contactPhone"
                                class="form-control"
                                type = "text" 
                                name = "contactPhone"
                                placeholder = "Contact Phone Number"
                                autocomplete = "off"
                            />
                        </div>
                    </div>


                    <textarea class="form-control" id="cld-description" name="" placeholder="Description">
                    </textarea>
                </div>
                {listingType === "vehicle"&& showVehicleFormDetails()}
                {listingType === "property"&& showPropertyFormDetails()}

            </div>


            {/* createContainerTwo */}
            <div id="createContainerTwo">
                <div id="createImageUpload">
                    <div id="uploadPhotoTitle">
                        <p>Photos</p>
                    </div>
                </div>
                <Button 
                id="createSubmitButton" 
                variant="success"
                onClick={()=>{
                    postListing()
                    navigate("/")}} >
                    Publish
                </Button>
            </div>

        </div>
       
    )
}



export default CreateListingForm;