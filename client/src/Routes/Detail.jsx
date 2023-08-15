import React, { useContext, useEffect } from 'react'
import Reviews from '../Component/Reviews'
import { RestaurantContext } from '../Context/Contextapi'
import { useParams } from 'react-router-dom'
import Api from '../Api/Api'
import Addreview from '../Component/Addreview'
import StarRating from '../Component/StarRating'

const Detail = () => {
  const {id}=useParams();
  const {selectedrestaurant,setselectedrestaurant}=useContext(RestaurantContext);

  useEffect(()=>{
        const fetchdata =async()=>{
          const res = await Api.get(`/${id}`);
          // console.log(res);
          setselectedrestaurant(res.data);
        }
        fetchdata();
  },[id])

  console.log(selectedrestaurant);



  return (
    <>
      {
        selectedrestaurant && <>
           <h1 className='text-center text-capitalize  display-1  fw-semibold '>{selectedrestaurant.results && selectedrestaurant.results[0].name}</h1>    
           <div className='text-center'>
            <StarRating rating={selectedrestaurant.results && selectedrestaurant.results[0].avg_rating}/>
            <span className='text-warning ml-1'>
                {
                  selectedrestaurant.results && selectedrestaurant.results[0].count ? `(${selectedrestaurant.results[0].count})`:"(0)"
                }
            </span>
            </div>   
         
       <Reviews reviews={selectedrestaurant.reviews}/> 
      <Addreview/>
      </>

} 
</>
  )
}

export default Detail