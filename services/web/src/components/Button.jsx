import React from 'react';

const Button = (props) => {
  return (
    <button
      className='btn btn-primary btn-sm'
      onClick={ () => props.saveItem(props.title) }
    >Add to Collection
    </button>
  )
}

export default Button;
