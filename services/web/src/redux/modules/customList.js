// Actions
const SAVE_LIST_ITEMS = 'SAVE_LIST_ITEMS';
const GET_LIST_ITEMS = 'GET_LIST_ITEMS';

// Reducer
export default function reducer(state = {}, action = {}) {
   switch (action.type) {
     // do reducer stuff
     default: return state;
   }
 }

// Action creators
export function getListId(listId) {
  return
     {     
        type: GET_LIST_ITEMS,
        items
     }
}

export function saveItems(username, listName) {
  {     
    type: SAVE_LIST_ITEMS,
    items
 }
};
