import React, { useEffect, useState } from "react";

// UI
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native";

import Feather from 'react-native-vector-icons/Feather';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { RootStackParamList } from "../navigation/root";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { ReadCategory } from "../store/slice/CategorySlice";
import { ReadProduct, ReadProductById } from "../store/slice/ProductSlice";
import ProductCard from "../components/CardProduct";
import { color } from "../utils/color";
import { fontSize, iconSize, spacing } from "../utils/size";
import { fonts } from "../utils/fonts";
import CartCard from "../components/CardCart";
import { ReadCart } from "../store/slice/CartSlice";
import Loading from "../components/Loading";
import CustomText from "../components/CustomText";




const CartView = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const dispatch = useDispatch<AppDispatch>()

    const { user } = useSelector((state: RootState) => state.user);
    const { carts, isLoading } = useSelector((state: RootState) => state.cart);
    // console.log(carts, 'abd')


    useEffect(() => {
        dispatch(ReadCart());
    }, [])
    return (
        <View style={[styles.body, { paddingBottom: 0 }]}>


            <CustomText font={fonts.Bold} size={fontSize.xl} color={color.black}>Hi, {user.firstName} your cart is waiting!</CustomText>
            {
                isLoading ? (<Loading />) : (
                    <ScrollView style={{ marginBottom: 100 }}>
                        <View style={styles.itemsView}>
                            {carts.length !== 0 &&
                                carts.map((item, index) => {
                                    return (
                                        <CartCard item={item} key={item.id} />
                                    );
                                })}

                            {!carts.length && (
                                <Text style={styles.info}>No items under this product yet.</Text>
                            )}
                        </View>
                    </ScrollView>
                )
            }
        </View>
    );
};



const styles = StyleSheet.create({
    body: {
        flex: 1,
        padding: 30,
        backgroundColor: color.white,
    },

    headline: {
        fontSize: fontSize.xxl,
        color: color.black,
        fontFamily: fonts.Bold,
    },

    info: {
        color: "#CBD5E0",
        fontSize: 15,
        textAlign: "center",
    },


    itemsView: {
        flexDirection: "row",
        flexWrap: "wrap",
        flex: 1,
        justifyContent: "space-between",
    },
});

export default CartView;