import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { getProduct } from '../utils';

import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
} from 'react-bootstrap';

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
        titulo: '',
        categoria: '',
        copete: '',
        cuerpo: '',
        imagen: null,
        fecha: '',
    });
  
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const handleUpdate = async (e) => {
            if(productId) {
                try {
                    setFormData(await getProduct(productId));
                } catch (err) {
                    console.log(err);

                    if('message' in err) {
                        setError(err.message);
                    } else {
                        setError('Lo sentimos, ha ocurrido un error');
                    }
                    setTimeout(() => setError(''), 3000);
                    return;
                }
            }
        };

        const uri = window.location.search;
        const params = new URLSearchParams(uri);
        const id = params.get('product_id');
        setProductId(id);

        handleUpdate();
    }, [productId]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === 'imagen' ? `${e.target.files[0].name}` : value,
      }));
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!formData.titulo || !formData.copete || !formData.cuerpo || !formData.categoria || !formData.imagen) {
            setError('Por favor, rellene todos los campos.');
            setTimeout(() => setError(''), 3000);
            return;
        }

        try {
            await postPatchProduct(formData, productId);
        } catch (err) {
            console.log(err);

            if('message' in err) {
                setError(err.message);
            } else {
                setError('Lo sentimos, ha ocurrido un error');
            }
            setTimeout(() => setError(''), 3000);
            return;
        }
    
        setError('');
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);

        console.log('Form submitted:', formData);

        setFormData({
            titulo: '',
            categoria: '',
            copete: '',
            cuerpo: '',
            imagen: null,
            fecha: '',
        });

        navigate('/');
    };
  
    return (
            <Container>
            <br/>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Form submitted successfully!</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Cientificos descubren algo inedito"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    required
                    />
                </Form.Group>
                <br/>

                <Form.Group controlId="formName">
                    <Form.Label>Copete</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Cientificos encuentran algo que te sorprendera!"
                    name="copete"
                    value={formData.copete}
                    onChange={handleChange}
                    required
                    />
                </Form.Group>
                <br/>

                <Form.Group controlId="formCuerpo">
                    <Form.Label>Cuerpo</Form.Label>
                    <Form.Control
                    as="textarea"
                    rows={3}
                    name="cuerpo"
                    value={formData.cuerpo}
                    onChange={handleChange}
                    required
                    />
                </Form.Group>
                <br/>
        
                <Row>
                    <Col>
                        <Form.Group controlId="formCategory">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Control
                            as="select"
                            name="categoria"
                            value={formData.categoria}
                            onChange={handleChange}
                            required
                            >
                            <option value="">Categoría</option>
                            <option value="CIENCIA">Ciencia</option>
                            <option value="FARANDULA">Farandula</option>
                            <option value="EFEMERIDES">Efemerides</option>
                            <option value="OTROS">Otros</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formImage">
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control
                                type="file"
                                name="imagen"
                                onChange={handleChange}
                                accept="image/*"
                            />
                            {formData.imagen && <p>Selected Image: {formData.imagen}</p>}
                        </Form.Group>
                    </Col>
                </Row>
                <br/>
        
                <Button variant="primary" type="submit">
                    Enviar
                </Button>
            </Form>
        </Container>
    );
}

export default UploadUpdateProduct;
