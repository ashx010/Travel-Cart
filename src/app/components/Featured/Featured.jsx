import React from 'react'
import "./Featured.css"
import Ncard from "../Card/Ncard"

export default function Featured() {
  return (
    <div className='featured-container'>
      <h2 className='title-featured'>Featured</h2>
        <Ncard 
          imgSrc='/Japan_tokyo.jpeg'
          imgAlt='Featured 1'
          cardBodyHeading=''
          cardContainerClass={['card-container-featured']}
          cardHeaderClass={['card-header-featured card-1']}
          cardImageClass={['card-image-featured']}
          cardBodyHeaderClass={['card-body-heading-featured']}
        />
    </div>
  )
}
