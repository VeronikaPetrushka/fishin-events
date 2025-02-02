import React, { useState, useCallback } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions, Image } from "react-native"
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const { height } = Dimensions.get('window');

const Home = () => {
    const navigation = useNavigation();
    const [catches, setCatches] = useState([]);

    const fetchCatches = async () => {
        try {
            const storedCatches = await AsyncStorage.getItem('catches');
            if (storedCatches !== null) {
                setCatches(JSON.parse(storedCatches));
            }
        } catch (error) {
            console.error("Error fetching catches from AsyncStorage", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchCatches();
        }, [])
    );

    return (
        <LinearGradient
            colors={['#0088F0', '#015392']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <View style={styles.innerContainer}>

                <Text style={styles.title}>My Catches</Text>

                <TouchableOpacity 
                    style={{width: '100%', height: 112, marginBottom: 20, alignSelf: 'center'}}
                    onPress={() => navigation.navigate('AddCatchScreen')}
                    >
                    <Image source={require('../assets/decor/add-btn.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{width: 243, height: 111, marginBottom: 38, alignSelf: 'center'}}
                    onPress={() => navigation.navigate('GameMenuScreen')}
                    >
                    <Image source={require('../assets/decor/game-btn.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}} />
                </TouchableOpacity>

                <Text style={styles.subTitle}>History</Text>

                <ScrollView style={{width: '100%'}}>
                    {
                        catches.length > 0 ? (
                            <View>
                                {
                                    catches.map((item, index) => (
                                        <View key={index} style={styles.card}>
                                            <Image source={{uri: item.image}} style={styles.cardImage} />
                                            <View style={styles.cardTextContainer}>
                                                <Text style={styles.cardName} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                                                <TouchableOpacity 
                                                    style={styles.cardBtn} 
                                                    onPress={() => navigation.navigate('CatchDetailsScreen', {item: item})}
                                                    >
                                                    <LinearGradient
                                                        colors={['#dc5320', '#ebb74d']}
                                                        style={styles.cardBtn} 
                                                        start={{ x: 1, y: 0 }}
                                                        end={{ x: 0, y: 0 }}
                                                    >
                                                        <Text style={styles.cardBtnText}>Open</Text>
                                                    </LinearGradient>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ))
                                }
                            </View>
                        ) : (
                            <View style={{width: '100%', alignItems: 'center'}}>
                                <Image source={require('../assets/onBoarding/1.png')} style={{width: 231, height: 172, resizeMode: 'contain', marginBottom: 18}} />
                                <Text style={[styles.title, {marginBottom: 8}]}>Empty</Text>
                                <Text style={styles.nothingText}>Add the first catch</Text>
                            </View>
                        )
                    }
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
        justifyContent: 'space-between',
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

    subTitle: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 24,
        fontWeight: '600',
        lineHeight: 22,
        opacity: 0.7
    },

    nothingText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '500',
        lineHeight: 22
    },

    card: {
        width: '100%',
        height: 140,
        borderRadius: 18,
        overflow: 'hidden',
        marginBottom: 24,
    },

    cardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    cardTextContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingVertical: 9,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },

    cardName: {
        fontWeight: '500',
        fontSize: 16,
        color: '#ffbe37',
        lineHeight: 22,
        width: '70%'
    },

    cardBtn: {
        width: 72,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        height: 22
    },

    cardBtnText: {
        fontWeight: '500',
        fontSize: 12,
        color: '#fff',
        lineHeight: 22
    },

    
});

export default Home;