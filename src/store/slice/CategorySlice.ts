import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '..'
import { Endpoint } from '../../utils'
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Category {
    slug: string;
    name: string;
    url: string;
}

interface CategoryState {
    categories: Category[];
}

const initialState: CategoryState = {
    categories: [{slug : 'search', name : 'Search', url : ''}],
};


export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {

        getCategory: (state, action: PayloadAction<Category[]>) => {
            state.categories = [...state.categories, ...action.payload];
        },

    },
})

// Action creators are generated for each case reducer function
export const { getCategory } = categorySlice.actions

export default categorySlice.reducer;


export const ReadCategory = () => {
    return async (dispatch: AppDispatch) => {
        try {
            let res = await fetch(`${Endpoint}/products/categories`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            let response = await res.json();
            dispatch(getCategory(response))
            // console.log(response)
        } catch (error) {
            console.log(error);
        }
    }
}

