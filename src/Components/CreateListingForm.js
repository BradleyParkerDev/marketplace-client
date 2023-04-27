import '../index.css'
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { storage }from "../firebase"
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';

import { useAuth } from "../Hooks/Auth";
const UserContext = createContext()

function CreateListingForm(props){
    const auth = useAuth(); //access the authentication context 
    const navigate = useNavigate();
    const { urlEndPoint } = props;
    console.log(urlEndPoint)
    const {categoriesList} = props;
    const {setShouldRefresh} = props;
    // const { setShouldRefresh } = props;

    const [listingType, setListingType] = useState("regular")
    //User id
    const [listingUserId, setListingUserId] = useState(auth.userId);
    console.log(listingUserId)
    //category
    const [newCategoriesList, setNewCategoriesList] = useState(categoriesList)

    //Vehicle and property objects
    const vehicleCategory = categoriesList[17]
    const propertyRentalCategory = categoriesList[16]
    const homeSalesCategory = categoriesList[10]

    //Options for selecting listing category
    useEffect(()=> {

        const filterResult = categoriesList.filter((category)=>{
            return category.name !== "Vehicles" && category.name !== "Property Rentals" && category.name !== "Home Sales"
        })
        setNewCategoriesList(filterResult)

    },[categoriesList])


    const [subCategoriesList, setSubCategoriesList] = useState([]);

    ///////////////////////////////////////////////////////////////////////////
    // States and event handlers for regular listings
    ///////////////////////////////////////////////////////////////////////////

    // Regular Listing States
    const [listingTitle,setListingTitle] = useState("")
    const [listingPrice,setListingPrice] = useState(0)
    const [listingCategory,setListingCategory] = useState("")
    const [listingSubCategory,setListingSubCategory] = useState("")
    const [listingCondition,setListingCondition] = useState("")
    const [listingContactEmail, setListingContactEmail] = useState("")
    const [listingContactPhoneNumber, setListingContactPhoneNumber] = useState("");
    const [listingDescription,setListingDescription] = useState("")
    //Holds listng Images
    const [listingImages, setListingImages] = useState([])

    
    //Handlers for regular listings
    function handleTitleChange(e){
        setListingTitle(e.target.value)
    }
    function handlePriceChange(e){
        setListingPrice(e.target.value)
    }
    function handleCategoryChange(e){
        setListingCategory(e.target.value)
        const filterCategory = categoriesList.find(
            category => category._id === e.target.value    
        )
        setSubCategoriesList(filterCategory.subCategories)
        setListingSubCategory("");

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
    ///////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////
    // States and event handlers for vehicle listings
    ///////////////////////////////////////////////////////////////////////////

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

  
    //Handlers for vehicle listings
    function handleListingVehicleTypeChange(e){
        setListingVehicleType(e.target.value)
        setListingSubCategory("")
        setListingPropertyType("")
    }

    function handleListingVehicleMakeChange(e){
        setListingVehicleMake(e.target.value)
    }

    function handleListingVehicleModelChange(e){
        setListingVehicleModel(e.target.value)
    }

    function handleListingVehicleYearChange(e){
        setListingVehicleYear(e.target.value)
    }

    function handleListingVehicleTransmissionChange(e){
        setListingVehicleTransmission(e.target.value)
    }

    function handleListingVehicleColorChange(e){
        setListingVehicleColor(e.target.value)
    }

    function handleListingVehicleMilesDrivenChange(e){
        setListingVehicleMilesDriven(e.target.value)
    }

    function handleListingVehicleMpgMinChange(e){
        setListingVehicleMpgMin(e.target.value)
    }

    function handleListingVehicleMpgMaxChange(e){
        setListingVehicleMpgMax(e.target.value)
    }
    ///////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////
    // States and event handlers for property listings
    ///////////////////////////////////////////////////////////////////////////
    
    // Property Listing States
    const [listingPropertyListingType, setListingPropertyListingType] = useState("Property Rentals");
    const [listingPropertyType, setListingPropertyType] = useState("");
    const [listingPropertyStreetAddress, setListingPropertyStreetAddress] = useState("");
    const [listingPropertyCity, setListingPropertyCity] = useState("");
    const [listingPropertyState, setListingPropertyState] = useState("");
    const [listingPropertyZipcode, setListingPropertyZipcode] = useState("");
    const [listingPropertyYearBuilt, setListingPropertyYearBuilt] = useState("");
    const [listingPropertyHasBasement, setListingPropertyHasBasement] = useState(false);
    const [listingPropertyHasGarage, setListingPropertyHasGarage] = useState(false);
    const [listingPropertyNumBedrooms, setListingPropertyNumBedrooms] = useState("");
    const [listingPropertyNumBathrooms, setListingPropertyNumBathrooms] = useState("");

    function handleListingPropertyTypeChange(e){
        setListingPropertyType(e.target.value)
        setListingSubCategory("")
        setListingVehicleType("")
    }

    function handleListingPropertyListingTypeChange(e){
        setListingPropertyListingType(e.target.value)
    }

    function handleListingPropertyStreetAddressChange(e){
        setListingPropertyStreetAddress(e.target.value)
    }

    function handleListingPropertyCityChange(e){
        setListingPropertyCity(e.target.value)
    }

    function handleListingPropertyStateChange(e){
        setListingPropertyState(e.target.value)
    }

    function handleListingPropertyZipcodeChange(e){
        setListingPropertyZipcode(e.target.value)
    }

    function handleListingPropertyYearBuiltChange(e){
        setListingPropertyYearBuilt(e.target.value)
    }

    function handleListingPropertyHasBasementChange(e){
        setListingPropertyHasBasement((prevState)=> !prevState)
    }

    function handleListingPropertyHasGarageChange(e){
        setListingPropertyHasGarage((prevState)=> !prevState)
    }

    function handleListingPropertyNumBedroomsChange(e){
        setListingPropertyNumBedrooms(e.target.value)
    }

    function handleListingPropertyNumBathroomsChange(e){
        setListingPropertyNumBathrooms(e.target.value)
    }
    ///////////////////////////////////////////////////////////////////////////



    ///////////////////////////////////////////////////////////////////////////
    // Functions change category and subcategory options
    ///////////////////////////////////////////////////////////////////////////

    function showFixedCategory(props){
        let fixedDisplay = "";

        if(listingType === "vehicle"){
            fixedDisplay = "Vehicles"
        }
        else if(listingType === "property" && listingCategory === "64359668692fe93ea16cd998"){
            fixedDisplay = "Property Rentals"
        }
        else if(listingType === "property" && listingCategory === "6435910e3cd66d46af3fdf46"){
            fixedDisplay = "Home Sales"
        }


        return(
            <div id ="fixedCategory" >
                <p>{fixedDisplay}</p>
            </div>
        )
    }

    function showCategories () {
        return(
            <Form.Select 
            class="form-control" 
            id ="categorySelector" 
            aria-label="category"
            onChange = {handleCategoryChange}
            >
                <option value = "">Category</option>
                {newCategoriesList.map(category=>(

                <option value={category._id}>{category.name}</option>
                
                ))} 
            </Form.Select>
        )
    }
    function showVehicleTypeOptions(){
        return(
            <Form.Select 
            class="form-control" 
            id ="subCategorySelector" 
            aria-label="subCategory"
            onChange={handleListingVehicleTypeChange}
            >
                <option value = "">Vehicle Type</option>
                {vehicleCategory.vehicleType.map(vType=>(
                    <option value={vType}>{vType}</option>))} 
            </Form.Select>
        )
    }
    // dislpays property type options
    function showPropertyRentalTypeOptions(){
        return(
                <Form.Select 
                class="form-control" 
                id ="subCategorySelector" 
                aria-label="subCategory"
                onChange={handleListingPropertyTypeChange}
 
                >
                    <option value = "">Property Type</option>
                    {propertyRentalCategory.propertyType.map(pType=>(
                        <option value={pType}>{pType}</option>))} 

                </Form.Select>
        )
    }

    // dislpays property type options
    function showHomeSalesTypeOptions(){
        return(
            <Form.Select 
            class="form-control" 
            id ="subCategorySelector" 
            aria-label="subCategory"
            onChange={handleListingPropertyTypeChange}
            >
                <option value = "">Property Type</option>
                {homeSalesCategory.propertyType.map(pType=>(
                    <option value={pType}>{pType}</option>))} 
            </Form.Select>
        )
    }

    function handleTypeChange(e){
        setListingType(e.target.value)
        if(e.target.value === "vehicle"){
            setListingCategory(vehicleCategory._id)
            setListingPropertyType("")
            setListingSubCategory("")
        }
        if(e.target.value === "property"){
            setListingCategory(propertyRentalCategory._id)
            setListingPropertyListingType("Property Rentals")
            setListingVehicleType("")
            setListingSubCategory("")


        }
        if(e.target.value === "regular"){
            setListingCategory("")
            setListingPropertyListingType("Property Rentals")
            setListingVehicleType("")
            setListingPropertyType("")


        }
        
                
        console.log(listingType)
    }
    ///////////////////////////////////////////////////////////////////////////



    ///////////////////////////////////////////////////////////////////////////
    // Functions to display vehicle and property forms
    ///////////////////////////////////////////////////////////////////////////
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
                        onChange={handleListingVehicleMakeChange}
                    />
                    <input 
                        id="createVehicleModel"
                        class="form-control"
                        type = "text" 
                        name = "createVehicleModel"
                        placeholder = "Model"
                        autocomplete = "off"
                        onChange={handleListingVehicleModelChange}
                    />
                    <input 
                        id="createVehicleYear"
                        class="form-control"
                        type = "text" 
                        name = "createVehicleYear"
                        placeholder = "Year"
                        autocomplete = "off"
                        onChange={handleListingVehicleYearChange}
                    />
                </div>
                <div id="createVehicleFactsL2">
                    <Form.Select class="form-control" 
                    id ="createVehicleTransmisson" 
                    aria-label="condition"
                    onChange={handleListingVehicleTransmissionChange}
                    >
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
                        onChange={handleListingVehicleColorChange}
                    />   
                    <input 
                        id="createVehicleMilesDriven"
                        class="form-control"
                        type = "text" 
                        name = "createVehicleMilesDriven"
                        placeholder = "# of Miles Driven"
                        autocomplete = "off"
                        onChange={handleListingVehicleMilesDrivenChange}
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
                        onChange={handleListingVehicleMpgMinChange}
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
                        onChange={handleListingVehicleMpgMaxChange}
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
                        onChange={handleListingPropertyStreetAddressChange}
                    />   
                    <input 
                        id="createCity"
                        class="form-control"
                        type = "text" 
                        name = "createCity"
                        placeholder = "City"
                        autocomplete = "off"
                        onChange={handleListingPropertyCityChange}
                    /> 
                    <input 
                        id="createState"
                        class="form-control"
                        type = "text" 
                        name = "createState"
                        placeholder = "State"
                        autocomplete = "off"
                        onChange={handleListingPropertyStateChange}
                    />
                    <input 
                        id="createZipCode"
                        class="form-control"
                        type = "text" 
                        name = "createZipCode"
                        placeholder = "Zipcode"
                        autocomplete = "off"
                        onChange={handleListingPropertyZipcodeChange}
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
                        maxlength="4"
                        onChange={handleListingPropertyYearBuiltChange}
                    />
                    <div id="createBedroomLabel">
                        <p>Basement: </p>
                    </div>
                    <input 
                        id="createBasement"
                        type = "checkbox" 
                        name = "createBasement"
                        value = {true}
                        checked = {listingPropertyHasBasement}
                        onChange={handleListingPropertyHasBasementChange}
                        /> 
                    <div id="createBathroomLabel">
                        <p>Garage: </p>
                    </div>
                    <input 
                        id="createGarage"
                        type = "checkbox" 
                        name = "createGarage"
                        value = {true}
                        checked = {listingPropertyHasGarage}
                        onChange={handleListingPropertyHasGarageChange}
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
                        maxlength = "2"
                        autocomplete = "off"
                        onChange={handleListingPropertyNumBedroomsChange}
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
                        onChange={handleListingPropertyNumBathroomsChange}
                    /> 
                </div>
            </div>
        )
    }
    //Shows property radio buttons
    function handleChangePropertyRental(e){
        setListingCategory(propertyRentalCategory._id)
        setListingPropertyListingType(e.target.value)
        setListingPropertyType("")
    }

    function handleChangeHomeSales(e){
        setListingCategory(homeSalesCategory._id)
        setListingPropertyListingType(e.target.value)
        setListingPropertyType("")
    }


        
    function showPropertyRadios(){
        return(

            <div id="propertyRadio">
            <div className='createRadio'>
                <label>For Rent</label>
                {" "}
                <input 
                    type="radio"
                    name ="propertyListingType"
                    value ="Property Rentals"
                    onChange={handleChangePropertyRental}
                    checked = {listingPropertyListingType === "Property Rentals"}
                />
            </div>
            <div className='createRadio'>
                <label>For Sale</label>
                {" "}
                <input 
                    type="radio"
                    name ="propertyListingType"
                    value ="Home Sales"
                    onChange={handleChangeHomeSales}
                    checked = {listingPropertyListingType === "Home Sales"}

                />                                    
            </div> 
            </div>
        )
    }

    // displays subcategories
    function showSubCategoryOptions(){
        return(
            <Form.Select 
            class="form-control" 
            id ="subCategorySelector" 
            aria-label="subCategory"
            onChange={handleSubCategoryChange}
            >
                <option value = "">Subcategory</option>
                {
                subCategoriesList.length > 0 &&
                subCategoriesList.map(subCategory=>(
                    <option value={subCategory}>{subCategory}</option>))} 
                

            </Form.Select> 
        )
    }
    ///////////////////////////////////////////////////////////////////////////



    ///////////////////////////////////////////////////////////////////////////
    // Image upload
    ///////////////////////////////////////////////////////////////////////////
    //Uploading images to firebase
    const [imageUpload, setImageUpload] = useState(null)
    const imageListRef = ref(storage, "listingPhotos/")
    const uploadImage = () => {
        //remove upload button, upload images with publish button. 
        // hold the images in the state, then publish them
        if(imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4() }`)
        uploadBytes(imageRef, imageUpload).then((snapshot) =>{
            getDownloadURL(snapshot.ref).then((url) => {
                setListingImages([url]);
                return url

            }).then((url)=>{
                postListing(url)
                // navigate('/')
            })
            alert("Image Uploaded")
        })

    }
    // useEffect( () => {
    //     listAll(imageListRef).then((response) => {
    //         response.items.forEach((item) => {
    //             getDownloadURL(item).then((url) => {
    //                 setListingImages((prev) => [...prev, url]);

    //             })
    //         })
    //         console.log(response);
    //     })
    // },[])
    ///////////////////////////////////////////////////////////////////////////



    ///////////////////////////////////////////////////////////////////////////
    // Post Listing
    ///////////////////////////////////////////////////////////////////////////
    const postListing = (url) =>{
        setShouldRefresh(true)
        console.log(urlEndPoint)
        const req =  {
            listingUserId: listingUserId,
            title: listingTitle,
            listingImages: url,
            listingType: listingType,
            price: listingPrice,
            category: listingCategory,
            subCategory: listingSubCategory,
            condition: listingCondition,
            email: listingContactEmail,
            phoneNumber: listingContactPhoneNumber,
            description: listingDescription,
        }
        if(listingType === "vehicle"){
            req.vehicleType = listingVehicleType
            req.make = listingVehicleMake
            req.model= listingVehicleModel
            req.year = listingVehicleYear
            req.color = listingVehicleColor
            req.milesDriven = listingVehicleMilesDriven
            req.transmission = listingVehicleTransmission
            req.minMpg = listingVehicleMpgMin
            req.maxMpg = listingVehicleMpgMax
        }
        if(listingType === "property"){
            req.listingPropertyType =listingPropertyListingType
            req.propertyType = listingPropertyType
            req.streetAddress = listingPropertyStreetAddress
            req.city = listingPropertyCity
            req.state = listingPropertyState
            req.zipcode = listingPropertyZipcode
            req.yearBuilt = listingPropertyYearBuilt
            req.hasBasement = listingPropertyHasBasement
            req.hasGarage = listingPropertyHasGarage
            req.numberOfBedrooms = listingPropertyNumBedrooms 
            req.numberOfBathrooms = listingPropertyNumBathrooms

        }
        console.log(req)
        axios.post(`${urlEndPoint}/listings/create-listing`, req)
        .then(function (response) {
            navigate('/')
            setShouldRefresh(false);
    
        },{
          'Content-Type': 'application/x-www-form-urlencoded'
        })
        .catch(function (error) {
          console.log(error);
        }); 
    }
    ///////////////////////////////////////////////////////////////////////////



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
                        maxLength="75"
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

                            {listingType === "regular"&& showCategories()}
                            {listingType !== "regular"&& showFixedCategory()}

                            {/* Dispays options for subcategories */}
                            {/* {listingType === "property"&& showPropertyRentalTypeOptions()} */}
                            {listingCategory === "6435910e3cd66d46af3fdf46"&& showHomeSalesTypeOptions()}
                            {listingCategory === "64359668692fe93ea16cd998"&& showPropertyRentalTypeOptions()}

                            {listingType === "vehicle"&& showVehicleTypeOptions()}
                            {listingType === "regular"&& showSubCategoryOptions()}

                        </div>
                        <div id="conditionContact">
                        <Form.Select 
                        class="form-control" 
                        id ="conditionSelector" 
                        aria-label="condition"
                        onChange = {handleConditionChange}
                        >
                                <option value = "">Condition</option>
                                <option value="New">New</option>
                                <option value="Used - Like New">Used - Like New</option>
                                <option value="Used - Good">Used - Good</option>
                                <option value="Used - Fair">Used - Fair</option>

                        </Form.Select>                            
                            <input 
                                id="contactEmail"
                                class="form-control"
                                type = "email" 
                                name = "contactEmail"
                                placeholder = "Contact Email"
                                autocomplete = "off"
                                onChange={handleEmailChange}
                            />
                            <input 
                                id="contactPhone"
                                class="form-control"
                                type = "text" 
                                name = "contactPhone"
                                placeholder = "Contact Phone Number"
                                autocomplete = "off"
                                onChange={handlePhoneNumberChange}
                            />
                        </div>
                    </div>


                    <textarea 
                    class="form-control" 
                    id="cld-description" 
                    name="" 
                    placeholder="Description"
                    maxlength="620"
                    onChange={handleDescriptionChange}
                    >
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
                    <div id="createImageUploadArea">
                        <input 
                        type="file"
                        onChange={(event)=>{setImageUpload(event.target.files[0])}}
                        />


                    </div>
                </div>
                <Button 
                id="createSubmitButton" 
                variant="success"
                onClick={()=>{
                    uploadImage()
                    }} >
                    Publish
                </Button>
            </div>

        </div>
       
    )
}



export default CreateListingForm;