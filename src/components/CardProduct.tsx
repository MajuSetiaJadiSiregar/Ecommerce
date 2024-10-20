import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { color } from "../utils/color";
import { fontSize, spacing } from "../utils/size";
import { fonts } from "../utils/fonts";
import { Product } from "../store/slice/ProductSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/root";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { CreateFavorite } from "../store/slice/FavoriteSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';



interface ProductProps {
    item: Product;
}
const ProductCard = ({ item }: ProductProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const dispatch = useDispatch<AppDispatch>()

    const CreateFavorit = async (favorite : Product) => {
        try {
            let dataString = await AsyncStorage.getItem('favorite');
            let data: Product[] = dataString ? JSON.parse(dataString) : [];

            const isExists = data.some(product => product.id === favorite.id);
            if(isExists) {
                Alert.alert(
                    'Product Already Exists'
                  );
            } else {
                data.push(favorite);
                await AsyncStorage.setItem('favorite', JSON.stringify(data));
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                navigation.navigate("productdetail", {
                    productId: item.id
                })
            }}
        >
            <View style={styles.imageWrapper}>
                <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
            </View>
            {/* content like name price */}
            <View style={styles.contentContainer}>
                <Text style={styles.name} numberOfLines={1}>
                    {item.title}
                </Text>
                <Text style={styles.brand}>{item.brand}</Text>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                    <Text style={styles.price}>${item.price}</Text>
                    <TouchableOpacity onPress={() => {
                        // dispatch(CreateFavorite(item))
                        CreateFavorit(item);
                    }}>
                        <AntDesign name='heart' size={24} color={color.primary} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    container: {
        width: "48%",
        elevation: 5,
        backgroundColor: color.background,
        borderRadius: 12,
        marginVertical: spacing.md,
    },
    imageWrapper: {
        borderRadius: 12,
        backgroundColor: color.secondary,
        margin: spacing.sm,
    },
    productImage: {
        height: 120,
        width: "100%",
        resizeMode: "center",
    },
    contentContainer: {
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.md,
    },
    name: {
        color: color.black,
        fontSize: fontSize.md,
        fontFamily: fonts.SemiBold,
    },
    brand: {
        color: color.gray,
        fontSize: fontSize.sm,
        fontFamily: fonts.Medium,
        paddingVertical: spacing.xs,
    },
    price: {
        color: color.purple,
        fontSize: fontSize.md,
        fontFamily: fonts.Medium,
    },
});