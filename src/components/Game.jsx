import React, { useState, useEffect } from "react";
import { ImageBackground, View, Text, Image, TouchableOpacity, Dimensions, StyleSheet, Modal } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get("window");
const GAME_DURATION = 60;

const fishImages = [
  require("../assets/game/fish1.png"),
  require("../assets/game/fish2.png"),
  require("../assets/game/fish3.png"),
];

const bombImage = require("../assets/game/bomb.png");

const Game = () => {
  const navigation = useNavigation();
  const [record, setRecord] = useState(0);
  const [items, setItems] = useState([]);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isPaused, setIsPaused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const spawnItem = () => {
    if (isPaused) return;

    const isFish = Math.random() > 0.3;
    const image = isFish ? fishImages[Math.floor(Math.random() * fishImages.length)] : bombImage;
    const id = Math.random().toString();
    const position = {
        top: Math.random() * (height * 0.5) + height * 0.25, 
      left: Math.random() * (width * 0.8),
    };

    setItems((prevItems) => [...prevItems, { id, image, position, isFish }]);

    setTimeout(() => {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }, 3000);
  };

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(spawnItem, 1000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  useEffect(() => {
    if (timeLeft > 0 && !isPaused) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      endGame();
    }
  }, [timeLeft, isPaused]);

  const endGame = async () => {
    await saveRecord(record);
  };

  const saveRecord = async (newRecord) => {
    try {
      const existingRecords = await AsyncStorage.getItem('records');
      const records = existingRecords ? JSON.parse(existingRecords) : [];
      records.push(newRecord);
      await AsyncStorage.setItem('records', JSON.stringify(records));
    } catch (error) {
      console.error("Error saving record", error);
    }
  };

  const handlePressItem = (id, isFish) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    if (isFish) {
      setRecord((prevRecord) => prevRecord + 1);
    } else {
      setRecord(0);
    }
  };

  const handlePlay = () => {
    setItems([]);
    setRecord(0);
    setTimeLeft(GAME_DURATION);
    setIsPaused(false);
  };

  const openModal = () => {
    setIsPaused(true);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setIsPaused(false);
  };

  return (
    <ImageBackground source={require("../assets/back/game1.png")} style={{ flex: 1 }}>
      <View style={styles.container}>

        {
            timeLeft > 0 ? (
                <View style={{width: '100%', height: '100%'}}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity style={{ width: 120, height: 55 }} onPress={openModal}>
                            <Image source={require("../assets/decor/stop-btn.png")} style={{ width: "100%", height: "100%", resizeMode: "contain" }} />
                        </TouchableOpacity>
                        <ImageBackground source={require("../assets/decor/record-btn.png")} style={styles.recordContainer}>
                            <View style={styles.recordOverlay}>
                            <Text style={styles.recordText}>{record}</Text>
                            </View>
                        </ImageBackground>
                        </View>

                        <View style={{width: 178, height: 32, alignSelf: 'flex-end', alignItems: 'center'}}>
                            <Image source={require('../assets/game/progress.png')} style={{width: 41, height: 47, resizeMode: 'contain', position: 'absolute', zIndex: 2, left: -5, top: -3}} />
                            <View style={styles.progressBarContainer}>
                                <LinearGradient
                                    colors={['#dc5320', '#ebb74d']}
                                    style={[styles.progressBarFill, { width: `${(timeLeft / GAME_DURATION) * 100}%` }]}
                                    start={{ x: 1, y: 0 }}
                                    end={{ x: 0, y: 0 }}
                                />
                            </View>
                            <Text style={styles.timerText}>{timeLeft}s</Text>
                        </View>

                        {items.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => handlePressItem(item.id, item.isFish)}
                            style={[styles.item, { top: item.position.top, left: item.position.left }]}
                        >
                            <ImageBackground source={require('../assets/game/buble.png')} style={styles.bubbleContainer}>
                            <Image source={item.image} style={styles.itemImage} />
                            </ImageBackground>
                        </TouchableOpacity>
                        ))}
                </View>
            ) : (
                <View style={{width: '100%', height: '100%'}}>
                    <Text style={[styles.timerText, {fontSize: 36, lineHeight: 50, marginBottom: 30}]}>Game over</Text>
                    <ImageBackground source={require("../assets/decor/record-btn.png")} style={[styles.recordContainer, {alignSelf: 'center', marginBottom: 100}]}>
                        <View style={styles.recordOverlay}>
                        <Text style={styles.recordText}>{record}</Text>
                        </View>
                    </ImageBackground>

                    <TouchableOpacity 
                        style={{width: 200, height: 100, marginBottom: 50, alignSelf: 'center'}}
                        onPress={handlePlay}
                        >
                        <Image source={require('../assets/decor/play-btn.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{width: 200, height: 100, alignSelf: 'center'}}
                        onPress={() => navigation.goBack('')}
                        >
                        <Image source={require('../assets/decor/exit-btn.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}} />
                    </TouchableOpacity>

                </View>
            )
        }

        <Modal
            transparent={true}
            visible={modalVisible}
            animationType="fade"
            onRequestClose={closeModal}
            >
            <View style={styles.modalOverlay}>
                <ImageBackground source={require('../assets/decor/game-btn-box.png')} style={styles.modalContent}>
                    <TouchableOpacity
                        style={{ width: 161, height: 57, alignSelf: "center" }}
                        onPress={closeModal}
                    >
                        <Image source={require("../assets/decor/play-btn.png")} style={{ width: "100%", height: "100%", resizeMode: "contain" }} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ width: 161, height: 57, alignSelf: "center" }}
                        onPress={() => navigation.goBack("")}
                    >
                        <Image source={require("../assets/decor/exit-btn.png")} style={{ width: "100%", height: "100%", resizeMode: "contain" }} />
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        </Modal>

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 24,
    paddingTop: height * 0.07,
  },

  headerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  recordContainer: {
    width: 124,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#fff",
    resizeMode: "cover",
    overflow: "hidden",
  },

  recordOverlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },

  recordText: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "900",
    lineHeight: 38.75,
  },

  progressBarContainer: {
    height: '100%',
    backgroundColor: '#0088F0',
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#0088F0',
  },

  progressBarFill: {
    height: '100%',
  },

  timerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 29.09,
    marginTop: 4,
  },

  item: {
    position: "absolute",
    zIndex: 10
  },

  itemImage: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },

  bubbleContainer: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center'
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    width: 340,
    height: 230,
    padding: 50,
    alignItems: "center",
    justifyContent: 'space-between',
    resizeMode: 'contain'
  },
  
});

export default Game;