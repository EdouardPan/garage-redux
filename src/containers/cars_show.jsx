import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';

import { fetchCar, deleteCar } from '../actions';


class CarsShow extends Component {

  componentDidMount() {
    if (!this.props.car) {
      this.props.fetchCar(this.props.match.params.id);
    }
  }

  handleDelete = () => {
    this.props.deleteCar(this.props.car.id, (car) => {
      this.props.history.push('/'); // Navigate after submit
      return car;
    });
  }

  render() {
    if (!this.props.car) {
     return <p>Loading...</p>;
     }

    return(
      <div className="app">
        <div className="left-side">
          <div className="left-side-picture"></div>
          <div className="left-side-info">
            <h1>{this.props.garage.name}</h1>
            <p>{this.props.garage.description}</p>
            <Link to="/">
              Back to the list
            </Link>
          </div>
        </div>
        <div className="right-side">
        <div className="car">
          <h4>{this.props.car.brand} - {this.props.car.model}</h4>
          <p><span>Owner: </span>{this.props.car.owner}</p>
          <div className="plate">{this.props.car.plate}</div>
          <Link to={`/cars/${this.props.car.id}`} className="delete" onClick={this.handleDelete}>delete</Link>
        </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
 const idFromUrl = parseInt(ownProps.match.params.id, 10); // From URL
 const car = state.cars.find(p => p.id === idFromUrl);
 return { car: car, garage: state.garage };
}

function mapDispatchToProps(dispatch) {
 return bindActionCreators({ fetchCar, deleteCar }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CarsShow));
