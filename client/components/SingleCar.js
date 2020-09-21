import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateCar, destroyCar, setCar } from '../store'
import UpdateForm from './UpdateForm';

class SingleCar extends React.Component {
  constructor() {
    super()
    this.state = {
      model: '',
      manufacturer: '',
      type: '',
      color: '',
      description: ''
    }
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.props.load(this.props.match.params.id)
  }

  componentDidUpdate() {

  }

  change(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submit(event) {
    const { model, manufacturer, type, color, description } = this.state;
    event.preventDefault();
    this.props.updateCar({ car: {
      id: this.props.match.params.id,
      model,
      manufacturer,
      type,
      color,
      description },
      history: this.props.history
    })
    this.setState({
      model: '',
      manufacturer: '',
      type: '',
      color: '',
      description: ''
    });
  }

  render() {
    const car = this.props.car;
    return (

      <div>
        <h1 className='welcome'>{ car.model }</h1>
        <UpdateForm model={ this.state.model } manufacturer={ this.state.manufacturer }
            type={ this.state.type } color={ this.state.color } description={ this.state.description } change={ this.change } submit={ this.submit }/>
        <div className='button-container'>
          <button onClick={ () => this.props.destroyCar({ id: car.id, history: this.props.history }) }>DELETE</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    car: state.car
  }
}

const mapDispatchToProps = dispatch => {
  return {
    load: (id) => dispatch(setCar(id)),
    updateCar: (car) => dispatch(updateCar(car)),
    destroyCar: (obj) => dispatch(destroyCar(obj))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleCar);
