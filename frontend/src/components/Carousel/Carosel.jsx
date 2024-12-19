import React from 'react'

import { Carousel } from "flowbite-react";


 const Carosel =({images})=> {

    return (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 sm:w-1/2 w-full">
            <Carousel>
            {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="object-cover w-full h-full"
          />
        ))}
            </Carousel>
        </div>

    )
}

export default Carosel