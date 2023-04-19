import '../index.css'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function CreateListingForm(props){

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
                    <div id="createHeaderContainer">
                        <div id = "cld-title">
                            <h1>New Listing</h1>
                        </div>
                        <div id="listingType">
                            <div id="lt-title">Listing Type:</div>
                            <div id = "listingRadio">
                                <div className='createRadio'>
                                    <label>Regular</label>
                                    {" "}
                                    <input 
                                        type="radio"
                                        name ="listingType"
                                        value ="regular"
                                    />
                                </div>
                                <div className='createRadio'>
                                    <label>Vehicle</label>
                                    {" "}
                                    <input 
                                        type="radio"
                                        name ="listingType"
                                        value ="vehicle"
                                    />
                                </div>
                                <div className='createRadio'>
                                    <label>Property</label>
                                    {" "}
                                    <input 
                                        type="radio"
                                        name ="listingType"
                                        value ="property"
                                    />                                    
                                </div>

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
                    /> 
                    <div>
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
                        <div id="contactSubCategory">
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



export default CreateListingForm;