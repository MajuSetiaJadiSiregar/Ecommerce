import { TouchableOpacity, Text, StyleSheet, TextStyle } from 'react-native';
import { color } from '../utils/color';
import CustomText from './CustomText';
import { spacing } from '../utils/size';

interface ButtonActionProps {
    onPress: () => void; 
    style?: TextStyle;
    title : string,
    isLoading : boolean
}

const ButtonAction = ({ onPress, style, title, isLoading = false }: ButtonActionProps) => {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <CustomText size={18} color={color.white} style={{ textAlign: 'center', padding: 10 }}>{isLoading ? 'waitt' : title}</CustomText>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
  
        backgroundColor: color.primary,
        borderRadius: spacing.sm
    },
})
export default ButtonAction;