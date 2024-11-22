import React, { useEffect, useState, useCallback } from 'react';

import { Card, Container, Row, Col, Spinner, Form, Dropdown } from "react-bootstrap";
import styled from "styled-components";

import NewsModal from './NoticiaModal';
import UpdateDeleteButtons from "./UpdateDeleteButtons";

// Styled component for product image
const ProductImg = styled(Card.Img)`
  width: 100%;
  height: 200px;
  object-fit: contain;
  display: block;
`;

// Styled component for product card
const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .card-text {
    height: 110px;
  }
`;

const getProducts = async (categoria) => {
  const params = new URLSearchParams();
  if (categoria) params.append('categoria', categoria);

  const response = await fetch(`${process.env.REACT_APP_API_URL}/noticias.php?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Ha ocurrido un error');
  }

  return response.json();
};

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownValue, setDropdownValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [idNoticiaMostrar, setIdNoticiaMostrar] = useState(null);

  const handleShow = (id_noticia) => {
    setShowModal(true);
    setIdNoticiaMostrar(id_noticia);
  };

  const handleClose = () => setShowModal(false);

  const fetchProducts = useCallback(async () => {
    try {
      const fetchedProducts = await getProducts(dropdownValue);
      setProducts(fetchedProducts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [dropdownValue]);
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
      return <Spinner animation="border" />;
  }

  if (error) {
      return <div>Error: {error}</div>;
  }

  return (
    <Container
      className="d-flex flex-column justify-content-end mx-auto p-4 my-4"
      fluid
    >
      <Row className="p-2">
        <Col md={11} className="mt-4 mb-0">
          <h1>Bienvenido a Noticias!</h1>
        </Col>
        <Col md={1}>
          <Form.Group controlId="product-category">
            <Form.Label>Categoría</Form.Label>
            <Dropdown>
              <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                Categoría
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setDropdownValue('')}>---</Dropdown.Item>
                <Dropdown.Item onClick={() => setDropdownValue('CIENCIA')}>Ciencia</Dropdown.Item>
                <Dropdown.Item onClick={() => setDropdownValue('EFEMERIDES')}>Efemerides</Dropdown.Item>
                <Dropdown.Item onClick={() => setDropdownValue('FARANDULA')}>Farandula</Dropdown.Item>
                <Dropdown.Item onClick={() => setDropdownValue('OTROS')}>Otros</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        {products.map((product) => (
          <Col
            key={product.id_noticia}
            id={product.id_noticia}
            xs={12}
            sm={12}
            md={6}
            lg={4}
            xxl={3}
            className="pb-4"
          >
            <StyledCard className="card shadow-md p-2 p-md-4 m-2">
              <div style={{cursor: 'pointer'}}  onClick={() => handleShow(product.id_noticia)}>
                <ProductImg variant="top" src={`/assets/noticias/${product.imagen}`}
                  title="Ilustración del Producto" alt={product.copete}/>
                <Card.Body className="d-flex flex-column pb-0">
                  <Card.Title>{product.titulo}</Card.Title>
                  <div>
                    {product.copete}
                  </div>
                </Card.Body>
                <div className="d-flex justify-content-end">
                  {product.fecha}
                </div>
              </div>
              <hr/>
              <div className="d-flex justify-content-end mt-2">
                <UpdateDeleteButtons productId={product.id_noticia} />
              </div>
            </StyledCard>
          </Col>
        ))}
      </Row>

      <NewsModal show={showModal} handleClose={handleClose} id_noticia={idNoticiaMostrar} />
    </Container>
  );
};

export default ProductPage;
