import React, { useCallback }  from 'react';
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../store/modules/cart/actions';
import { IProduct } from '../store/modules/cart/types';

// import { Container } from './styles';

interface CatalogItemProps {
  product: IProduct
}

const CatalogItem: React.FC<CatalogItemProps> = ({product}) => {
 const dispath = useDispatch();

  const HandleAddProductToCart = useCallback(() => {
    dispath(addProductToCart(product));
  }, [dispath, product]);
  
  return ( 
    <article >
      <strong>{product.title}</strong> {" - "}
      <span>{product.price}</span>  {" "}

       <button 
        type="button"
        onClick={HandleAddProductToCart}
       >
      Comprar
      </button>

    </article>
 );
}

export default CatalogItem;