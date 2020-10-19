import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav'
import { useState } from 'react';
import Todo from '../components/TodoForm';
import Todos from '../components/Todos';

export default function Home() {
  const [currentPage, setCurrentPage ] = useState('todos')
  return (
    <div>
      <Head>
        <title>Next todos </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav onSelect={(selectedTab) => setCurrentPage(selectedTab)} 
        justify 
        variant="tabs" >
      <Nav.Item>
        <Nav.Link eventKey="todos">todos</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="settings">settings</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="about">about</Nav.Link>
      </Nav.Item>
    </Nav>
    <main>
      {currentPage === "todos" ?
        <>
          <Todo/>
          <Todos />
        </>
        : 
        <>Hello</> 
      }
    </main>
      <footer>
       
      </footer>
    </div>
  )
}
