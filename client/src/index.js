import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import store from 'modules';
import App from 'core/App';


render(<Provider store={store}><App /></Provider>, document.querySelector('#mount_place'));
