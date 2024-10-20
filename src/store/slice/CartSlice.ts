import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '..'
import { Endpoint } from '../../utils'


export interface Cart {
    id: number
    title: string;
    thumbnail: string;
    price: number;
    quantity: number;

}

interface CartState {
    carts: Cart[]
    isLoading: boolean
    quantity: number
}

const initialState: CartState = {
    carts: [],
    isLoading: false,
    quantity: 0
};


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        getCart: (state, action: PayloadAction<Cart[]>) => {
            state.carts = action.payload;
        },
        handleLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },

        increment: (state) => {

            state.quantity = state.quantity + 1;
        },

        decrement: (state) => {
            if (state.quantity >= 1) {
                state.quantity = state.quantity - 1;
            }
        }

    },
})

export const { getCart, handleLoading, increment, decrement } = cartSlice.actions

export default cartSlice.reducer;


export const ReadCart = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(handleLoading(true));
        try {
            let res = await fetch(`${Endpoint}/carts/user/142`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            let response = await res.json();
            let data = response.carts[0].products;
            dispatch(getCart(data));
            dispatch(handleLoading(false));

        } catch (error) {
            console.log(error);
            dispatch(handleLoading(false));
        }
    }
}


