import { View } from "react-native"
import AddCatch from "../components/AddCatch"

const AddCatchScreen = () => {
    return (
        <View style={styles.container}>
            <AddCatch />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default AddCatchScreen;