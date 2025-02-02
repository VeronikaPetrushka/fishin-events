import { View } from "react-native"
import GameMenu from "../components/GameMenu"

const GameMenuScreen = () => {
    return (
        <View style={styles.container}>
            <GameMenu />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default GameMenuScreen;