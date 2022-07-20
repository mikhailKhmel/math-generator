import {legacy_createStore as createStore} from 'redux';
import reducer from './reducers';

function loadFromLocalStorage() {
  const data = localStorage.getItem('data');
  if (data === null) return undefined;
  return JSON.parse(data);
}

const store = createStore(reducer, loadFromLocalStorage());
store.subscribe(
    () => localStorage.setItem('data', JSON.stringify(store.getState())));

export default store;