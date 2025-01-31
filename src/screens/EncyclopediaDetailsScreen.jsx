import { View } from "react-native"
import EncyclopediaDetails from "../components/EncyclopediaDetails"
import Menu from "../components/Menu";

const EncyclopediaDetailsScreen = ({ route }) => {
    const { item } = route.params;

    return (
        <View style={styles.container}>
            <EncyclopediaDetails item={item} />
            <View style={styles.menu}>
                <Menu />
            </View>
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    },
    menu: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0
    }
}

export default EncyclopediaDetailsScreen;