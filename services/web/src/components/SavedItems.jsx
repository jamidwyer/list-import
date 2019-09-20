import React from 'react';
import { Link } from 'react-router-dom';

const SavedItems = (props) => {

  return (
    <div>
      <br/><br/>
      <div className="text-center"><Link to='/'>Home</Link></div>
      <table className='table table-hover'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Date Added</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            props.saved.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{ item.id }</td>
                  <td>{ item.title }</td>
                  <td>{ item.created_at }</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default SavedItems;
