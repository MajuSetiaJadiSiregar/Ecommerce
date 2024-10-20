import { createSlice, current } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'


interface TextSplash {

    image: string;
    title: string;
    description: string;

}

interface SpalshState {
    text: TextSplash[]
    currentImage: number
}

const initialState: SpalshState = {
    text: [
        {
            image: require("../../assets/search.jpg"),
            title: "Easy To Search",
            description: "Find your favorite products quickly and effortlessly with our advanced search features designed for a seamless shopping experience."
        },
        {
            image: require("../../assets/access.jpg"),
            title: "Easy To Access",
            description: "Access a vast range of products anytime, anywhere, ensuring you can shop at your convenience without any barriers."
        },
        {
            image: require("../../assets/manage.jpg"),
            title: "Easy To Manage",
            description: "Manage your orders and preferences effortlessly, keeping track of your shopping history and favorite items all in one place."
        }
    ],

    currentImage: 0
};


export const splashSlice = createSlice({
    name: 'splash',
    initialState,
    reducers: {
        next: (state) => {
            state.currentImage = state.currentImage > 2 ? 2 : state.currentImage + 1;
        },

        prev : (state) => {
            state.currentImage = state.currentImage <= 0 ? 0 : state.currentImage - 1;
        }
    },
})

export const {next, prev } = splashSlice.actions

export default splashSlice.reducer;



