import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';

import { createCar } from '../actions';

class CarsNew extends Component {

  renderField(field) {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
        className="form-control"
        type={field.type}
        {...field.input}
        />
      </div>
    );
  }

  onSubmit = (values) => {
    this.props.createCar(this.props.garage, values, (car) => {
      this.props.history.push('/'); // Navigate after submit
      return car;
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
            <Link to="/">
              Back to list
            </Link>
          </div>
        </div>
        <div className="right-side">
          <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="form-new">
            <Field
            label="Brand"
            name="brand"
            type="text"
            component={this.renderField}
            />
            <Field
            label="Model"
            name="model"
            type="text"
            component={this.renderField}
            />
            <Field
            label="Owner"
            name="owner"
            type="text"
            component={this.renderField}
            />
            <Field
            label="Plate"
            name="plate"
            type="text"
            component={this.renderField}
            />
           <button className="btn btn-primary" type="submit"
          disabled={this.props.pristine || this.props.submitting}>
           Add a car
           </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
 return {
    garage: state.garage
  };
}

// function mapDispatchToProps(dispatch) {
//  return bindActionCreators({ fetchCars }, dispatch);
// }

export default reduxForm({ form: 'newCarForm' })(
 connect(mapStateToProps, { createCar })(CarsNew)
);
