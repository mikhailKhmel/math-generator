import {legacy_createStore as createStore} from 'redux';
import reducer from './reducers';

function loadFromLocalStorage() {
  const data = localStorage.getItem('data');
  if (data === null) return undefined;
  const state = JSON.parse(data);
  if (state.name !== undefined) {
    state.user = {name: state.name, age: state.age, sex: 'M'};
  }
  return state;
}

const store = createStore(reducer, loadFromLocalStorage());
store.subscribe(
    () => localStorage.setItem('data', JSON.stringify(store.getState())));

export default store;