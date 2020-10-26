import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';

import Head from 'next/head'

import { Container } from 'react-bootstrap';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

import { fetchTodos } from '../store/actions/todos';
import rootReducer from '../store/reducers';

import Navigation from '../components/Navigation';
import AddTodo from '../components/AddTodo';
import Todos from '../components/Todos';
import ServerErrorModal from '../components/ServerErrorModal';

export default function Home() {
  const store = createStore(
    rootReducer,  
    composeWithDevTools(
      applyMiddleware(thunkMiddleware) // lets us dispatch() functions
    ),
  )
  
  useEffect(() => {
    store.dispatch(fetchTodos());
  }, []);

  return (
    <div> 
      <Head>
        <title>Next todos </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
    <main>
      <Provider store={store}>
        <Container className="m-4 flex fluid">
          <Todos />
          <AddTodo />
        </Container>
        <ServerErrorModal />
      </Provider>
    </main>
    </div>
  )
}
