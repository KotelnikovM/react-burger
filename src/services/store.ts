import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { wsActions, wsAuthActions, WS_API } from '../utils/ws-api';
import { socketMiddleware } from './middlewares';
import { rootReducer } from './reducer';

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(
        thunk,
        socketMiddleware(`${WS_API}/all`, wsActions, false),
        socketMiddleware(WS_API, wsAuthActions, true)
      )
    )
  );

  return store;
};

const store = configureStore();

export type RootState = ReturnType<typeof store.getState>;
