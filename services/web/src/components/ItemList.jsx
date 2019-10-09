import React from 'react';
import ItemCard from './ItemCard';

const ItemList = (props) => {
  return (
    <div className="text-center">
      {props.items.map(item => (
        <ItemCard
          key={item.list_id}
          title={item.title}
          imageUrl={item.imageUrl}
          saveItem={props.saveItem}
        />
      ))}
    </div>
  )
}

export default ItemList;
