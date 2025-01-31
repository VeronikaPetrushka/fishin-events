import { View } from "react-native"
import Catches from "../components/Catches"
import Menu from "../components/Menu";

const CatchesScreen = () => {
    return (
        <View style={styles.container}>
            <Catches />
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

export default CatchesScreen;