import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Api from '../Api/Api'

const Addreview = () => {
    const [name,setname]=useState("")
    const [rating,setrating]=useState("")
    const [review,setreview]=useState("")
    const {id}=useParams();



    const handlesubmitreview =async(e)=>{
        e.preventDefault();
        try {
            const res =await Api.post(`/${id}/addreview`,{
                name,review,rating
            })
            window.location.reload();      
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div>
        <form>
            <div className='row'>
                <div className="form-group col-8 ">
                    <label htmlFor='name'>Name</label>
                    <input id='name'placeholder='name' type='text' value={name} onChange={(e)=>setname(e.target.value)} className='form-control'/>
                </div>
                <div className='form-group col-4'>
                    <label htmlFor='rating'>Rating</label>
                    <select id='rating' className='form-select' value={rating} onChange={(e)=>setrating(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
            </div>
            <div className='form-group'>
                <label htmlFor='review'>Review</label>
                  <textarea name="" id="review" cols="30" rows="10" className='form-control' value={review} onChange={(e)=>setreview(e.target.value)}></textarea>
            </div>
            <button onClick={handlesubmitreview} className='btn btn-primary  form-control  mt-3 text-capitalize  fw-semibold '>Submit</button>
        </form>
    </div>
  )
}

export default Addreview