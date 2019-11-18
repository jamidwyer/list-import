// Actions
const ADD_USER = 'ADD_USER';

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    // do reducer stuff
    default: return state;
  }
}

// Action Creators
export function addUser(user) {
  return
     {     
        type: ADD_USER,
        user
     }
}
