import React, { useState } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity, Text, Image, ScrollView } from "react-native"
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get('window');

const EncyclopediaDetails = ({ item }) => {
    const navigation = useNavigation();
    const [componentIndex, setComponentIndex] = useState(0);

    const handleScroll = (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / width);
        setComponentIndex(index);
    };

    return (
        <LinearGradient
            colors={['#0088F0', '#015392']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <View style={styles.innerContainer}>

                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    style={{ height: 320 }}
                >
                    {item.image.map((img, index) => (
                        <Image key={index} source={img} style={styles.image} />
                    ))}
                </ScrollView>

                <View style={{width: '100%', position: 'absolute', top: 138, alignItems: 'center', borderBottomRightRadius: 28, borderBottomLeftRadius: 28, overflow: 'hidden'}}>
                    <View style={styles.dotsContainer}>
                        {item.image.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    componentIndex === index ? styles.activeDot : null,
                                ]}
                            />
                        ))}
                    </View>
                    <View style={styles.cardTextContainer}>
                        <Text style={styles.cardName}>{item.name}</Text>
                        <TouchableOpacity 
                            style={styles.cardBtn} 
                            onPress={() => navigation.goBack('')}
                            >
                            <LinearGradient
                                colors={['#dc5320', '#ebb74d']}
                                style={styles.cardBtn} 
                                start={{ x: 1, y: 0 }}
                                end={{ x: 0, y: 0 }}
                            >
                                <Text style={styles.cardBtnText}>Back</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView style={{width: '100%', paddingHorizontal: 27, marginTop: 50}}>

                    <Text style={styles.description}>{item.description}</Text>


                    <View style={{height: 50}} />

                </ScrollView>

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
        paddingBottom: 70,
        zIndex: 10
    },

    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#fff',
        lineHeight: 33.41,
        marginBottom: 30
    },

    description: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        lineHeight: 22,
        textAlign: 'center',
    },

    image: {
        width: width,
        height: '100%',
        resizeMode: 'cover',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },

    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        alignSelf: 'center'
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
        width: 40,
    },

    cardTextContainer: {
        width: '100%',
        paddingVertical: 27,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },

    cardName: {
        fontWeight: '600',
        fontSize: 24,
        color: '#ffbe37',
        lineHeight: 22,
    },

    cardBtn: {
        width: 104,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        height: 36
    },

    cardBtnText: {
        fontWeight: '500',
        fontSize: 18,
        color: '#fff',
        lineHeight: 22
    },
    
});

export default EncyclopediaDetails;