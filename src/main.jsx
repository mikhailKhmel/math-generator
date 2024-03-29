import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App.jsx';
import {Provider} from 'react-redux';
import store from './store.js';
import {Container} from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}>
  <Container maxWidth="md">
    <App/>
  </Container>

</Provider>);
