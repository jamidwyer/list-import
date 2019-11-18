import React from 'react';
import ItemList from './ItemList';
import TextInput from './TextInput';
import fetchPinterest from '../actions/pinterest';
import { getListItems, saveItems } from '../actions/customList';

const Page = (props) => {
  const { createFlashMessage, listId, route } = props;
  const renderInputType = (route) => {
    switch(route) {
      case 'pinterest':
        return (<TextInput
        createFlashMessage={createFlashMessage}
        submitText={fetchPinterest} />);
      case 'text-line-breaks':
        return (<TextInput
        createFlashMessage={createFlashMessage}
        delimiter='line-break'
        submitText={saveItems} />);
      default:
        return null;
    }
  };
  return (
    <div>
      <div className='list-input'>
        {renderInputType(route)}
      </div>
      <ItemList listId={listId} />
    </div>
  )
}

export default Page;
