import '../index.css'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
function CreateListingPage (props){



    const [listingTitle,setListingTitle] = useState("")
    const [listingPrice,setListingPrice] = useState(0)
    const [listingCategory,setListingCategory] = useState("")
    const [listingSubCategory,setSubListingCategory] = useState("")

    const [lsitingCondition,setListingCondition] = useState("")
    const [listingDescription,setListingDescription] = useState("")

    const {categoriesList} = props;
    console.log(categoriesList)

    return(
        <div id="createListingDiv">
            {/* createContainerOne */}
            <div id="createContainerOne">
                <div id = "createTextArea">
                    <div id = "cld-title">
                        <h1>New Listing</h1>
                    </div>

                    <input 
                        id="newListingTitle"
                        class="form-control"

                        type = "text" 
                        name = "title"
                        placeholder = "Title"
                        autocomplete = "off"
                    /> 
                    <div id="priceCategoryCondition">
                        <input 
                            id="newListingPrice"
                            class="form-control"

                            type = "text" 
                            name = "title"
                            placeholder = "Price"
                            autocomplete = "off"
                        /> 

                        <Form.Select id ="categorySelector" aria-label="category">
                            <option value = "">Category</option>
                            {categoriesList.map(category=>(
                            <option value={`${category.id}`}>{category.name}</option>))} 
                        </Form.Select>

                        <Form.Select id ="conditionSelector" aria-label="condition">
                            <option value = "">Condition</option>
                            <option value="New">New</option>
                            <option value="Used - Like New">Used - Like New</option>
                            <option value="Used - Good">Used - Good</option>
                            <option value="Used - Fair">Used - Fair</option>

                        </Form.Select>
                    </div>
                    <textarea id="cld-description" name="" placeholder="Description">
                    </textarea>
                </div>
                <div className="createListingDetails">

                </div>
            </div>


            {/* createContainerTwo */}
            <div id="createContainerTwo">
                <div id="createImageUpload">
                    <div id="uploadPhotoTitle">
                        <p>Photos</p>
                    </div>
                </div>
                <Button id="createSubmitButton" variant="success" >
                    Publish
                </Button>
            </div>

        </div>
       
    )
}

export default CreateListingPage;

// const listingSchema = new mongoose.Schema({
//     listingId: {type: String, default: uuidv4},
//     createdBy:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User"
//     },
//     title: String,
//     photos:[],
//     description: String,
//     condition: ["new", "like new", "good", "fair"],
//     price: Number,
//     category: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Category"
//     },
//     subCategories:[String],
//     email: String,
//     phoneNumber: String,
//     dateCreated: { type: Date, default: Date.now },
//     dateModified: Date,

//     //For Vehicles
//     vehicleType: ["automobile","boat", "plane"],
//     make: String,
//     model: String,
//     year: Date,

//     //For Properties
//     propertyType: ["Apartment", "Condo", "House", "Modular Home", "Townhome"],
//     yearBuilt: Date,
//     numberOfBedrooms: Number,
//     numberOfBathrooms: Number,
//     hasBasment: Boolean,
//     hasGarage: Boolean

// });



