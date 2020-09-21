import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom';
import CarsList from './components/CarsList';
import CreateCar from './components/CreateCar';
import SingleCar from './components/SingleCar';
import store, { setCars } from './store';

class _App extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.load();
  }

  render() {
    return (
      <Router>
        <div>
          <h1 className='welcome'>Welcome to the Car Dealership!</h1>
          <h4 className='welcome'>Your dream car awaits...</h4>
          <div className='main-links'>
            <h4>
              <Link to='/'>Home</Link>
            </h4>
            <h4>
              <Link to='/cars'>All Cars ({ this.props.count })</Link>
            </h4>
          </div>
          <Switch>
            <Route path='/cars' exact component={ CarsList } />
            <Route path='/create' component={ CreateCar } />
            <Route path='/cars/:id' component={ SingleCar } />
          </Switch>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = ({ cars }) => {
  return  {
    count: cars.length
  }
}

const mapDispatchToProps = dispatch => {
    return {
      load: () => dispatch(setCars())
    }
}

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

ReactDOM.render(<Provider store={ store }><App /></Provider>, document.getElementById('root'));
