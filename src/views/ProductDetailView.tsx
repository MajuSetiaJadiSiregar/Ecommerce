import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { RootStackParamList } from "../navigation/root";
import { useEffect, useState } from "react";
import { ReadProductById } from "../store/slice/ProductSlice";
import ButtonBack from "../components/ButtonBack";
import { color } from "../utils/color";
import ButtonAction from "../components/ButtonAction";
import CustomText from "../components/CustomText";
import { fonts } from "../utils/fonts";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Loading from "../components/Loading";
import { decrement, increment } from "../store/slice/CartSlice";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'productdetail'>;

const ProductDetailView = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [fav, setFav] = useState(false);

    const { product, isLoading } = useSelector((state: RootState) => state.product);
    const {quantity} = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>()
    const route = useRoute<ProductDetailRouteProp>();
    const { productId } = route.params;


    useEffect(() => {
        dispatch(ReadProductById(productId));
    }, [])


    const prepareStars = (floorRate: number) => {
        // let floorRate = Math.floor(data.rating);
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            if (floorRate > 0 && i <= floorRate) {
                stars.push(<FontAwesome style={details.star} size={19} name="star" />);
            } else if (product.rating - floorRate >= 0.5) {
                stars.push(
                    <FontAwesome style={details.star} size={19} name="star-half-empty" />
                );
            } else {
                stars.push(
                    <FontAwesome style={details.star} size={19} name="star-o" />
                );
            }
        }
        return stars;
    };

    if (isLoading) {
        return <Loading />
    }

    return (
        <View style={details.body}>
            <ButtonBack onPress={() => { navigation.goBack() }} style={{ backgroundColor: color.primary }} />
            <Image style={details.image} source={{ uri: product.thumbnail }} onError={(e) => console.log(e)}/>
            <View style={details.detailsView}>
                <Image
                    source={require("../assets/overlay.png")}
                    style={details.overlayCurve}
                />

                <ScrollView>
                    <View style={details.pad}>
                        <View style={details.headView}>
                            <View >
                                <CustomText color={color.primary} size={35} font={fonts.Bold}>{product.title}</CustomText>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                            <View>
                                <CustomText size={18} font={fonts.Medium} color={color.secondary}>${product.price}</CustomText>

                            </View>

                            <View style={{ flexDirection: 'row', gap: 2 }}>

                                {prepareStars(product.rating).map((star, index) => {
                                    return <Text key={index}>{star}</Text>;
                                })}

                            </View>


                        </View>

                        <CustomText size={18} font={fonts.Bold} color={color.secondary}>{product.brand}</CustomText>
                        <CustomText size={18} font={fonts.SemiBold} color={color.black}>{product.description}</CustomText>



                        <View style={details.buttonView}>

                            <ButtonAction title="-" onPress={() => { dispatch(decrement())}} style={{ width: '13%' }} isLoading={false}/>
                            <ButtonAction title={`Add to Cart (${quantity})`} onPress={() => { }} style={{ width: '70%' }} isLoading={false} />
                            <ButtonAction title="+" onPress={() => {dispatch(increment())}} style={{ width: '13%' }}  isLoading={false}/>


                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};



const colors = {
    primary: "#fff",
    secondary: "#f0f0f0",
    alt: "#1A202C",
    placeholder: "#CBD5E0",
    black: "#0f0f0f",
    orange: "#ff8651",
};

export const basic = StyleSheet.create({
    body: {
        flex: 1,
        padding: 30,
        backgroundColor: colors.primary,
    },
    inputSection: {
        position: "relative",
        marginBottom: 25,
    },
    input: {
        backgroundColor: colors.secondary,
        height: 70,
        borderRadius: 20,
        paddingLeft: 70,
        fontSize: 17,
        color: colors.alt,
    },
    icon: {
        fontSize: 25,
        position: "absolute",
        top: 22.5,
        left: 22.5,
        color: colors.placeholder,
    },
    category: {
        paddingRight: 25,
        paddingVertical: 5,
    },
    categoryText: {
        color: colors.placeholder,
        fontWeight: "600",
    },
    activeCategory: {
        color: colors.alt,
        fontWeight: 'bold',
        paddingBottom: 5,
    },
    activeBorder: {
        backgroundColor: colors.orange,
        height: 3,
        width: 28,
        marginRight: "auto",
        marginLeft: "auto",
        borderRadius: 20,
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
    item: {
        width: (screenWidth - 85) / 2,
        height: 250,
    },
    itemImage: {
        width: (screenWidth - 85) / 2,
        height: 200,
        resizeMode: "cover",
        borderRadius: 20,
    },
    itemTitle: {
        fontWeight: "bold",
        fontSize: 17,
        paddingTop: 5,
    },
    itemSub: {
        fontSize: 12,
        color: colors.placeholder,
    },
    drop: {
        marginTop: 20,
    },
    info: {
        color: colors.placeholder,
        fontSize: 15,
        textAlign: "center",
    },
});

export const details = StyleSheet.create({
    body: {
        backgroundColor: color.secondary,
        flex: 1,
    },
    image: {
        width: screenWidth,
        height: screenHeight / 1.6,
        resizeMode: "cover",
    },
    detailsView: {
        padding: 30,
        backgroundColor: color.white,
        flex: 1,
        height: screenHeight / 1.9,
        width: screenWidth,
        resizeMode: "contain",
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        borderTopLeftRadius: 95,
    },
    overlayCurve: {
        height: 100,
        width: 100,
        position: "absolute",
        resizeMode: "cover",
        top: -100,
        right: 0,
    },
    pad: {
        padding: 15,
    },
    headView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
        // paddingHorizontal : 2
    },
    head: {
        fontSize: 35,
        fontWeight: "bold",
        color: colors.alt,
    },
    sub: {
        fontSize: 17,
    },
    price: {
        fontSize: 19,
        color: colors.orange,
        fontWeight: "bold",
    },
    rating: {
        paddingVertical: 10,
        fontSize: 13,
        paddingRight: 5,
    },
    ratingView: {
        flexDirection: "row",
        alignItems: "center",
    },
    star: {
        margin: 2,
        color: color.tertiary,
    },
    properties: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 20,
    },
    description: {
        fontSize: 13,
        paddingVertical: 10,
    },
    buttonView: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 25,
    },
    pay: {
        backgroundColor: colors.alt,
        width: (screenWidth - 90) * 0.68,
        padding: 25,
        borderRadius: 25,
        height: 75,
    },
    payText: {
        color: colors.primary,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 15,
    },
    heart: {
        backgroundColor: colors.secondary,
        width: (screenWidth - 90) * 0.28,
        padding: 25,
        borderRadius: 25,
        height: 75,
    },
    heartIcon: {
        color: colors.placeholder,
        textAlign: "center",
        fontSize: 28,
    },
    heartActive: {
        color: colors.orange,
    },
    value: {
        fontWeight: 'bold',
        fontSize: 15
    }
});

export default ProductDetailView;