import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createBrowserHistory as createHistory } from 'history';
import store from 'shared/store';
import i18n from 'shared/i18n';
import Root from 'shared/Root';

import 'reset.css';
import 'Styles/main.scss';

const history = createHistory();

const method = process.env.NODE_ENV === 'local' ? 'render' : 'hydrate';

ReactDOM[method](
  <AppContainer>
    <Root store={store} history={history} i18n={i18n} />
  </AppContainer>,
  document.getElementById('root'),
);
