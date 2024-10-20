
import { StyleSheet, TextInputProps, View, TextInput, TouchableOpacity } from "react-native";
import { color } from "../utils/color";
import { size } from "../utils/size";
import Icon from "./Icon";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";





interface InputProps extends TextInputProps {
    label: string;
    iconName?: string;
    secureTextEntry?: boolean;
    onPress? : () => void
}

const Input = ({ label, iconName, secureTextEntry = false, onPress, ...props }: InputProps) => {

    return (

        <View style={styles.container}>

            <Icon name={iconName} />
            <TextInput
                style={styles.textInput}
                placeholder={label}
                placeholderTextColor={color.secondary}
                secureTextEntry={secureTextEntry}

                {...props} // Meneruskan props tambahan
            />
            {
                secureTextEntry && (
                    <TouchableOpacity
                        onPress={onPress}>
                        <SimpleLineIcons name={"eye"} size={20} color={color.secondary} />
                    </TouchableOpacity>
                    // <SimpleLineIcons name={"eye"} size={20} color={color.secondary} />
                    // <Icon name="aye"/>
                )
            }
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: color.secondary,
        borderRadius: size.radius,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        padding: 2,
        marginVertical: 10,
    },

    textInput: {
        flex: 1,
        paddingHorizontal: 10,
    }
});

export default Input;