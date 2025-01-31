import React, { useState } from "react"
import { View, Text,TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native"
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const OnBoarding = () => {
    const navigation = useNavigation();
    const [componentIndex, setComponentIndex] = useState(0);


    const handleButtonPress = () => {
        setComponentIndex((prevIndex) => (prevIndex + 1) % 3);

        if(componentIndex === 2) {
            navigation.navigate('HomeScreen')
        }
    };

    return (
        <LinearGradient
            colors={['#0088F0', '#015392']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >

            {
                componentIndex === 0 && 
                <Image source={require('../assets/onBoarding/1.png')} style={{width: '95%', height: height * 0.4, resizeMode: 'contain', marginTop: height * 0.1}} />
            }
            {
                componentIndex === 1 && 
                <Image source={require('../assets/onBoarding/2.png')} style={{width: '100%', height: 350, resizeMode: 'cover'}} />
            }
            {
                componentIndex === 2 && 
                <Image source={require('../assets/onBoarding/3.png')} style={{width: '100%', height: 300, resizeMode: 'cover'}} />
            }

            <View style={styles.infoContainer}>

                <Text style={styles.title}>
                    {componentIndex === 0 
                        ? 'Add your catch' 
                        : componentIndex === 1 
                        ? 'Look at the stats' 
                        : 'See the fish encyclopedia'}
                </Text>

                {
                    componentIndex === 0 && 
                    <Text style={styles.text}>Add detailed information about the fish you caught, location, date, weight and size, tackle, etc.</Text>
                }
                {
                    componentIndex === 1 && 
                    <Text style={styles.text}>See detailed statistics for the time period, how many fish you caught, weight</Text>
                }
                {
                    componentIndex === 2 && 
                    <Text style={styles.text}>Read a lot of useful information about different species of fish, the app will tell you which bait will work best</Text>
                }

                <View style={styles.dotsContainer}>
                    {[0, 1, 2].map((index) => (
                        <View 
                            key={index}
                            style={[
                                styles.dot,
                                componentIndex === index ? styles.activeDot : null
                            ]}
                        />
                    ))}
                </View>

                <TouchableOpacity style={styles.btn} onPress={handleButtonPress}>
                    <LinearGradient
                        colors={['#dc5320', '#ebb74d']}
                        style={styles.btn} 
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 0 }}
                    >
                        <Text style={styles.btnText}>Next</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>

        </LinearGradient>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    infoContainer: {
        width: '100%',
        padding: 35
    },

    title: {
        fontSize: 32,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: height * 0.03,
        lineHeight: 37,
        color: '#ffbe37'
    },

    text: {
        fontWeight: '600',
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        marginBottom: height * 0.03,
        lineHeight: 22
    },

    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: height * 0.03,
    },

    dot: {
        width: 10,
        height: 10,
        margin: 4,
        borderRadius: 5,
        backgroundColor: '#9c7940',
    },

    activeDot: {
        backgroundColor: '#ffbe37',
        width: 40
    },

    btn: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        height: 54
    },

    btnText: {
        fontWeight: '700',
        fontSize: 18,
        color: '#fff',
    },

})

export default OnBoarding;