import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const SET_CARS = 'SET_CARS';
const SET_CAR = 'SET_CAR';
const UDPATE_CAR = 'UPDATE_CAR';
const DESTROY_CAR = 'DESTROY_CAR';
const CREATE_CAR = 'CREATE_CAR';

// ACTION CREATORS
const _setCars = (cars) => {
  return {
    type: SET_CARS,
    cars
  }
}
const _setCar = (car) => {
  return {
    type: SET_CAR,
    car
  }
}
const _updateCar = (car) => {
  return {
    type: UDPATE_CAR,
    car
  }
}
const _destroyCar = (id) => {
  return {
    type: DESTROY_CAR,
    id
  }
}
const _createCar = (car) => {
  return {
    type: CREATE_CAR,
    car
  }
}

// THUNK CREATORS
const setCars = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/cars');
    dispatch(_setCars(response.data));
  }
}
const setCar = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/cars/${id}`)
    dispatch(_setCar(response.data));
  }
}
const updateCar = ({ car, history }) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/cars/${car.id}`, car)
    dispatch(_updateCar(response.data));
    history.push('/cars');
  }
}
const destroyCar = ({ id, history }) => {
  return async (dispatch) => {
    const res = await axios.delete(`/api/cars/${id}`);
    dispatch(_destroyCar(id));
    history.push('/cars');
  }
}
const createCar = (car) => {
  return async (dispatch) => {
    const response = await axios.post('/api/cars', car);
    dispatch(_createCar(response.data));
  }
}

const carsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CARS:
      return action.cars;
    case UDPATE_CAR:
      return state.map(car => car.id === action.car.id ? action.car : car);
    case DESTROY_CAR:
      return state.filter(car => car.id !== action.id * 1);
    case CREATE_CAR:
      return [action.car, ...state];
    default:
      return state;
  }
}

const carReducer = (state = {}, action) => {
  switch(action.type) {
    case SET_CAR:
      return action.car;
    default:
      return state;
  }
}

const reducer = combineReducers({
  cars: carsReducer,
  car: carReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
export { setCars, setCar, updateCar, destroyCar, createCar };
