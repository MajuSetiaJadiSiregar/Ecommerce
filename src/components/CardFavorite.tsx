import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { color } from "../utils/color";
import { fontSize, size, spacing } from "../utils/size";
import { fonts } from "../utils/fonts";
import { Product } from "../store/slice/ProductSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/root";
import ButtonAction from "./ButtonAction";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Cart } from "../store/slice/CartSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { DeleteFavorite } from "../store/slice/FavoriteSlice";



interface FavoriteProps {
    item: Product;
}
const FavoriteCard = ({ item }: FavoriteProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const dispatch = useDispatch<AppDispatch>()


    return (
        <TouchableOpacity
            style={styles.container}
        >
            <View style={styles.imageWrapper}>
                <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
            </View>
            {/* content like name price */}
            <View style={styles.contentContainer}>
                <Text style={styles.name} numberOfLines={1}>
                    {item.title}
                </Text>
                <Text style={styles.brand}>$ {item.price}</Text>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                    <Text style={styles.price}>${item.price}</Text>
                    <TouchableOpacity onPress={() => {
                        dispatch(DeleteFavorite(item.id))
                    }}>
                        <AntDesign name='delete' size={24} color={color.primary} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default FavoriteCard;

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
        paddingBottom: spacing.sm
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