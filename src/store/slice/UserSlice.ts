import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '..'
import { Endpoint } from '../../utils'


interface User {
    firstName: string
    lastName: string
    username : string
}

export interface UserState {

    user: User
    isLoading : boolean
}

const initialState: UserState = {

    user: {
        firstName: '',
        lastName: '',
        username : ''
    },
    isLoading : false
}

export const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {


        getUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },

        handleLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },

    },
})

// Action creators are generated for each case reducer function
export const { getUser, handleLoading } = counterSlice.actions

export default counterSlice.reducer


// export const UserLogin = async (username: string, password: string) => {
//     // return async (dispatch: AppDispatch) => {
//     try {


//         let res = await fetch(`${Endpoint}/auth/login`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 username: username,
//                 password: password
//             }),
//         });

//         let response = await res.json();
//         await AsyncStorage.setItem('accessToken', response.accessToken);

//         let user = await fetch(`${Endpoint}/auth/me`, {
//             headers: {
//                 'Authorization': `Bearer ${response.accessToken}`, // Pass JWT via Authorization header
//             },
//         });
//         let userResponse = await user.json();


//         // const navigation = useNavigation();
//         // console.log(userResponse)


//         return userResponse

//         /* providing accessToken in bearer */


//         // console.log(response);
//     } catch (error) {

//     }
//     // }
// }