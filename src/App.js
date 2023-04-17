import './App.css';
import HomePage from './Pages/HomePage';
import ListingPage from './Pages/ListingPage';
import Layout from './Layouts/Layout';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const urlEndPoint = process.env.REACT_APP_URL_ENDPOINT;


function App() {
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage 
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

        

      ]

    }
  ])

  return 
}

export default App;
