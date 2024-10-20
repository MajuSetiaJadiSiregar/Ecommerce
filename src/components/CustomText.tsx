import { Text, TextStyle } from "react-native";
import { fonts } from "../utils/fonts";

interface CustomTextProps {
    children: React.ReactNode; 
    style?: TextStyle;
    size : number;
    color : string;
    font? : string
}

const CustomText = ({children, style, size = 16, color = '#000', font = fonts.Regular} : CustomTextProps) => {

    return (
        <Text style={[{ fontSize: size, color: color, fontFamily : font }, style]}>{children}</Text>
    );
};

export default CustomText;