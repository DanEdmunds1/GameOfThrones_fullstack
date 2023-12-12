import { Link, useNavigate } from 'react-router-dom'
import NavBarSearch from './NavbarSearch';

// bootstrap components
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

// helpers
import { removeToken, activeUser } from '../utils/helpers/common'


// Image
import wolf from '../images/wolf-logo.png'


export default function NavbarFunction(){

  const navigate = useNavigate()

  function handleLogOut(){
    removeToken()
    navigate('/')
  }

  return (
    <>
        <Navbar key={false} expand={false} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Link to="/"><img className='logo-icon' src={wolf} alt="Stark Wolf" /></Link>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${false}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
                  Browse
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/houses">Houses</Nav.Link>
                  <Nav.Link href="/characters">Characters</Nav.Link>
                  <Nav.Link href="/places">Places</Nav.Link>
                  {activeUser() ? 
                  <>
                  <Nav.Link to="/profile" >Profile Page</Nav.Link>
                  <Nav.Link href="/characters/create">Create A Character</Nav.Link>
                  <span onClick={handleLogOut}>Log Out</span>
                  </>
                  :
                  <>
                  <Nav.Link href="Register">Register</Nav.Link>
                  <Nav.Link href="Login">Login</Nav.Link>
                  </>
                  }
                </Nav>
                <NavBarSearch />
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>

    </>
  )

}