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

function UpdatePropertyListingForm(props){
    const auth = useAuth(); //access the authentication context 
    const navigate = useNavigate();

    const { urlEndPoint ,
        categoriesList,    
        setShouldRefresh,
        // Regular Listing props
        myListing,
        displayImage, 
        setDisplayImage,
        listingImage,
        setListingImage,   
        listingTitle, 
        setListingTitle, 
        listingPrice, 
        setListingPrice,
        listingCategory,
        setListingCategory,
        listingSubCategory,
        setListingSubCategory,
        listingCondition,
        setListingCondition,
        listingContactEmail, 
        setListingContactEmail,
        listingContactPhoneNumber,
        setListingContactPhoneNumber,
        listingDescription,
        setListingDescription,

        // Property Listing props
        listingPropertyListingType,
        setListingPropertyListingType,
        listingPropertyType,
        setListingPropertyType,
        listingPropertyStreetAddress,
        setListingPropertyStreetAddress,
        listingPropertyCity,
        setListingPropertyCity,
        listingPropertyState,
        setListingPropertyState,
        listingPropertyZipcode,
        setListingPropertyZipcode,
        listingPropertyYearBuilt,
        setListingPropertyYearBuilt,
        listingPropertyHasBasement,
        setListingPropertyHasBasement,
        listingPropertyHasGarage,
        setListingPropertyHasGarage,
        listingPropertyNumBedrooms,
        setListingPropertyNumBedrooms,
        listingPropertyNumBathrooms,
        setListingPropertyNumBathrooms
    } = props;

    // const { setShouldRefresh } = props;

    const [listingType, setListingType] = useState("regular")
    //User id
    const [listingUserId, setListingUserId] = useState(auth.userId);
    // console.log(listingUserId)
    //category
    const [newCategoriesList, setNewCategoriesList] = useState(categoriesList)
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



    function handleListingPropertyTypeChange(e){
        setListingPropertyType(e.target.value)
        setListingSubCategory("")
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


    // dislpays property type options
    function showPropertyRentalTypeOptions(){
        return(
                <Form.Select 
                class="form-control" 
                id ="subCategorySelector" 
                aria-label="subCategory"
                value = {listingPropertyType}

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
            value = {listingPropertyType}
            aria-label="subCategory"
            onChange={handleListingPropertyTypeChange}
            >
                <option value = "">Property Type</option>
                {homeSalesCategory.propertyType.map(pType=>(
                    <option value={pType}>{pType}</option>))} 
            </Form.Select>
        )
    }

    ///////////////////////////////////////////////////////////////////////////
    // Image upload
    ///////////////////////////////////////////////////////////////////////////
    // Uploading images to firebase
    const [imageUpload, setImageUpload] = useState(null)
    const imageListRef = ref(storage, "listingPhotos/")
    const uploadImage = () => {
        //remove upload button, upload images with publish button. 
        // hold the images in the state, then publish them
        if(imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4() }`)
        uploadBytes(imageRef, imageUpload).then((snapshot) =>{
            getDownloadURL(snapshot.ref).then((url) => {
                setListingImage([url]);
                return url

            }).then((url)=>{
                updateListing(url)
                // navigate('/')
            })
            alert("Image Uploaded")
        })

    }


    const onImageChange = (e) => {
        const [file] = e.target.files;
        setDisplayImage(URL.createObjectURL(file));
    };

    ///////////////////////////////////////////////////////////////////////////



    ///////////////////////////////////////////////////////////////////////////
    // Update Listing
    ///////////////////////////////////////////////////////////////////////////
    const updateListing = (url) =>{
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
            //for property
            listingPropertyType:listingPropertyListingType,
            propertyType: listingPropertyType,
            streetAddress: listingPropertyStreetAddress,
            city: listingPropertyCity,
            state: listingPropertyState,
            zipcode: listingPropertyZipcode,
            yearBuilt: listingPropertyYearBuilt,
            hasBasement: listingPropertyHasBasement,
            hasGarage: listingPropertyHasGarage,
            numberOfBedrooms: listingPropertyNumBedrooms, 
            numberOfBathrooms: listingPropertyNumBathrooms
        }
        
        console.log(req)
        axios.post(`${urlEndPoint}/listings/update-listing`, req)
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
                            <h1>Update Listing</h1>
                        </div>
                        <div id="listingType">
                            <div id="lt-title">Listing Type:</div>
                            <div id="fixedType">
                                <p>Property</p>

                            </div>



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
                        </div>
                    </div>
                    <div id="newCreateDiv">
                        <div id="newCreateImage">
                            <div id="createImageHolder">
                                <img
                                    id = "create-image"
                                    src={listingImage}
                                />
                            </div>
                            <div id="createFileInput">
                                <input 
                                type="file"
                                onChange={(event)=>{
                                    setImageUpload(event.target.files)
                                
                                }}
                                />                                
                            </div>

                        </div>
                        <div id="newCreateListingInfo">
                            <input 
                                id="newListingTitle"
                                class="form-control"

                                type = "text" 
                                name = "title"
                                value = {listingTitle}
                                placeholder = "Title"
                                autocomplete = "off"
                                maxLength="75"
                                onChange = {handleTitleChange}
                            /> 
                            <div id = "priceCondition">
                                <input 
                                    id="newListingPrice"
                                    class="form-control"
                                    type = "text" 
                                    name = "title"
                                    value = {listingPrice}
                                    placeholder = "Price"
                                    autocomplete = "off"
                                    onChange = {handlePriceChange}

                                /> 


                                <Form.Select 
                                class="form-control" 
                                id ="conditionSelector" 
                                aria-label="condition"
                                value = {listingCondition}
                                onChange = {handleConditionChange}
                                >
                                    <option value = "">Condition</option>
                                    <option value="New">New</option>
                                    <option value="Used - Like New">Used - Like New</option>
                                    <option value="Used - Good">Used - Good</option>
                                    <option value="Used - Fair">Used - Fair</option>

                                </Form.Select>  

                            </div>
                            <div id="categorySubcategory">
                                {/* Shows Category */}
                                <div id ="fixedCategory" >
                                    <p>{listingPropertyListingType}</p>
                                </div>
                                {/* Shows Subcategory */}
                                {listingCategory === "6435910e3cd66d46af3fdf46"&& showHomeSalesTypeOptions()}
                                {listingCategory === "64359668692fe93ea16cd998"&& showPropertyRentalTypeOptions()}

                            </div>
                            <div id="contactEmailPhone">

                                <input 
                                    id="contactEmail"
                                    class="form-control"
                                    type = "email" 
                                    name = "contactEmail"
                                    value = {listingContactEmail}
                                    placeholder = "Contact Email"
                                    autocomplete = "off"
                                    onChange={handleEmailChange}
                                />
                                <input 
                                    id="contactPhone"
                                    class="form-control"
                                    type = "text" 
                                    name = "contactPhone"
                                    value = {listingContactPhoneNumber}
                                    placeholder = "Contact Phone Number"
                                    autocomplete = "off"
                                    onChange={handlePhoneNumberChange}
                                />
                            </div>

                        </div>
                    </div>
                    <textarea 
                    class="form-control" 
                    id="cld-description" 
                    name="description"
                    value = {listingDescription} 
                    placeholder="Description"
                    maxlength="620"
                    onChange={handleDescriptionChange}
                    >
                    </textarea>
                </div>
                {/* Property Form */}
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
                            value = {listingPropertyStreetAddress}
                            placeholder = "Street Address"
                            autocomplete = "off"
                            onChange={handleListingPropertyStreetAddressChange}
                        />   
                        <input 
                            id="createCity"
                            class="form-control"
                            type = "text" 
                            name = "createCity"
                            value = {listingPropertyCity}
                            placeholder = "City"
                            autocomplete = "off"
                            onChange={handleListingPropertyCityChange}
                        /> 
                        <input 
                            id="createState"
                            class="form-control"
                            type = "text" 
                            name = "createState"
                            value = {listingPropertyState}
                            placeholder = "State"
                            autocomplete = "off"
                            onChange={handleListingPropertyStateChange}
                        />
                        <input 
                            id="createZipCode"
                            class="form-control"
                            type = "text" 
                            name = "createZipCode"
                            value = {listingPropertyZipcode}
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
                            value = {listingPropertyYearBuilt}
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
                            value = {listingPropertyNumBedrooms}
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
                            value = {listingPropertyNumBathrooms}
                            placeholder = ""
                            autocomplete = "off"
                            onChange={handleListingPropertyNumBathroomsChange}
                        /> 
                    </div>
                </div>
                <Button 
                id="createSubmitButton" 
                variant="success"
                onClick={()=>{
                    // uploadImage()
                    }} >
                    Update
                </Button>
            </div>

        </div>
       
    )
}



export default UpdatePropertyListingForm;