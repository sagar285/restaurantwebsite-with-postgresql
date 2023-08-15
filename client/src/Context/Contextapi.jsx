import React, { createContext, useState } from 'react'

export const RestaurantContext=createContext();

const Contextapi = ({children}) => {
    const [Restaurants,setrestaurants] =useState([]);
    const [selectedrestaurant,setselectedrestaurant]=useState(null);

    const addrestaurant =(restaurant)=>{
        console.log(restaurant);
     setrestaurants([...Restaurants,restaurant]);
    }
    
  return (
    <div>
        <RestaurantContext.Provider value={{Restaurants,setrestaurants,addrestaurant,selectedrestaurant,setselectedrestaurant}}>
            {children}
        </RestaurantContext.Provider>
    </div>
  )
}

export default Contextapi