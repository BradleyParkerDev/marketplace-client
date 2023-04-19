import '../index.css'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CreateListingForm from '../Components/CreateListingForm';
function CreateListingPage (props){
    return(
        <CreateListingForm 
            categoriesList = {props.categoriesList}
            setShouldRefresh = {props.setShouldRefresh}
        />)
}

export default CreateListingPage;


