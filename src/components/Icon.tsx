import Ionicons from "react-native-vector-icons/Ionicons";
import { color } from "../utils/color";
// import { Colors } from "react-native/Libraries/NewAppScreen";

const Icon = ({ name }: { name: string | undefined }) => {
    if (!name) return null;
    return <Ionicons name={name} size={24} color={color.secondary} />;
};

export default Icon;