import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Linking, Image} from "react-native"
import LinearGradient from 'react-native-linear-gradient';
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const Settings = () => {

    // change
    const handlePrivacyPolicy = () => {
        const url = 'https://www.termsfeed.com/live/d3e0f7af-2724-4df1-ab86-eb8d31c8046c';
        Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
    };    

    // change
    const handleRate = () => {
        const url = Platform.select({
            ios: 'https://apps.apple.com/us/app/rhodes-escape/id6741211670',
        });
    
        Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
    };

    return (
        <LinearGradient
            colors={['#0088F0', '#015392']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <View style={styles.innerContainer}>

                <Text style={styles.title}>Settings</Text>

                <View style={[styles.btn, {marginBottom: 40}]}>
                    <LinearGradient
                        colors={['#dc5320', '#ebb74d']}
                        style={styles.btn} 
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 0 }}
                    >
                        <Text style={styles.btnText}>Privacy Policy</Text>
                        <TouchableOpacity style={{width: 60, height: 60, marginRight: 6}} onPress={handlePrivacyPolicy}>
                            <Icons type={'button'} />
                        </TouchableOpacity>
                    </LinearGradient>
                </View>

                <View style={[styles.btn, {marginBottom: 40}]}>
                    <LinearGradient
                        colors={['#dc5320', '#ebb74d']}
                        style={styles.btn} 
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 0 }}
                    >
                        <Text style={styles.btnText}>Rate us</Text>
                        <TouchableOpacity style={{width: 60, height: 60, marginRight: 6}} onPress={handleRate}>
                            <Icons type={'button'} />
                        </TouchableOpacity>
                    </LinearGradient>
                </View>

            </View>
        </LinearGradient>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    innerContainer: {
        flex: 1,
        padding: 24,
        paddingTop: height * 0.07,
        paddingBottom: 70,
        zIndex: 10
    },

    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 24,
        fontWeight: '800',
        lineHeight: 24
    },

    btn: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: 24,
        height: 72
    },

    btnText: {
        fontWeight: '700',
        fontSize: 18,
        color: '#fff',
        marginLeft: 12
    },
    
});

export default Settings;