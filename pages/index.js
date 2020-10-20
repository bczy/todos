import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';

import AddTodo from '../components/AddTodo';
import Todos from '../components/Todos';
import { Container } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
 
import rootReducer from '../store/reducers';
import { Provider } from 'react-redux';
import { fetchTodos } from '../store/actions';
import { useEffect } from 'react';

export default function Home() {
  const store = createStore(
    rootReducer,  
    composeWithDevTools(
      applyMiddleware(thunkMiddleware), // lets us dispatch() functions
    ),
  )
  
  useEffect(() => {
    store.dispatch(fetchTodos('trambz'));

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
      </Provider>
    </main>
      <footer>
       
      </footer>
    </div>
  )
}
