import React, { useState,useContext } from "react";
import Api from "../Api/Api";

import { RestaurantContext } from "../Context/Contextapi";

const Addrestaurant = () => {
  const [name, setname] = useState("");
  const [location, setlocation] = useState("");
  const [pricerange, setpricerange] = useState("");
  const {addrestaurant,Restaurants }=useContext(RestaurantContext);


  

  const handlesubmit = async(e) => {
      e.preventDefault();
      try {
        const response = await Api.post("/",{
            name,location,price_range:pricerange
        })
        // console.log(response.data);
        addrestaurant(response.data);
        setname("")
        setlocation("")
        setpricerange("")
        // window.location.reload();
      } catch (error) {
        
      }
  };

  console.log(Restaurants);

  return (
    <div>
      <form>
        <div className="d-flex">
          <div className="col">
            <input type="text" className="form-control" placeholder="name" value={name} onChange={(e)=>setname(e.target.value)} />
          </div>
          <div className="col ms-2">
            <input
              type="text"
              className="form-control"
              placeholder="location"
              value={location} onChange={(e)=>setlocation(e.target.value)}
            />
          </div>
          <div className="col ms-1">
            <select name="" id="" className="form-select" value={pricerange} onChange={(e)=>setpricerange(e.target.value)}>
              <option disabled>Price Range</option>
              <option value={"1"}>1₹</option>
              <option value={"2"}>2₹</option>
              <option value={"3"}>3₹</option>
              <option value={"4"}>4₹</option>
              <option value={"5"}>5₹</option>
            </select>
          </div>
          <button type="submit" onClick={handlesubmit} className="btn btn-primary ms-2">Add</button>
        </div>
      </form>
    </div>
  );
};

export default Addrestaurant;
