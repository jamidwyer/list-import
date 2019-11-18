import React from 'react';
import ItemCard from './ItemCard';

const ItemList = (props) => {
  if ( !props.items || props.items.length < 1 ) {
    return null;
  }
  return (
    <div className="text-center">
      {props.items.map(item => (
        <ItemCard
          key={item.title}
          title={item.title}
          imageUrl={item.imageUrl}
          saveItem={props.saveItem}
        />
      ))}
    </div>
  )
}

export default ItemList;
