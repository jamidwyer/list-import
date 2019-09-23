import React from 'react';
import Button from './Button';

const ItemCard = (props) => {
  return (
    <div className='col-md-4'>
      <div className='panel panel-info'>
        <div className='panel-heading'>
          <h3 className='panel-title'>{props.title}</h3>
        </div>
        <div className='panel-body'>
          <img src={props.posterUrl} alt='Presentation' />
        </div>
        <Button props />
      </div>
    </div>
  )
}

export default ItemCard;
