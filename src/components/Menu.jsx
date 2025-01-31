import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';

const Menu = () => {
    const navigation = useNavigation();
    const [activeButton, setActiveButton] = useState('HomeScreen');

    const handleNavigate = (screen) => {
        setActiveButton(screen);
        navigation.navigate(screen)
    };    

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const currentRoute = navigation.getState().routes[navigation.getState().index].name;
            setActiveButton(currentRoute);
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>

                <TouchableOpacity 
                    style={[ activeButton === 'HomeScreen' ? styles.activeButton : styles.button ]} 
                    onPress={() => handleNavigate('HomeScreen')}>
                        {
                            activeButton === 'HomeScreen' ? (
                                <LinearGradient
                                    colors={['#dc5320', '#ebb74d']}
                                    style={styles.activeButton} 
                                    start={{ x: 1, y: 0 }}
                                    end={{ x: 0, y: 0 }}
                                >
                                    <View style={{width: 28, height: 28}}>
                                        <Icons type={'1'} active={activeButton === 'HomeScreen'}/>
                                    </View>
                                </LinearGradient>        
                            ) : (
                                <View style={{width: 28, height: 28}}>
                                    <Icons type={'1'} active={activeButton === 'HomeScreen'}/>
                                </View>
                            )
                        }
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[ activeButton === 'CatchesScreen' ? styles.activeButton : styles.button ]} 
                    onPress={() => handleNavigate('CatchesScreen')}>
                        {
                            activeButton === 'CatchesScreen' ? (
                                <LinearGradient
                                    colors={['#dc5320', '#ebb74d']}
                                    style={styles.activeButton} 
                                    start={{ x: 1, y: 0 }}
                                    end={{ x: 0, y: 0 }}
                                >
                                    <View style={{width: 28, height: 28}}>
                                        <Icons type={'2'} active={activeButton === 'CatchesScreen'}/>
                                    </View>
                                </LinearGradient>        
                            ) : (
                                <View style={{width: 28, height: 28}}>
                                    <Icons type={'2'} active={activeButton === 'CatchesScreen'}/>
                                </View>
                            )
                        }
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[ activeButton === 'EncyclopediaScreen' ? styles.activeButton : styles.button ]} 
                    onPress={() => handleNavigate('EncyclopediaScreen')}>
                        {
                            activeButton === 'EncyclopediaScreen' ? (
                                <LinearGradient
                                    colors={['#dc5320', '#ebb74d']}
                                    style={styles.activeButton} 
                                    start={{ x: 1, y: 0 }}
                                    end={{ x: 0, y: 0 }}
                                >
                                    <View style={{width: 28, height: 28}}>
                                        <Icons type={'3'} active={activeButton === 'EncyclopediaScreen'}/>
                                    </View>
                                </LinearGradient>        
                            ) : (
                                <View style={{width: 28, height: 28}}>
                                    <Icons type={'3'} active={activeButton === 'EncyclopediaScreen'}/>
                                </View>
                            )
                        }
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[ activeButton === 'SettingsScreen' ? styles.activeButton : styles.button ]} 
                    onPress={() => handleNavigate('SettingsScreen')}>
                        {
                            activeButton === 'SettingsScreen' ? (
                                <LinearGradient
                                    colors={['#dc5320', '#ebb74d']}
                                    style={styles.activeButton} 
                                    start={{ x: 1, y: 0 }}
                                    end={{ x: 0, y: 0 }}
                                >
                                    <View style={{width: 28, height: 28}}>
                                        <Icons type={'4'} active={activeButton === 'SettingsScreen'}/>
                                    </View>
                                </LinearGradient>        
                            ) : (
                                <View style={{width: 28, height: 28}}>
                                    <Icons type={'4'} active={activeButton === 'SettingsScreen'}/>
                                </View>
                            )
                        }
                </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        alignSelf: 'center',
    },
    
    button: {
        width: 76,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },

    activeButton: {
        width: 76,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        marginBottom: 20,
    }

});

export default Menu;
