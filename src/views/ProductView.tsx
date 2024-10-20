import React, { useEffect, useState } from "react";

import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, BackHandler } from "react-native";

import Feather from 'react-native-vector-icons/Feather';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { RootStackParamList } from "../navigation/root";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { ReadCategory } from "../store/slice/CategorySlice";
import { getProductReset, ReadProduct, ReadProductById, ReadProductBySearch } from "../store/slice/ProductSlice";
import ProductCard from "../components/CardProduct";
import { color } from "../utils/color";
import { fontSize, iconSize, spacing } from "../utils/size";
import { fonts } from "../utils/fonts";
import CustomText from "../components/CustomText";
import Loading from "../components/Loading";




const ProductView = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { categories } = useSelector((state: RootState) => state.category);
    const { products, isLoading } = useSelector((state: RootState) => state.product);
    const [active, setActive] = useState(1);
    const dispatch = useDispatch<AppDispatch>();
    const [isSearch, setIsSearch] = useState(false);
    const [search, setSearch] = useState('');


    useEffect(() => {
        dispatch(ReadCategory());
        dispatch(ReadProduct())
    }, []);

    useEffect(() => {
        const backAction = () => {

            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);
    return (
        <View style={[styles.body, { paddingBottom: 0 }]}>

            <CustomText font={fonts.Bold} size={fontSize.xl} color={color.black}>Discover Your Perfect Item Today!</CustomText>
            <View style={styles.mainInputContainer}>

                <View style={styles.inputWrapper}>

                    <Image
                        source={require("../assets/loop.png")}
                        style={styles.logo}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Search Product"
                        placeholderTextColor={color.placeholderText}
                        value={search}
                        onChangeText={(value) => setSearch(value)}
                    />
                </View>

                <View style={styles.categoryContainer}>
                    <TouchableOpacity onPress={() => {
                        dispatch(ReadProductBySearch(search.toLowerCase()))
                    }}>

                        <Image
                            source={require("../assets/category.png")}
                            style={styles.logo}
                        />
                    </TouchableOpacity>
                </View>
            </View>





            <View style={styles.categoryView}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                    {categories.map((category, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={styles.category}
                                onPress={() => {
                                    setActive(index);

                                    console.log(category.slug === 'search')

                                    if (category.slug === 'search') {
                                        setIsSearch(true);
                                        dispatch(getProductReset())
                                    } else {
                                        setIsSearch(false);
                                        dispatch(ReadProduct(category.slug))
                                    }
                                }}
                            >
                                <Text
                                    style={[
                                        styles.categoryText,
                                        active === index && styles.activeCategory,
                                    ]}
                                >
                                    {category.name}
                                </Text>
                                {active === index && <View style={styles.activeBorder} />}
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            {
                isLoading ? (
                    <Loading />
                ) : (
                    <ScrollView style={{ marginBottom: 100 }}>
                        <View style={styles.itemsView}>
                            {products.length !== 0 &&
                                products.map((item, index) => {
                                    return (
                            
                                        <ProductCard item={item} key={item.id} />
                                    );
                                })}

                            {(!products.length && !isSearch) && (
                                <Text style={styles.info}>No items under this product yet.</Text>
                            )}

                            {
                                isSearch && (
                                    <View>
                                        <CustomText size={18} color={color.primary} font={fonts.SemiBold}>Please Search your product</CustomText>
                                    </View>
                                )
                            }
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
    container: {
        backgroundColor: color.white,
    },
    headline: {
        fontSize: fontSize.xxl,
        color: color.black,
        fontFamily: fonts.Bold,
    },
    mainInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: spacing.xl,
    },
    inputWrapper: {
        flex: 1,
        borderWidth: 2,
        flexDirection: "row",
        alignItems: "center",
        borderColor: color.placeholderText,
        borderRadius: 44,
        paddingHorizontal: spacing.md,
    },
    logo: {
        height: iconSize.md,
        width: iconSize.md,
    },
    textInput: {
        flex: 1,
        paddingHorizontal: spacing.md,
        fontSize: fontSize.md,
        fontFamily: fonts.Medium,
    },
    categoryContainer: {
        paddingHorizontal: spacing.sm,
    },

    categoryText: {
        color: "#CBD5E0",
        fontWeight: "600",
    },

    activeCategory: {
        color: "#1A202C",
        fontWeight: 'bold',
        paddingBottom: 5,
    },

    category: {
        paddingRight: 25,
        paddingVertical: 5,
    },

    activeBorder: {
        backgroundColor: color.primary,
        height: 3,
        width: 28,
        marginRight: "auto",
        marginLeft: "auto",
        borderRadius: 20,
    },

    info: {
        color: "#CBD5E0",
        fontSize: 15,
        textAlign: "center",
    },

    categoryView: {
        marginBottom: 20,
    },
    itemsView: {
        flexDirection: "row",
        flexWrap: "wrap",
        flex: 1,
        justifyContent: "space-between",
    },
});

export default ProductView;