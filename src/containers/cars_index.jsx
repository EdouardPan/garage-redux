import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { fetchCars } from '../actions'

class CarsIndex extends Component {

  componentWillMount() {
    this.props.fetchCars(this.props.garage);
  }

  renderList() {
    return this.props.cars.map(car => {
      return(
        <Link to={`/cars/${car.id}`} className="car" key={car.id}>
          <h4>{car.brand} - {car.model}</h4>
          <p><span>Owner: </span>{car.owner}</p>
        </Link>
      );
    });
  }

  render(){
    return(
      <div className="app">
        <div className="left-side">
          <div className="left-side-picture"></div>
          <div className="left-side-info">
            <h1>{this.props.garage.name}</h1>
            <p>{this.props.garage.description}</p>
            <Link to="/new">
              Add a car
            </Link>
          </div>
        </div>
        <div className="right-side">
          {this.renderList()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
 return {
    cars: state.cars,
    garage: state.garage
  };
}

function mapDispatchToProps(dispatch) {
 return bindActionCreators({ fetchCars }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(CarsIndex);
