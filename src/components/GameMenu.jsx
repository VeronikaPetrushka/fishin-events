import React, { useState, useEffect } from 'react';
import { ImageBackground, View, Text, Image, TouchableOpacity, Dimensions, StyleSheet } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const GameMenu = () => {
    const navigation = useNavigation();
    const [highestRecord, setHighestRecord] = useState(0);

    useEffect(() => {
      const getHighestRecord = async () => {
        try {
          const records = await AsyncStorage.getItem("records");
          if (records) {
            const parsedRecords = JSON.parse(records);
            const maxRecord = Math.max(...parsedRecords, 0);
            setHighestRecord(maxRecord);
          }
        } catch (error) {
          console.error("Error retrieving records:", error);
        }
      };
  
      getHighestRecord();
    }, []);

    return (
        <ImageBackground source={require('../assets/back/game1.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <Text style={styles.title}>Your record</Text>
                <ImageBackground source={require('../assets/decor/record-btn.png')} style={styles.recordContainer} >
                    <View style={{width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.recordText}>{highestRecord}</Text>
                    </View>
                </ImageBackground>

                <TouchableOpacity 
                    style={{width: 244, height: 112, marginBottom: 50, marginTop: height * 0.19, alignSelf: 'center'}}
                    onPress={() => navigation.navigate('GameScreen')}
                    >
                    <Image source={require('../assets/decor/fishing-btn.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{width: 244, height: 112, alignSelf: 'center'}} 
                    onPress={() => navigation.goBack('')}
                    >
                    <Image source={require('../assets/decor/back-btn.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}} />
                </TouchableOpacity>

            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 24,
        paddingTop: height * 0.07
    },

    title: {
        fontSize: 24,
        color: '#fff',
        fontWeight: '900',
        lineHeight: 29,
        marginBottom: 13
    },

    recordContainer: {
        width: 124,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 22,
        borderWidth: 2,
        borderColor: '#fff',
        resizeMode: 'cover',
        overflow: 'hidden'
    },

    recordText: {
        fontSize: 32,
        color: '#fff',
        fontWeight: '900',
        lineHeight: 38.75,
    }
});

export default GameMenu;