import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Text, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Level1N = ({ navigation }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [clickedFruit, setClickedFruit] = useState([]);
    const [done, setDone] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState('');

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

    const initialSeconds = 120;
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        if (seconds <= 0) {
            setDone(true);
            return;
        }
        const timeout = setTimeout(() => {
            setSeconds(seconds - 1);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [seconds]);

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const isUnderOneMinute = minutes < 1;

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
        setResult(`Nearsightedness Level 01 Results ${count} / ${images.length}`)
        console.log('Result ', count, '/', images.length);
    }, [clickedFruit]);

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

    const tryAgain = () => {
        setDone(false);
        setSeconds(initialSeconds);
        setCurrentImageIndex(0);
        setClickedFruit([]);
        setProgress(0);
        setResult('');
    }

    const next = async () => {
        try {
            await AsyncStorage.setItem(
                'L1N',
                result,
            );
            navigation.navigate('Level2N');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.mainContainer}>
            <View style={{ width: `${progress}%`, height: '5%', backgroundColor: '#000000' }}></View>
            <View style={styles.container}>
                {done ?
                    <>
                        <Text style={styles.endTxt}>End of Nearsightedness Test</Text>
                        <TouchableOpacity onPress={tryAgain}>
                            <Text style={styles.Txt}>Try Again?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={next}>
                            <Text style={styles.Txt}>Next</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { navigation.navigate('First') }}>
                            <Text style={styles.Txt}>Home</Text>
                        </TouchableOpacity>
                    </>
                    :
                    <>
                        <View style={styles.gameContainer}>
                            <Text style={styles.Txt}>What is this Fruit?</Text>

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
                        <View>
                            <Text style={[styles.intrTxt, isUnderOneMinute && styles.redTimerTxt]}>Time Remaining {minutes < 10 ? `0${minutes}` : minutes}:{remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}</Text>
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
        justifyContent: 'center',
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
    endTxt: {
        textAlign: 'center',
        fontFamily: 'DreamingOutloudPro',
        color: '#000',
        fontSize: 35,
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
    Txt: {
        padding: 20,
        fontFamily: 'DreamingOutloudPro',
        color: '#000',
        fontSize: 26,
        marginTop: 20,
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
});