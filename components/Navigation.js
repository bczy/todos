import { Navbar, Nav, Image } from "react-bootstrap";

const Navigation = () => 
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        <Image src="/logo.svg" 
          width="45"
          height="45"
          className="mr-1" />
        Next todos
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#features">About</Nav.Link>
          <Nav.Link href="#pricing">Settings</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link target="blank" href="https://github.com/bczy/todos">GitHub</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

export default Navigation;