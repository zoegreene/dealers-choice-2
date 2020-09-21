import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const CarsList = ({ cars }) => {
  return (
      <div className='container'>
        <div className='button-container'>
          <button id='create'><Link to='/create'>Create</Link></button>
        </div>
        <div className='car-list'>
        { cars.map(car => {
          return (
            <div className='single-car' key={ car.id }>
              <Link to={`/cars/${car.id}`}>{ car.model }</Link>
            </div>
          )
        })}
        </div>
      </div>

  )
}

const mapStateToProps = state => {
  return {
    cars: state.cars
  }
}

export default connect(mapStateToProps, null)(CarsList);
