import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Text, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Timer from './helpComp/Timer';
import Summary from './Summary';
import Constants from './helpComp/Constants';

const Level1N = ({ navigation }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [clickedFruit, setClickedFruit] = useState([]);
    const [done, setDone] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState(0);
    const [timeSpent, setTimeSpent] = useState(0);
    const [isRequestTime, setIsRequestTime] = useState(false);
    const [seconds, setSeconds] = useState(Constants.INITIAL_TIME);

    const images = [
        require('../images/level1N/apple.png'),
        require('../images/level1N/strawberry.png'),
        require('../images/level1N/papaya.png'),
        require('../images/level1N/banana.png'),
        require('../images/level1N/grapes.png'),
        require('../images/level1N/orange.png'),
    ];

    const initialData = ['Apple', 'Strawberry', 'Papaya', 'Banana', 'Grapes', "Orange"];

    const FRUIT_BUTTONS = [
        ['Orange', 'Banana'],
        ['Apple', 'Strawberry'],
        ['Papaya', 'Grapes'],
    ];

    useEffect(() => {
        const removeNSData = async () => {
            try {
                const exsChild = await AsyncStorage.getItem("existChild");
                if (exsChild != null && exsChild === 'true') {
                    // keys to remove
                    const keysToRemove = ['L1N', 'L1NTime', 'L2N', 'L2NTime'];

                    // wait for all removals to complete
                    await Promise.all(
                        keysToRemove.map(async (key) => {
                            await AsyncStorage.removeItem(key);
                            console.log(`${key} removed successfully`);
                        })
                    );
                } else {
                    const cb1 = await AsyncStorage.getItem("L1CB");     
                    const cb2 = await AsyncStorage.getItem("L2CB");
                    const cb3 = await AsyncStorage.getItem("L3CB");
                    const n1 = await AsyncStorage.getItem("L1N");
                    const n2 = await AsyncStorage.getItem("L2N");

                    if (cb1 !== null && cb2 !== null && cb3 !== null) {
                        // keys to remove
                        const keysToRemove = ['L1N', 'L1NTime', 'L2N', 'L2NTime'];

                        // wait for all removals to complete
                        await Promise.all(
                            keysToRemove.map(async (key) => {
                                await AsyncStorage.removeItem(key);
                                console.log(`${key} removed successfully`);
                            })
                        );
                    }
                    if (n1 !== null && n2 !== null) {
                        // keys to remove
                        const keysToRemove = ['L1CB', 'L1CBTime', 'L2CB', 'L2CBTime', 'L3CB', 'L3CBTime'];

                        // wait for all removals to complete
                        await Promise.all(
                            keysToRemove.map(async (key) => {
                                await AsyncStorage.removeItem(key);
                                console.log(`${key} removed successfully`);
                            })
                        );
                    }
                }
                console.log('Saved data removed successfully');
            } catch (error) {
                console.error('Error removing values:', error);
            }
        };
        removeNSData();
    }, []);

    useEffect(() => {
        console.log(clickedFruit);
        if (JSON.stringify(clickedFruit) !== JSON.stringify(initialData)) {
            console.log('Wrong');
        } else {
            console.log('Correct');
        }
        let count = 0;
        for (let i = 0; i < clickedFruit.length; i++) {
            if (clickedFruit[i] === initialData[i]) {
                count++;
            }
        }
        setIsRequestTime(true);
        setResult(count)
        console.log('Result ', count, '/', images.length);
    }, [clickedFruit]);

    useEffect(() => {
        if (done) {
            setTimeSpent(timeSpent === 0 ? Constants.INITIAL_TIME : (Constants.INITIAL_TIME - timeSpent));
            setSeconds(0);
        }
    }, [done]);

    const handleButtonClick = (fruit) => {
        if (currentImageIndex == (images.length - 1)) {
            setDone(true);
        }
        if (progress < 100) {
            setProgress(prevProgress => prevProgress + (100 / images.length));
        }
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
        setClickedFruit((prevClickedFruit) => [...prevClickedFruit, fruit]);
    };

    // const tryAgain = () => {
    //     setDone(false);
    //     setSeconds(initialSeconds);
    //     setCurrentImageIndex(0);
    //     setClickedFruit([]);
    //     setProgress(0);
    //     setResult('');
    // }

    return (
        <View style={styles.mainContainer}>
            <View style={{ width: `${progress}%`, height: '5%', backgroundColor: '#000000' }}></View>
            <View style={styles.container}>
                {done ?
                    <>
                        <Summary isOver={false} whichGame='L1N' results={result} playTime={timeSpent} navigation={navigation} nextScreen='InstructionL2N' />
                    </>
                    :
                    <>
                        <View style={styles.gameContainer}>

                            <View style={styles.imgcontainer}>
                                <Image source={images[currentImageIndex]} style={styles.img} />
                            </View>

                            {FRUIT_BUTTONS.map((row, index) => (
                                <View style={styles.row} key={index}>
                                    {row.map((fruit) => (
                                        <TouchableOpacity style={styles.button} key={fruit} onPress={() => handleButtonClick(fruit)}>
                                            <Text style={styles.buttonText}>{fruit}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ))}
                        </View>
                        <View style={styles.timeContainer}>
                            <Timer setDone={setDone} requestTime={isRequestTime} initialSeconds={seconds} updatedTime={setTimeSpent} />
                        </View>
                    </>
                }
            </View>
        </View>
    );
}

export default Level1N;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FAF7F0',
    },
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        padding: 20
    },
    gameContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgcontainer: {
        alignItems: 'center',
        marginBottom: 20
    },
    resultContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    finalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '40%',
    },
    timeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchContainer: {
        margin: 10,
        height: 50,
        width: 150,
    },
    tch: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 35,
        padding: 10,
        backgroundColor: '#565b64',
    },
    Txt: {
        fontFamily: 'DreamingOutloudPro',
        color: '#fff',
        fontSize: 25,
    },
    endTxt: {
        textAlign: 'center',
        fontFamily: 'DreamingOutloudPro',
        color: '#000',
        fontSize: 35,
    },
    rTxt: {
        textAlign: 'center',
        fontFamily: 'DreamingOutloudPro',
        color: '#000',
        fontSize: 25,
    },
    intrTxt: {
        textAlign: 'center',
        fontFamily: 'DreamingOutloudPro',
        color: '#000',
        fontSize: 20,
    },
    redTimerTxt: {
        color: 'red',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'transparent',
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#000',
        height: 80,
        width: 140,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 22,
        fontFamily: 'DreamingOutloudPro',
        color: 'black'
    },
    ltView: {
        height: '60%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
    lottie: {
        height: '100%',
        width: '100%',
    },
});