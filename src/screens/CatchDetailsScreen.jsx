import { View } from "react-native"
import CatchDetails from "../components/CatchDetails"
import Menu from "../components/Menu";

const CatchDetailsScreen = ({ route }) => {
    const { item } = route.params;

    return (
        <View style={styles.container}>
            <CatchDetails item={item} />
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

export default CatchDetailsScreen;