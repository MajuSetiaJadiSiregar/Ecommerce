import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/UserSlice'
import categoryReducer from './slice/CategorySlice'
import productReducer from './slice/ProductSlice'
import cartReducer from './slice/CartSlice'
import favoriteReducer from './slice/FavoriteSlice'
import splashReducer from './slice/SplashSlice'

export const store = configureStore({
    reducer: {
        splash : splashReducer,
        user: userReducer,
        category : categoryReducer,
        product : productReducer,
        cart : cartReducer,
        favorite : favoriteReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch