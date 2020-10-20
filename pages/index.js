import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav'
import { useState } from 'react';
import AddTodo from '../components/AddTodo';
import Todos from '../components/Todos';
import { Container, Navbar } from 'react-bootstrap';
import Navigation from '../components/Navigation';

export default function Home() {
  const [currentPage, setCurrentPage ] = useState('todos')
  return (
    <div> 
      <Head>
        <title>Next todos </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
    <main>
      <Container className="m-4 flex fluid">
      {currentPage === "todos" ?
          <Container className="flex fluid">
            <Todos />
            <AddTodo />
          </Container>
          : 
          <>Hello</> 
        }
      </Container>
    </main>
      <footer>
       
      </footer>
    </div>
  )
}
