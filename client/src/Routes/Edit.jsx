import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Api from '../Api/Api'

const Edit = () => {
const {id}=useParams()
const [name,setname]=useState("")
const [location,setlocation]=useState("")
const [pricerange,setpricerange]=useState("")
const navigate=useNavigate();


const handlesubmit =async(e)=>{
  e.preventDefault();
  const res= await Api.put(`/${id}`,{
    name,location,price_range:pricerange
  })
  navigate("/");
}

useEffect(()=>{
  const fetchdata =async()=>{
    const res=await Api.get(`/${id}`);
    console.log("newdata",res);
    setname(res.data.results[0].name)
    setlocation(res.data.results[0].location)
    setpricerange(res.data.results[0].price_range)
  }
  fetchdata();
},[id]);

  return (
    <div>
      <form >
        <div className='form-group mt-4'>
          <label htmlFor='name'>Name</label>
          <input id='name' className='form-control ' type='text' value={name} onChange={(e)=>setname(e.target.value)}/>
        </div>
        <div className='form-group'>
          <label htmlFor='Location'>Location</label>
          <input id='Location' className='form-control' type='text' value={location} onChange={(e)=>setlocation(e.target.value)}/>
        </div>
        <div className='form-group'>
          <label htmlFor='PriceRange'>PriceRange</label>
          <input id='PriceRange' className='form-control' type='number' min={"1"} max={"5"} value={pricerange} onChange={(e)=>setpricerange(e.target.value)}/>
        </div>
        <div>
          <button onClick={handlesubmit} className='btn btn-primary form-control mt-2'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Edit