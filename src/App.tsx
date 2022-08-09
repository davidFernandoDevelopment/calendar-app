import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { AppRouter } from './router';
import { store } from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppRouter />
      </Router >
    </Provider>
  );
};

export default App;