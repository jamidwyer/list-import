import React from 'react';

const ItemCard = (props) => {
  return (
    <div>
      <div>
        <div className='panel-heading'>
          <h3 className='panel-title'>{props.title}</h3>
        </div>
      </div>
    </div>
  )
}

export default ItemCard;
