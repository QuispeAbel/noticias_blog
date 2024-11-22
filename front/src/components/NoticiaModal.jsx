import React, {useState, useEffect, useCallback} from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { getProduct } from '../utils';

const NewsModal = ({ show, handleClose, id_noticia }) => {
    const [noticia, setNoticia] = useState({
        titulo: '',
        categoria: '',
        copete: '',
        cuerpo: '',
        imagen: null,
        fecha: '',
    });
    const [loading, setLoading] = useState(true);

    const fetchProduct = useCallback(async () => {
        setNoticia(await getProduct(id_noticia));
        setLoading(false);
    }, [show]);

    useEffect(() => {
        if(show) {
            fetchProduct();
        } else {
            setLoading(true);
        }
    }, [fetchProduct]);

    if(!show || loading) {
        return;
    }

    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{noticia.titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h5>{noticia.copete}</h5>
            <p>{noticia.cuerpo}</p>
            <img src={`/assets/noticias/${noticia.imagen}`} alt={noticia.copete} style={{ width: '100%' }} />
            <br/><br/>
            <div className="d-flex justify-content-end">
            {noticia.fecha} | {noticia.categoria}
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
        </Modal.Footer>
        </Modal>
    );
};

export default NewsModal;
