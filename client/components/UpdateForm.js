import React from 'react';
import { Link } from 'react-router-dom';

const UpdateForm = ({ model, manufacturer, type, color, description, change, submit }) => {
  return (
    <form onSubmit={ submit }>
      <div>
        <label>Model:</label>
        <input name='model' type='text' value={ model } onChange={ change } />
      </div>
      <div>
        <label>Manufacturer:</label>
        <input name='manufacturer' type='text' value={ manufacturer } onChange={ change } />
      </div>
      <div>
        <label>Type:</label>
        <input name='type' type='text' value={ type } onChange={ change } />
      </div>
      <div>
        <label>Color:</label>
        <input name='color' type='text' value={ color } onChange={ change } />
      </div>
      <div>
        <label>Description:</label>
        <input name='description' type='text' value={ description } onChange={ change } />
      </div>
      <div className='button-container'>
        <button type='submit' disabled={ model && manufacturer && type && color && description ? false : true }>SAVE</button>
        <button><Link to='/cars'>CANCEL</Link></button>
      </div>
    </form>
  )
}

export default UpdateForm;
