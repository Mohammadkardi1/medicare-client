import React from 'react'
import ServiceCard from './ServiceCard'
import { services } from '../../assets/data/services';


const ServicesList = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[20px] lg:mt-[45px] '>
        {services.map((item, index) => (
            <ServiceCard item={item} index={index} key={index}/>
        ))}
    </div>
  )
}

export default ServicesList
