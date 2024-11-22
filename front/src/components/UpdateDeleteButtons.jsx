import React from 'react';

import { Button } from 'react-bootstrap';

const deleteProduct = async (productId) => {
  const params = new URLSearchParams();
  if (productId) params.append('id_noticia', productId);

  const response = await fetch(`${process.env.REACT_APP_API_URL}/noticias_borrar.php?${params.toString()}`, 
      {
          method: "DELETE",
          headers: {
              'Content-Type': 'application/json'
          }
      }
  );
  
  if (response.status < 200 || response.status >= 300) {
      throw new Error('Ha ocurrido un error');
  }
}

const UpdateDeleteButtons = ({productId}) => {
  const handleDelete = async (e) => {
    try {
      await deleteProduct(productId);
    } catch (err) {
      console.log(err.message);
      return;
    }

    window.location.reload();
  }

  return (
    <div>
      <Button variant="primary" className="btn-sm" href={`/upload?product_id=${productId}`}>
          Editar
      </Button>
      <Button variant="danger" className="btn-sm ms-1" onClick={handleDelete}>
          Eliminar
      </Button>
    </div>  
  );
}

export default UpdateDeleteButtons;