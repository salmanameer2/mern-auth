import React from 'react'
import './Header.css'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'

function Header() {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("name")
    navigate("/login")
  };

  return (
    <Navbar variant="dark" expand="lg" className="navbar-custom sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-logo">
          MERN<span>  AUTHENTICATION</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {token ? (
              <>
                <Nav.Link as={Link} to="/dashboard" className="nav-link-custom">Dashboard</Nav.Link>
                <Nav.Link onClick={handleLogout} className="nav-link-custom logout-btn">Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="nav-link-custom">Login</Nav.Link>
                <Nav.Link as={Link} to="/register" className="nav-link-custom signup-link">Sign Up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header