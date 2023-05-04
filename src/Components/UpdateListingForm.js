import '../index.css'
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { storage }from "../firebase"
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';
import { useParams } from 'react-router-dom';

import { useAuth } from "../Hooks/Auth";
const UserContext = createContext()

function UpdateListingForm(props){
    const params = useParams();
    const auth = useAuth(); //access the authentication context 
    const navigate = useNavigate();
    const { urlEndPoint ,
        categoriesList,    
        setShouldRefresh,
        
    } = props;
    ///////////////////////////////////////////////////////////////////////////
    // States and event handlers for regular listings
    ///////////////////////////////////////////////////////////////////////////
    const [displayImage, setDisplayImage] = useState("");
    // Regular Listing States
    const [listingTitle,setListingTitle] = useState('')
    const [listingType,setListingType] = useState('regular')
    const [listingPrice,setListingPrice] = useState('')
    const [listingCategory,setListingCategory] = useState('')
    const [listingSubCategory,setListingSubCategory] = useState('')
    const [listingCondition,setListingCondition] = useState('')
    const [listingContactEmail, setListingContactEmail] = useState('')
    const [listingContactPhoneNumber, setListingContactPhoneNumber] = useState('');
    const [listingDescription,setListingDescription] = useState('')
    //Holds listng Images
    const [listingImage, setListingImage] = useState("")
    // const {listings} = props


    console.log(urlEndPoint)

    //User id
    const [listingUserId, setListingUserId] = useState(auth.userId);

    //category
    const [newCategoriesList, setNewCategoriesList] = useState(categoriesList)
    const [subCategoriesList, setSubCategoriesList] = useState([]);

    //Options for selecting listing category
    useEffect(()=> {
        const filterResult = categoriesList.filter((category)=>{
            return category.name !== "Vehicles" && category.name !== "Property Rentals" && category.name !== "Home Sales"
        })
        setNewCategoriesList(filterResult)
        //This sets the initial state of the subCategoriesList

        console.log(params)
        axios.get(`${urlEndPoint}/listings/get-listing/${params.listingId}`)
        .then(function (response){
            console.log(response);
            setShouldRefresh(true)
            setListingImage(response.data.listing.listingImage)
            setListingType(response.data.listing.listingType)
            setListingTitle(response.data.listing.title)
            setListingPrice(response.data.listing.price)
            setListingCategory(response.data.listing.category)
            setListingSubCategory(response.data.listing.subCategory)
            setListingCondition(response.data.listing.condition)
            setListingContactEmail(response.data.listing.email)
            setListingContactPhoneNumber(response.data.listing.phoneNumber)
            setListingDescription(response.data.listing.description)

            const initialSubCategory = categoriesList.find(
                category => category._id === response.data.listing.category   
            )
            setSubCategoriesList(initialSubCategory.subCategories);
        })
        .catch(function (error){
            console.log(error);
        })
        .finally(function (){
          //always executed
        })

    },[categoriesList])





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
    // Update Listing
    ///////////////////////////////////////////////////////////////////////////
    // Uploading images to firebase
    const [imageUpload, setImageUpload] = useState(null)
    const imageListRef = ref(storage, "images/")
    const updateListing = () => {

        if(imageUpload == null){
            updateInfo();
            return;    
        } 
        const imageRef = ref(storage, `images/${imageUpload.name + v4() }`)
        uploadBytes(imageRef, imageUpload).then((snapshot) =>{
            getDownloadURL(snapshot.ref).then((url) => {
                setListingImage([url]);
                return url

            }).then((url)=>{
                updateInfo(url)
                // navigate('/')
            })
            alert("Image Uploaded")
        })

    }
    // Update Info
    const updateInfo = (url) =>{
        setShouldRefresh(true)
        console.log(urlEndPoint)
        const req =  {
            title: listingTitle,
            listingImage: url,
            listingType: listingType,
            price: listingPrice,
            category: listingCategory,
            subCategory: listingSubCategory,
            condition: listingCondition,
            email: listingContactEmail,
            phoneNumber: listingContactPhoneNumber,
            description: listingDescription,
        }
        
        console.log(req)
        axios.put(`${urlEndPoint}/listings/update-listing/${params.listingId}`, req)
        .then(function (response) {
            // navigate('/')
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
                                <p>Regular</p>

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
                                    setImageUpload(event.target.files[0])
                                
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
                                    name = "price"
                                    value = {listingPrice}
                                    placeholder = "Price"
                                    autocomplete = "off"
                                    onChange = {handlePriceChange}

                                /> 

                                <Form.Select 
                                class="form-control" 
                                id ="conditionSelector" 
                                value = {listingCondition}
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
                                <Form.Select 
                                    class="form-control" 
                                    id ="categorySelector" 
                                    aria-label="category"
                                    value = {listingCategory}
                                    onChange = {handleCategoryChange}
                                    >
                                        <option value = "">Category</option>
                                        {newCategoriesList.map(category=>(

                                        <option value={category._id}>{category.name}</option>
                                        
                                        ))} 
                                </Form.Select>
                                {/* Shows Subcategory */}
                                <Form.Select 
                                    class="form-control" 
                                    id ="subCategorySelector" 
                                    aria-label="subCategory"
                                    value = {listingSubCategory}
                                    onChange={handleSubCategoryChange}
                                    >
                                        <option value = "">Subcategory</option>
                                        {
                                        subCategoriesList.length > 0 &&
                                        subCategoriesList.map(subCategory=>(
                                            <option value={subCategory}>{subCategory}</option>))} 
                                        

                                </Form.Select> 

                            </div>
                            <div id="contactEmailPhone">

                                <input 
                                    id="contactEmail"
                                    class="form-control"
                                    type = "email" 
                                    value = {listingContactEmail}
                                    name = "contactEmail"
                                    placeholder = "Contact Email"
                                    autocomplete = "off"
                                    onChange={handleEmailChange}
                                />
                                <input 
                                    id="contactPhone"
                                    class="form-control"
                                    type = "text" 
                                    value = {listingContactPhoneNumber}
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
                    value = {listingDescription} 
                    placeholder="Description"
                    maxlength="620"
                    onChange={handleDescriptionChange}
                    >
                    </textarea>
                </div>

                <Button 
                id="createSubmitButton" 
                variant="success"
                onClick={()=>{
                    updateListing()
                    }} >
                    Update
                </Button>
            </div>

        </div>
       
    )
}



export default UpdateListingForm;