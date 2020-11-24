import {all, call, select, takeLatest, put} from 'redux-saga/effects';
import { addProductToCartFailure, addProductToCartRequest, addProductToCartSuccess } from './actions';
import { IState } from '../..';
import { AxiosResponse } from 'axios';
import api from '../../../services/api';
import { ActionTypes } from './types';

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

interface IStockResponse{
  id: number;
  quantity: number;
}

function* checkProductStock({payload}: CheckProductStockRequest) {
  const { product } = payload;

  const currentQuantity: number = yield select((state: IState) => {
     return state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0;
  });

  const availableResponse: AxiosResponse<IStockResponse> = yield call(api.get, `stock/${product.id}`);

  if (availableResponse.data.quantity > currentQuantity){

    yield put(addProductToCartSuccess(product));
  } else {
    yield put(addProductToCartFailure(product.id));
  }

  console.log(currentQuantity);
  console.log('adicionou ao carrinho')
}


export default all([
takeLatest(ActionTypes.addProductToCartRequest, checkProductStock)
]);