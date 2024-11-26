import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProduct } from "../utils";
import styled from "styled-components";
import { Row, Col, Button } from "react-bootstrap";


const StyledForm = styled.form`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;

  label {
    font-size: 1rem;
    font-weight: bold;
    color: #000821;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 0.8rem;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;

    &:focus {
      border-color: #000821;
      outline: none;
    }
  }

  button {
    background-color: #000821;
    color: #fff;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      background-color: #00337d;
    }
  }

  .image-preview {
    font-size: 0.9rem;
    color: #6c757d;
    margin-top: 0.5rem;
  }
`;

const postPatchProduct = async (product, productId) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/noticias_guardar.php?id_noticia=${productId}`, 
        {
            method: productId ? "PUT" : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        }
    );
    
    if (response.status < 200 || response.status >= 300) {
        const errorMessage = await response.json();
        throw new Error(JSON.stringify(errorMessage));
    }
}

const UploadUpdateProduct = () => {
  const [productId, setProductId] = useState(null);
  const [formData, setFormData] = useState({
    titulo: "",
    categoria: "",
    copete: "",
    cuerpo: "",
    imagen: null,
    fecha: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const handleUpdate = async () => {
      if (productId) {
        try {
          setFormData(await getProduct(productId));
        } catch (err) {
          console.log(err);
          setError("Lo sentimos, ha ocurrido un error.");
          setTimeout(() => setError(""), 3000);
          return;
        }
      }
    };

    const uri = window.location.search;
    const params = new URLSearchParams(uri);
    const id = params.get("product_id");
    setProductId(id);

    handleUpdate();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "imagen" ? `${e.target.files[0].name}` : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.titulo || !formData.copete || !formData.cuerpo || !formData.categoria || !formData.imagen ) {
      setError("Por favor, rellene todos los campos.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      await postPatchProduct(formData, productId);
    } catch (err) {
      console.log(err);
      setError("Lo sentimos, ha ocurrido un error.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setError("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);

    setFormData({
      titulo: "",
      categoria: "",
      copete: "",
      cuerpo: "",
      imagen: null,
      fecha: "",
    });

    navigate("/");
  };

  return (
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="titulo">Título</label>
        <input
          type="text"
          id="titulo"
          placeholder="Científicos descubren algo inédito"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          required
        />

        <label htmlFor="copete">Copete</label>
        <input
          type="text"
          id="copete"
          placeholder="Esto te sorprenderá..."
          name="copete"
          value={formData.copete}
          onChange={handleChange}
          required
        />

        <label htmlFor="cuerpo">Cuerpo</label>
        <textarea
          id="cuerpo"
          rows="5"
          placeholder="Describa la noticia en detalle..."
          name="cuerpo"
          value={formData.cuerpo}
          onChange={handleChange}
          required
        ></textarea>

        <Row>
          <Col>
            <label htmlFor="categoria">Categoría</label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una categoría</option>
              <option value="CIENCIA">Ciencia</option>
              <option value="FARANDULA">Farándula</option>
              <option value="EFEMERIDES">Efemérides</option>
              <option value="OTROS">Otros</option>
            </select>
          </Col>

          <Col>
            <label htmlFor="imagen">Imagen</label>
            <input
              type="file"
              id="imagen"
              name="imagen"
              onChange={handleChange}
              accept="image/*"
            />
            {formData.imagen && (
              <div className="image-preview">Imagen seleccionada: {formData.imagen}</div>
            )}
          </Col>
        </Row>

        <Button type="submit">Enviar</Button>
      </StyledForm>
  );
};

export default UploadUpdateProduct;
