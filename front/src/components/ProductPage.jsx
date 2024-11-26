import React, { useEffect, useState, useCallback } from "react";
import { Card, Container, Row, Col, Spinner, Form, Dropdown } from "react-bootstrap";
import styled from "styled-components";
import NewsModal from "./NoticiaModal";
import UpdateDeleteButtons from "./UpdateDeleteButtons";

const NewsImg = styled(Card.Img)`
  width: 100%;
  height: ${(props) => (props.featured ? "300px" : "150px")};
  object-fit: cover;
  border-bottom: ${(props) => (props.featured ? "5px solid #000821" : "3px solid #aaa")};
`;

const NewsCard = styled(Card)`
  overflow: wrap;
  background-color: #ffffff;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  .card-title {
    font-size: ${(props) => (props.featured ? "1.8rem" : "1.2rem")};
    font-weight: ${(props) => (props.featured ? "bold" : "600")};
    margin-bottom: 0.8rem;
    color: #333;
  }

  .card-text {
    font-size: ${(props) => (props.featured ? "1rem" : "0.9rem")};
    color: #555;
    height: ${(props) => (props.featured ? "171px" : "20px")};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .card-footer {
    font-size: 0.85rem;
    color: #666;
    background-color: #f8f9fa;
    padding: 0.5rem;
    border-top: 1px solid #ddd;
  }
`;

const StyledDropdownToggle = styled(Dropdown.Toggle)`
  padding: 0.5rem 1.2rem;
  background-color: #ffffff;
  border: 1px solid #000821;
  color: #495057;

  &:hover,
  &:focus {
    background-color: #f8f9fa;
    color: #343a40;
  }
`;

const StyledContainer = styled(Container)`
  max-width: 1100px;
  padding: 2rem 1rem;
`;

const getNoticias = async (categoria) => {
  const params = new URLSearchParams();
  if (categoria) params.append("categoria", categoria);

  const response = await fetch(`${process.env.REACT_APP_API_URL}/noticias.php?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Error al cargar noticias");
  }
  return response.json();
};

const NoticiasPage = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownValue, setDropdownValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [idNoticiaMostrar, setIdNoticiaMostrar] = useState(null);

  const handleShow = (id_noticia) => {
    setShowModal(true);
    setIdNoticiaMostrar(id_noticia);
  };

  const handleClose = () => setShowModal(false);

  const fetchNoticias = useCallback(async () => {
    try {
      const fetchedNoticias = await getNoticias(dropdownValue);
      setNoticias(fetchedNoticias);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [dropdownValue]);

  useEffect(() => {
    fetchNoticias();
  }, [fetchNoticias]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" variant="primary" style={{ width: "4rem", height: "4rem" }} />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-danger">Error: {error}</div>;
  }

  const [destacada, ...resto] = noticias;
  const secundarias = resto.slice(0, 2);
  const inferiores = resto.slice(2);

  return (
    <StyledContainer>
      <Row className="mb-4">
        <Col md={12}>
          <Form.Group controlId="news-category" className="d-flex align-items-center">
            <Form.Label className="me-3 mb-0">Categoría:</Form.Label>
            <Dropdown>
              <StyledDropdownToggle id="dropdown-basic">
                {dropdownValue || "Seleccionar"}
              </StyledDropdownToggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setDropdownValue("")}>---</Dropdown.Item>
                <Dropdown.Item onClick={() => setDropdownValue("CIENCIA")}>Ciencia</Dropdown.Item>
                <Dropdown.Item onClick={() => setDropdownValue("EFEMERIDES")}>Efemérides</Dropdown.Item>
                <Dropdown.Item onClick={() => setDropdownValue("FARANDULA")}>Farándula</Dropdown.Item>
                <Dropdown.Item onClick={() => setDropdownValue("OTROS")}>Otros</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={7}>
          {destacada && (
            <NewsCard featured>
              <div onClick={() => handleShow(destacada.id_noticia)} style={{ cursor: "pointer" }}>
                <NewsImg
                  variant="top"
                  src={`/assets/noticias/${destacada.imagen}`}
                  featured
                  alt={destacada.copete}
                />
                <Card.Body>
                  <Card.Title featured>{destacada.titulo}</Card.Title>
                  <Card.Text featured>{destacada.copete}</Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                   <span>{destacada.fecha}</span>
                   <UpdateDeleteButtons productId={destacada.id_noticia} />
                </Card.Footer>
              </div>
            </NewsCard>
          )}
        </Col>
        <Col md={5}>
          <Row>
            {secundarias.map((noticia) => (
              <Col md={12} key={noticia.id_noticia} className="mb-4">
                <NewsCard>
                  <div onClick={() => handleShow(noticia.id_noticia)} style={{ cursor: "pointer" }}>
                    <NewsImg
                      variant="top"
                      src={`/assets/noticias/${noticia.imagen}`}
                      alt={noticia.copete}
                    />
                    <Card.Body>
                      <Card.Title>{noticia.titulo}</Card.Title>
                      <Card.Text>{noticia.copete}</Card.Text>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-between">
                      <span>{noticia.fecha}</span>
                      <UpdateDeleteButtons productId={noticia.id_noticia} />
                    </Card.Footer>
                  </div>
                </NewsCard>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Row>
        {inferiores.map((noticia) => (
          <Col md={6} key={noticia.id_noticia} className="mb-4">
            <NewsCard>
              <div onClick={() => handleShow(noticia.id_noticia)} style={{ cursor: "pointer" }}>
                <NewsImg
                  variant="top"
                  src={`/assets/noticias/${noticia.imagen}`}
                  alt={noticia.copete}
                />
                <Card.Body>
                  <Card.Title>{noticia.titulo}</Card.Title>
                  <Card.Text>{noticia.copete}</Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                   <span>{noticia.fecha}</span>
                    <UpdateDeleteButtons productId={noticia.id_noticia} />
                </Card.Footer>
              </div>
            </NewsCard>
          </Col>
        ))}
      </Row>

      <NewsModal show={showModal} handleClose={handleClose} id_noticia={idNoticiaMostrar} />
    </StyledContainer>
  );
};

export default NoticiasPage;
