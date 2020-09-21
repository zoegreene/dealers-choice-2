import React from 'react';
import { connect } from 'react-redux';
import { createCar } from '../store';
import UpdateForm from './UpdateForm';


class CreateCar extends React.Component {
  constructor() {
    super()
    this.state = {
      model: '',
      manufacturer: '',
      type: '',
      color: '',
      description: ''
    }
    this.submit = this.submit.bind(this);
    this.change = this.change.bind(this);
  }

  change(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submit(event) {
    const { model, manufacturer, type, color, description } = this.state;
    event.preventDefault();
    this.props.createCar({ model, manufacturer, type, color, description })
    this.setState({
      model: '',
      manufacturer: '',
      type: '',
      color: '',
      description: ''
    });
  }

  // link save button and new cancel button back to home
  render() {
    const { model, manufacturer, type, color, description } = this.state;
    const { change, submit } = this;
    return (
      <UpdateForm
        model={ model }
        manufacturer={ manufacturer }
        type={ type }
        color={ color }
        description={ description }
        change={ change }
        submit={ submit }
      />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createCar: (car) => dispatch(createCar(car))
  }
}

export default connect(null, mapDispatchToProps)(CreateCar);
