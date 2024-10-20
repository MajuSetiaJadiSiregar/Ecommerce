import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '..'
import { Endpoint } from '../../utils'
import AsyncStorage from '@react-native-async-storage/async-storage';


export interface Product {
    id: number
    title: string;
    brand: string;
    thumbnail: string;
    price: number,
    rating: number,
    description: string
}

interface ProductState {
    products: Product[];
    product: Product;
    isLoading: boolean;
}

const initialState: ProductState = {
    products: [],
    product: {
        id: 0,
        title: '',
        brand: '',
        thumbnail: '',
        price: 0,
        rating: 0,
        description: ''
    },
    isLoading: false
};


export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {

        getProduct: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },

        getProductById: (state, action: PayloadAction<Product>) => {
            state.product = action.payload;
        },

        getProductReset: (state) => {
            state.products = [] as Product[];
        },

        handleLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },

    },
})

// Action creators are generated for each case reducer function
export const { getProduct, getProductById, getProductReset, handleLoading } = productSlice.actions

export default productSlice.reducer;


export const ReadProduct = (category: string = 'beauty') => {
    return async (dispatch: AppDispatch) => {
        dispatch(handleLoading(true));
        try {
            let res = await fetch(`${Endpoint}/products/category/${category}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            let response = await res.json();
            dispatch(getProduct(response.products))
            dispatch(handleLoading(false));
        } catch (error) {
            console.log(error);
        }
    }
}

export const ReadProductById = (id: number) => {
    return async (dispatch: AppDispatch) => {
        dispatch(handleLoading(true));
        try {
            let res = await fetch(`${Endpoint}/products/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            let response = await res.json();
            dispatch(getProductById({ title: response.title, brand: response.brand, id: response.id, thumbnail: response.thumbnail, price: response.price, rating: response.rating, description: response.description }));
            dispatch(handleLoading(false));
        } catch (error) {
            console.log(error);
            dispatch(handleLoading(false));
        }
    }
}


export const ReadProductBySearch = (search: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(handleLoading(true));
        try {
            let res = await fetch(`${Endpoint}/products/search?q=${search}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            let response = await res.json();
            dispatch(getProduct(response.products));
            dispatch(handleLoading(false));
        } catch (error) {
            console.log(error);
            dispatch(handleLoading(false));
        }
    }
}
