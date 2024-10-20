
import { StyleSheet, TextStyle, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { color } from "../utils/color";
import { size } from "../utils/size";

interface ButtonBackProps {
    onPress: () => void;
    style? : TextStyle
}


const ButtonBack = ({ onPress, style }: ButtonBackProps) => {

    return (
        <TouchableOpacity style={[styles.buttonBack, style]} onPress={onPress}>
            <Ionicons name={"arrow-back-outline"} color={color.white} size={25} />
        </TouchableOpacity>
    );
};

export default ButtonBack;

const styles = StyleSheet.create({
    buttonBack: {
        backgroundColor: color.secondary,
        height: 36,
        width: 36,
        borderRadius: size.radius,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 18
    }
});