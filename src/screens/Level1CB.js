import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Text, Animated, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Level1CB = ({ navigation }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [clickedNumbers, setClickedNumbers] = useState([]);
    const [done, setDone] = useState(false);
    const [progress, setProgress] = useState(0);
    const [colorIndex, setColorIndex] = useState(0);
    const [result, setResult] = useState('');

    const colors = ['#B6D0E2', '#FFFDD0', '#B1D8B7', '#F9CCD3', '#BFCAD0', '#FAF7F0'];

    const images = [
        require('../images/level1CB/level1-1.png'),
        require('../images/level1CB/level1-2.png'),
        require('../images/level1CB/level1-3.png'),
        require('../images/level1CB/level1-4.png'),
        require('../images/level1CB/level1-5.png'),
    ];

    const initialData = [4, 5, 6, 5, 7];

    const NUMBER_BUTTONS = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
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
        console.log(clickedNumbers);
        if (JSON.stringify(clickedNumbers) === JSON.stringify(initialData)) {
            console.log('Correct');
        } else {
            console.log('Wrong');
        }
        let count = 0;
        for (let i = 0; i < clickedNumbers.length; i++) {
            if (clickedNumbers[i] === initialData[i]) {
                count++;
            }
        }
        setResult(`Color Blindness Level 01 Results ${count} / ${images.length}`)
        console.log('Result ', count, '/', images.length);
    }, [clickedNumbers]);

    const handleButtonClick = (number) => {
        if (currentImageIndex == (images.length - 1)) {
            setDone(true);
        }
        if (progress < 100) {
            setProgress(prevProgress => prevProgress + (100 / images.length));
        }
        setColorIndex(done ? colors.length - 1 : (prevIndex) => prevIndex + 1);
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
        setClickedNumbers((prevClickedNumbers) => [...prevClickedNumbers, number]);
    };

    // const tryAgain = () => {
    //     setDone(false);
    //     setSeconds(initialSeconds);
    //     setCurrentImageIndex(0);
    //     setClickedNumbers([]);
    //     setProgress(0);
    //     setColorIndex(0);
    //     setResult('');
    // }

    const next = async () => {
        try {
            await AsyncStorage.setItem(
                'L1CB',
                result,
            );
            navigation.navigate('InstructionL2CB');
        } catch (error) {
            console.log(error);
        }
    }

    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: colors[colorIndex],
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
        resultContainer: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        imgcontainer: {
            alignItems: 'center',
            marginBottom: 40
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
            backgroundColor: '#899499',
            borderRadius: 25,
            height: 80,
            width: 80,
            margin: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonText: {
            fontSize: 30,
            fontFamily: 'DreamingOutloudPro',
            color: 'black'
        },
    });

    return (
        <View style={styles.mainContainer}>
            <View style={{ width: `${progress}%`, height: '5%', backgroundColor: '#000000' }}></View>
            <StatusBar translucent backgroundColor={colors[colorIndex]} />
            <View style={styles.container}>
                {done ?
                    <>
                        <View style={styles.resultContainer}>
                            <Text style={styles.rTxt}>{result}</Text>
                        </View>

                        <View style={styles.touchContainer}>
                            <TouchableOpacity style={styles.tch} onPress={next}>
                                <Text style={styles.Txt}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                    :
                    <>
                        <View style={styles.gameContainer}>

                            <View style={styles.imgcontainer}>
                                <Image source={images[currentImageIndex]} style={styles.img} />
                            </View>

                            {NUMBER_BUTTONS.map((row, index) => (
                                <View style={styles.row} key={index}>
                                    {row.map((number) => (
                                        <TouchableOpacity style={styles.button} key={number} onPress={() => handleButtonClick(number)}>
                                            <Text style={styles.buttonText}>{number}</Text>
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

export default Level1CB;

