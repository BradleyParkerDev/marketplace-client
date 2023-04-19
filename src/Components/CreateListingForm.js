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
    const {setShouldRefresh} = props;
    console.log(categoriesList)

    function showSubCategoryOptions(){
        return(
            <div>

            </div>
        )
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
                                    />                                    
                                </div>
                            </div>
                            <div>
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
                        <div id="priceCategorySubcategory">
                            <input 
                                id="newListingPrice"
                                class="form-control"

                                type = "text" 
                                name = "title"
                                placeholder = "Price"
                                autocomplete = "off"
                            /> 

                            <Form.Select class="form-control" id ="categorySelector" aria-label="category">
                                <option value = "">Category</option>
                                {categoriesList.map(category=>(
                                <option value={`${category.id}`}>{category.name}</option>))} 
                            </Form.Select>

                            <Form.Select class="form-control" id ="subCategorySelector" aria-label="subCategory">
                                <option value = "">Subcategory</option>
    

                            </Form.Select>
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
                        <input 
                            id="createVehicleTransmisson"
                            class="form-control"
                            type = "text" 
                            name = "createVehicleTransmisson"
                            placeholder = "Transmission Type"
                            autocomplete = "off"
                        /> 
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