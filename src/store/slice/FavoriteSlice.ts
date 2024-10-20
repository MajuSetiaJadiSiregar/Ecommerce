import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '..'
import { Endpoint } from '../../utils'
import { Product } from './ProductSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';




interface FavoriteState {
    favorites: Product[]
}

const initialState: FavoriteState = {
    favorites: []
};


export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {

        getFavorite: (state, action: PayloadAction<Product[]>) => {
            state.favorites = action.payload;
        }

    },
})

export const { getFavorite } = favoriteSlice.actions

export default favoriteSlice.reducer;


export const ReadFavorite = () => {
    return async (dispatch: AppDispatch) => {
        try {
            let dataString = await AsyncStorage.getItem('favorite');
            let data: Product[] = dataString ? JSON.parse(dataString) : [];
            dispatch(getFavorite(data));

        } catch (error) {
            console.log(error);
        }
    }
}

export const CreateFavorite = (favorite: Product) => {
    return async () => {
        try {
            let dataString = await AsyncStorage.getItem('favorite');
            let data: Product[] = dataString ? JSON.parse(dataString) : [];
            data.push(favorite);
            await AsyncStorage.setItem('favorite', JSON.stringify(data));
        } catch (error) {
            console.log(error);
        }
    }
};


export const DeleteFavorite = (id:number) => {
    return async (dispatch: AppDispatch) => {
        try {
            let dataString = await AsyncStorage.getItem('favorite');
            let data: Product[] = dataString ? JSON.parse(dataString) : [];
            
            let favorites = data.filter(item => item.id !== id)
            dispatch(getFavorite(favorites));

            await AsyncStorage.setItem('favorite', JSON.stringify(favorites));
        } catch (error) {
            console.log(error);
        }
    }
};





