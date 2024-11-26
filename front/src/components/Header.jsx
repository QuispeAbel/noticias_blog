import { Button, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { NavLink } from "../utils";

const Logo = styled.img`
  width: 120px;
`;

const NavItem = styled.li`
  margin-left: 20px;

  .nav-link {
    font-size: 1rem;
    color: #ffffff;
    transition: color 0.3s ease, transform 0.2s ease;
    padding: 5px 10px;

    &:hover {
      color: #6fcafa;
      text-decoration: none;
    }

    &.active {
      color: #ffffff;
      font-weight: bold;
      border-bottom: 2px solid #ffffff;
    }
    
    &.active:hover {
      color: #6fcafa;
      text-decoration: none;
      border-bottom: 2px solid #6fcafa;
    }
  }
`;

const StyledNavbar = styled.nav`
  background: #000821;
  }
`;

function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <StyledNavbar className="navbar navbar-expand-lg py-3">
        <Container fluid className="justify-content-center">
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <Logo src="/assets/noticias/TN_todo_noticias_logo.svg.png" alt="Logo" />
          </NavLink>

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
        </Container>
      </StyledNavbar>
    </header>
  );
}

export default Header;
