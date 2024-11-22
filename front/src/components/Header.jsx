import { Button, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { NavLink } from '../utils';

// Styled component for logo
const Logo = styled.img`
  width: 100px;
`;

// Styled Component for Nav items
const NavItem = styled.li`
  margin-left: 15px;
`;

function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-dark navbar-bg py-3">
        <Container fluid>
          <Button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </Button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <NavItem className="nav-item">
                <NavLink
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </NavItem>
              <NavItem className="nav-item">
                <NavLink
                  className={`nav-link ${
                    location.pathname === "/upload" ? "active" : ""
                  }`}
                  to="/upload"
                >
                  Cargar
                </NavLink>
              </NavItem>
            </ul>
          </div>
          <NavLink className="navbar-brand" to="/" style={{ margin: '0', padding: '0' }}>
          </NavLink>
        </Container>
      </nav>
    </header>
  );
}

export default Header;
