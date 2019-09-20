import React from 'react';
import ItemCard from './ItemCard';

const ItemList = (props) => {
  return (
    <div className="text-center">
      {props.items.map(item => (
        <ItemCard
          key={item.imdbID}
          title={item.Title}
          posterUrl={item.Poster}
          saveItem={props.saveItem}
        />
      ))}
    </div>
  )
}

export default ItemList;
