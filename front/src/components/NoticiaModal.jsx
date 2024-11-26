import React, { useState, useEffect, useCallback } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import styled from "styled-components";
import { getProduct } from "../utils";

// Styled components
const StyledModal = styled(Modal)`
  .modal-content {
    overflow: hidden;
  }
`;

const StyledModalHeader = styled(Modal.Header)`
  background-color: #000821;
  color: #fff;
  border-bottom: none;
  padding: 1.5rem;

  .modal-title {
    font-size: 1.8rem;
    font-weight: bold;
  }

  button {
    color: #ffffff;
    opacity: 0.8;

    &:hover {
      opacity: 1;
    }
  }
`;

const StyledModalBody = styled(Modal.Body)`
  padding: 2rem;
  background-color: #f8f9fa;

  h5 {
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #333;
  }

  p {
    font-size: 1rem;
    color: #495057;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  img {
    width: 100%;
    height: auto;
    margin-bottom: 1rem;
  }

  .info-text {
    font-size: 0.85rem;
    color: #6c757d;
    text-align: right;
    margin-top: 1rem;
  }
`;

const StyledModalFooter = styled(Modal.Footer)`
  background-color: #000821;
  padding: 1rem;
  border-top: none;

  button {
    border-radius: 20px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: bold;

    &.btn-secondary {
      background-color: #ffffff;
      color: #000821;
      border: 1px solid #000821;

      &:hover {
        background-color: #f1f1f1;
        color: #6fcafa;
      }
    }
  }
`;

const NewsModal = ({ show, handleClose, id_noticia }) => {
  const [noticia, setNoticia] = useState({
    titulo: "",
    categoria: "",
    copete: "",
    cuerpo: "",
    imagen: null,
    fecha: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchProduct = useCallback(async () => {
    const fetchedNoticia = await getProduct(id_noticia);
    setNoticia(fetchedNoticia);
    setLoading(false);
  }, [id_noticia]);

  useEffect(() => {
    if (show) {
      fetchProduct();
    } else {
      setLoading(true);
    }
  }, [fetchProduct, show]);

  if (!show) {
    return null;
  }

  return (
    <StyledModal show={show} onHide={handleClose} centered>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "200px", padding: "2rem" }}
        >
          <Spinner animation="border" style={{ color: "#000821" }} />
        </div>
      ) : (
        <>
          <StyledModalHeader closeButton>
            <Modal.Title>{noticia.titulo}</Modal.Title>
          </StyledModalHeader>
          <StyledModalBody>
            <h5>{noticia.copete}</h5>
            <p>{noticia.cuerpo}</p>
            {noticia.imagen && (
              <img
                src={`/assets/noticias/${noticia.imagen}`}
                alt={noticia.copete}
              />
            )}
            <div className="info-text">
              {noticia.fecha} | {noticia.categoria}
            </div>
          </StyledModalBody>
          <StyledModalFooter>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
          </StyledModalFooter>
        </>
      )}
    </StyledModal>
  );
};

export default NewsModal;
