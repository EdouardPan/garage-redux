// TODO: add and export your own actions

export function fetchCars(garage){

  const garageId = garage.name.toLowerCase().replace(/ /g,'_');

  const promise = fetch(`https://wagon-garage-api.herokuapp.com/${garageId}/cars`)
    .then(response => response.json());

  return {
    type: 'FETCH_CARS',
    payload: promise
  };
}

export function createCar(garage, body, callback){

  const garageId = garage.name.toLowerCase().replace(/ /g,'_');

  const request = fetch(`https://wagon-garage-api.herokuapp.com/${garageId}/cars`,{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  }).then(response => response.json())
  .then(callback);

  return{
    type: 'CAR_CREATED',
    payload: request
  };
}

export function fetchCar(id){

  const promise = fetch(`https://wagon-garage-api.herokuapp.com/cars/${id}`)
    .then(response => response.json());

  return {
    type: 'FETCH_CAR',
    payload: promise
  };
}

export function deleteCar(id, callback){

  debugger

  const request = fetch(`https://wagon-garage-api.herokuapp.com/cars/${id}`,{
    method: 'DELETE'
  }).then(response => response.json())
  .then(callback);

  return {
    type: 'DELETE_CAR',
    payload: request
  }

}
