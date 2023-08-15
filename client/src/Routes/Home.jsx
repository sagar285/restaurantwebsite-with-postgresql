import React from 'react'
import Header from '../Component/Header'
import Addrestaurant from '../Component/Addrestaurant'
import RestaurantList from '../Component/RestaurantList'

const Home = () => {
  return (
    <div>
      <Header/>
      <Addrestaurant/>
      <RestaurantList/>
    </div>
  )
}

export default Home