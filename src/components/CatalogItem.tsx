import React, { useCallback }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../store';
import { addProductToCartRequest } from '../store/modules/cart/actions';
import { IProduct } from '../store/modules/cart/types';

// import { Container } from './styles';

interface CatalogItemProps {
  product: IProduct
}

const CatalogItem: React.FC<CatalogItemProps> = ({product}) => {
 const dispath = useDispatch();

 const hasFailedStockCheck = useSelector<IState, boolean>(state =>{
   return state.cart.failedStockCheck.includes(product.id);
 });

  const HandleAddProductToCart = useCallback(() => {
    dispath(addProductToCartRequest(product));
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

  {  hasFailedStockCheck &&  <span style={{ color: 'red' }}>Falta de Estoque</span> }
    </article>
 );
}

export default CatalogItem;