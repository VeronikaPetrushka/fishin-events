import React, { useState } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity, Text, TextInput, Image, ScrollView } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import Icons from "./Icons";

const { height } = Dimensions.get('window');

const AddCatch = ({ item }) => {
    const navigation = useNavigation();
    const [image, setImage] = useState(item?.image);
    const [name, setName] = useState(item?.name);
    const [length, setLength] = useState(item?.length);
    const [weight, setWeight] = useState(item?.weight);
    const [location, setLocation] = useState(item?.location);
    const [tackle, setTackle] = useState(item?.tackle);
    const [date, setDate] = useState(item?.date);
    const [description, setDescription] = useState(item?.description);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleImageSelect = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel && !response.error && response.assets) {
                setImage(response.assets[0].uri);
            }
        });
    }; 

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
    
        if (selectedDate) {
    
            const day = selectedDate.getDate().toString().padStart(2, '0');
            const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
            const year = selectedDate.getFullYear();
    
            const formattedDate = `${day}.${month}.${year}`;

            setDate(formattedDate)

        }
    };    

    const handleSave = async () => {
        if (!image || !name || !length || !weight || !location || !tackle || !date || !description) {
            alert('Please fill out all fields to proceed.');
            return;
        }
    
        const newCatch = {
            name,
            length,
            weight,
            location,
            tackle,
            date,
            description,
            image
        };
    
        try {
            const storedCatches = await AsyncStorage.getItem('catches');
            let catchesArray = storedCatches ? JSON.parse(storedCatches) : [];
    
            if (item) {
                catchesArray = catchesArray.map(catchItem =>
                    catchItem.name === item.name ? newCatch : catchItem
                );
            } else {
                catchesArray.push(newCatch);
            }
    
            await AsyncStorage.setItem('catches', JSON.stringify(catchesArray));
    
            console.log('Updated catches:', catchesArray);
    
            navigation.goBack();
    
            alert(item ? 'Your catch has been updated successfully!' : 'Your catch has been added successfully!');
                
        } catch (error) {
            console.error('Error saving your catch:', error);
            alert('Failed to save your catch. Please try again.');
        }
    };
    
    return (
        <LinearGradient
            colors={['#0088F0', '#015392']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <View style={styles.innerContainer}>

                <Text style={styles.title}>My Catches</Text>

                <ScrollView style={{width: '100%'}}>
                    <Text style={styles.title}>Add Catch</Text>

                    <View style={styles.card}>
                        <TouchableOpacity style={styles.cardImage} onPress={handleImageSelect}>
                            {image ? (
                                <>
                                    <Image source={{ uri: image }} style={styles.uploadedImage} />
                                </>
                            ) : (
                                    <View style={styles.add}>
                                        <Icons type={'image'} />
                                    </View>
                            )}
                        </TouchableOpacity>
                        <View style={styles.cardTextContainer}>
                            <Text style={styles.cardName} numberOfLines={1} ellipsizeMode="tail">{name}</Text>
                        </View>
                        <TouchableOpacity 
                            style={styles.cardBtn} 
                            onPress={handleSave}
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

                    <Text style={styles.label}>Name of the fish</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        placeholderTextColor="#999"
                        value={name}
                        onChangeText={setName}
                    />

                    <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexDirection: 'row'}}>
                        <View style={{width: '48%'}}>
                            <Text style={styles.label}>Weight</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType='numeric'
                                placeholder="Value"
                                placeholderTextColor="#999"
                                value={weight}
                                onChangeText={setWeight}
                            />
                        </View>
                        <View style={{width: '48%'}}>
                            <Text style={styles.label}>Length</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType='numeric'
                                placeholder="Value"
                                placeholderTextColor="#999"
                                value={length}
                                onChangeText={setLength}
                            />
                        </View>
                    </View>

                    <Text style={styles.label}>Location</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter the text..."
                        placeholderTextColor="#999"
                        value={location}
                        onChangeText={setLocation}
                    />

                    <Text style={styles.label}>Used tackle and bait</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter the text..."
                        placeholderTextColor="#999"
                        value={tackle}
                        onChangeText={setTackle}
                    />

                    <Text style={styles.label}>Date</Text>
                    <TouchableOpacity style={styles.inputContainer} onPress={() => setShowDatePicker(true)}>
                        <TextInput
                            style={[styles.input, {paddingLeft: 60}]}
                            placeholder="DD.MM.YYYY"
                            placeholderTextColor="#999"
                            value={date}
                            editable={false}
                        />
                        <View style={styles.dateIcon}>
                            <Icons type={'date'} />
                        </View>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={date ? new Date(date.split('.').reverse().join('-')) : new Date()} 
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={handleDateChange}
                            themeVariant="dark"
                            style={{marginTop: -50}}
                        />
                    )}

                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter the text..."
                        placeholderTextColor="#999"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                    />

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
        fontSize: 28,
        fontWeight: '800',
        color: '#fff',
        lineHeight: 33.41,
        marginBottom: 30
    },

    backText: {
        fontSize: 17,
        fontWeight: '400',
        color: '#fff',
        lineHeight: 22
    },

    label: {
        fontSize: 17,
        fontWeight: '400',
        color: '#fff',
        lineHeight: 20.3,
        marginBottom: 16
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 24
    },

    dateIcon: {
        width: 24,
        height: 24,
        position: 'absolute',
        top: 15,
        left: 20,
        zIndex: 10
    },

    input: {
        width: '100%',
        fontSize: 16,
        fontWeight: '400',
        color: '#fff',
        backgroundColor: '#015596',
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 16.5,
        marginBottom: 30
    },

    saveBtn: {
        width: '100%',
        padding: 13,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#222be6',
        borderRadius: 16,
        alignSelf: 'center',
        marginTop: 20
    },

    saveBtnText: {
        fontSize: 17,
        fontWeight: '600',
        color: '#fff',
        lineHeight: 22
    },

    savedNormContainer: {
        position: 'absolute',
        top: 170,
        alignSelf: 'center',
        alignItems: 'center'
    },

    card: {
        width: '100%',
        height: 140,
        borderRadius: 18,
        overflow: 'hidden',
        marginBottom: 24,
        borderWidth: 0.5,
        borderColor: 'rgba(0, 0, 0, 0.3)'
    },

    cardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center',
    },

    cardTextContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingVertical: 9,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },

    cardName: {
        fontWeight: '500',
        fontSize: 16,
        color: '#ffbe37',
        lineHeight: 22,
        width: '70%'
    },

    cardBtn: {
        width: 104,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        height: 36,
        position: 'absolute',
        top: 8,
        right: 8
    },

    cardBtnText: {
        fontWeight: '500',
        fontSize: 18,
        color: '#fff',
        lineHeight: 22
    },

    uploadedImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 12
    },

    add: {
        width: 72,
        height: 72
    },
    
});

export default AddCatch;