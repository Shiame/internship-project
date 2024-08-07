import React from 'react'
import './Cards.css'
import CardItem from './cardItem'

function Cards  ()  {
  return (
    <div className='cards'>
      <h1>Tous les sites de la Direction </h1>
      <div className="cards__container">
        <div className="cards__wrapper">
        <ul className="cards__items">
              <CardItem
              src="/imgs/img4.jpg"
              text="WebSite n 1"
              path='/website1' />
              <CardItem
              src="/imgs/img5.jpg"
              text="WebSite n 2"
              path='/website1' />
            </ul>
            <ul className="cards__items">
              <CardItem
              src="/imgs/img1.jpg"
              text="WebSite n 3"
              path='/website1' />
              <CardItem
              src="/imgs/img2.jpg"
              text="WebSite n 4"
              path='/website1' />
              <CardItem
              src="/imgs/img3.jpg"
              text="WebSite n 5"
              path='/website1' />

            </ul>
           
        </div>

      </div>
    </div>
  )
}

export default Cards
