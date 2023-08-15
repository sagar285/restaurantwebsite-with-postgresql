import React, { useContext, useEffect } from 'react'
import Api from '../Api/Api'
import { RestaurantContext } from '../Context/Contextapi';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';

const RestaurantList = () => {
    const {Restaurants,setrestaurants} =useContext(RestaurantContext)
    const navigate =useNavigate()

    useEffect(()=>{
        const getdata =async()=>{
            const response =await Api.get("/");
            console.log(response);
            setrestaurants(response.data);
        }
        getdata();
    },[]);

    const handledetail =(id)=>{
        navigate(`/restaurant/${id}`)
    }
   
    const handledelete =async(e,id)=>{
        e.stopPropagation();
        try {
            const res= await Api.delete(`/${id}`);
            setrestaurants(
                Restaurants.filter((rest)=>{
                    return rest.id!==id;
                })
            );
        } catch (error) {
            console.log(error);
        }
    }

    const handleupdate =(e,id)=>{
        e.stopPropagation();
          navigate(`/restaurant/${id}/update`)
    }


    const renderrating =(el)=>{
      if(!el.count){
        return <span className='text-warning'>0 reviews</span>
      }
      return(
        <>
        <div>
        <StarRating rating={el.avg_rating}/>
        <span>({el.count})</span>
        </div>
        </>
      )

    }



  return (
    <div>
        <table className="table">
  <thead>
    <tr>
      <th scope="col">Restaurant</th>
      <th scope="col">Location</th>
      <th scope="col">Price</th>
      <th scope="col">Rating</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    {
        Restaurants && Restaurants.map((el)=>(
            <tr onClick={()=>handledetail(el.id)} key={el.id}>
            <td>{el.name}</td>
            <td>{el.location}</td>
            <td>{el.price_range}</td>
            <td>{renderrating(el)}</td>
            <td><button onClick={(e)=>handleupdate(e,el.id)} className='btn btn-warning '>Edit</button></td>
            <td><button className='btn btn-danger ' onClick={(e)=>handledelete(e,el.id)}>Delete</button></td>
          </tr>
        ))
    }
   
    
  
  </tbody>
</table>
    </div>
  )
}

export default RestaurantList