import { Link } from "react-router-dom";
import styled from "styled-components";

export const decodeToken = (token) => {
    if (!token) return null;
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
};

// Styled Component for active nav-link
export const NavLink = styled(Link)`
  &.active {
    border-bottom: 2px solid rgb(240, 248, 255);
  }
`;

export const getProduct = async (productId) => {
  const params = new URLSearchParams();
  if (productId) params.append('id_noticia', productId);

  const response = await fetch(`${process.env.REACT_APP_API_URL}/ver_noticia.php?${params.toString()}`);

  if (!response.ok) {
      throw new Error('Lo sentimos, ha ocurrido un error');
  }

  return response.json();
};
