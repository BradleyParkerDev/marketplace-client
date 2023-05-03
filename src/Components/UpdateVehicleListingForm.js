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

function UpdateVehicleListingForm(props){
    const auth = useAuth(); //access the authentication context 
    const navigate = useNavigate();
    const { urlEndPoint } = props;
    console.log(urlEndPoint)
    const {categoriesList} = props;
    const {setShouldRefresh} = props;
    // const { setShouldRefresh } = props;

    const [listingType, setListingType] = useState("vehicle")
    //User id
    const [listingUserId, setListingUserId] = useState(auth.userId);
    // console.log(listingUserId)
    //category
    const [newCategoriesList, setNewCategoriesList] = useState(categoriesList)

    //Vehicle and property objects
    const vehicleCategory = categoriesList[17]


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
    const [displayImage, setDisplayImage] = useState("");
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
        // setListingPropertyType("")
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
                setListingImages([url]);
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
            condition: listingCondition,
            email: listingContactEmail,
            phoneNumber: listingContactPhoneNumber,
            description: listingDescription,

            //for vehicle
            vehicleType:listingVehicleType,
            make:listingVehicleMake,
            model: listingVehicleModel,
            year:listingVehicleYear,
            color:listingVehicleColor,
            milesDriven:listingVehicleMilesDriven,
            transmission:listingVehicleTransmission,
            minMpg:listingVehicleMpgMin,
            maxMpg:listingVehicleMpgMax
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
                                <p>Vehicle</p>

                            </div>
                        </div>

                    </div>
                    <div id="newCreateDiv">
                        <div id="newCreateImage">
                            <div id="createImageHolder">
                                <img
                                    // src={displayImage}
                                
                                />
                            </div>
                            <div id="createFileInput">
                                <input 
                                type="file"
                                onChange={(event)=>{
                                    // onImageChange()
                                    // setImageUpload(event.target.files)
                                
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
                                    placeholder = "Price"
                                    autocomplete = "off"
                                    onChange = {handlePriceChange}

                                /> 


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

                            </div>
                            <div id="categorySubcategory">
                                {/* Shows Category */}
                                <div id ="fixedCategory" >
                                    <p>Vehicles</p>
                                </div>
                                {/* Shows Subcategory */}
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

                            </div>
                            <div id="contactEmailPhone">

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
                {/* Vehicle Form */}
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



export default UpdateVehicleListingForm;