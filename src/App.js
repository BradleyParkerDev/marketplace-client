import HomePage from './Pages/HomePage';
import ListingPage from './Pages/ListingPage';
import CreateListingPage from './Pages/CreateListingPage';
import Layout from './Layouts/Layout';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const urlEndPoint = process.env.REACT_APP_URL_ENDPOINT;


function App(props) {
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [listings, setListings] = useState([]);

  //Get all categories
  useEffect(()=> {
    axios.get(`${urlEndPoint}/categories/get-all-categories`)
    .then(function (response){
      console.log(response.data.categories);
      setCategoriesList(response.data.categories);
      
    })
    .catch(function (error){
      console.log(error);
    })
    .finally(function (){
      //always executed
    })

  },[shouldRefresh])

  //Get all listings
  useEffect(()=> {
    axios.get(`${urlEndPoint}/listings/all-listings`)
    .then(function (response){
      console.log(response.data.listings);
      setListings(response.data.listings);
      
    })
    .catch(function (error){
      console.log(error);
    })
    .finally(function (){
      //always executed
    })

  },[shouldRefresh])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout categoriesList = {categoriesList}/>,
      children: [
        {
          index: true,
          element: <HomePage
            listings = {listings}
            categoriesList={categoriesList} 
            urlEndPoint={urlEndPoint} 
            setShouldRefresh={setShouldRefresh}
          />

        },
        { 
          path: "/listings/get-listing/:listingId",
          element: <ListingPage 
          urlEndPoint={urlEndPoint} 
          setShouldRefresh={setShouldRefresh}/>
        },
        { 
          path: "/listings/create-listing",
          element: <CreateListingPage 
          categoriesList={categoriesList} 
          urlEndPoint={urlEndPoint} 
          setShouldRefresh={setShouldRefresh}/>
        },
        

      ]

    }
  ])

  return (
    <div className="App-header">
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
