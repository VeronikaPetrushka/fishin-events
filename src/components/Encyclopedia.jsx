import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions, Image } from "react-native"
import { useNavigation } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient';
import encyclopedia from '../constants/encyclopedia.js'

const { height } = Dimensions.get('window');

const Encyclopedia = () => {
    const navigation = useNavigation();

    return (
        <LinearGradient
            colors={['#0088F0', '#015392']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <View style={styles.innerContainer}>

                <Text style={styles.title}>Fish Encyclopedia</Text>

                <ScrollView style={{width: '100%'}}>
                    {
                        encyclopedia.map((item, index) => (
                            <View key={index} style={styles.card}>
                                <Image source={item.image[0]} style={styles.cardImage} />
                                <View style={styles.cardTextContainer}>
                                    <Text style={styles.cardName} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                                    <TouchableOpacity 
                                        style={styles.cardBtn} 
                                        onPress={() => navigation.navigate('EncyclopediaDetailsScreen', {item: item})}
                                        >
                                        <Text style={styles.cardBtnText}>Open</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
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
        height: 240,
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
        paddingVertical: 28,
        paddingHorizontal: 16,
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
        width: '60%'
    },

    cardBtn: {
        width: 110,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        height: 28,
        backgroundColor: '#fff'
    },

    cardBtnText: {
        fontWeight: '600',
        fontSize: 16,
        color: '#dc5320',
        lineHeight: 22
    },

    
});

export default Encyclopedia;