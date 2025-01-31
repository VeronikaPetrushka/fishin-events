import { View } from "react-native"
import Encyclopedia from "../components/Encyclopedia"
import Menu from "../components/Menu";

const EncyclopediaScreen = () => {
    return (
        <View style={styles.container}>
            <Encyclopedia />
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

export default EncyclopediaScreen;