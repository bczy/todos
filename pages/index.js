import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Next todos </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav justify variant="tabs" defaultActiveKey="/todos">
      <Nav.Item>
        <Nav.Link href="/home">todos</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">settings</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">about</Nav.Link>
      </Nav.Item>
    </Nav>
      <footer>
       
      </footer>
    </div>
  )
}
