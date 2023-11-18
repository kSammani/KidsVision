import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Text, Animated, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Timer from './helpComp/Timer';
import Summary from './Summary';
import Constants from './helpComp/Constants';

const Level1CB = ({ navigation }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [clickedNumbers, setClickedNumbers] = useState([]);
    const [done, setDone] = useState(false);
    const [progress, setProgress] = useState(0);
    const [colorIndex, setColorIndex] = useState(0);
    const [result, setResult] = useState(0);
    const [timeSpent, setTimeSpent] = useState(0);
    const [isRequestTime, setIsRequestTime] = useState(false);
    const [seconds, setSeconds] = useState(Constants.INITIAL_TIME);

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

    useEffect(() => {
        const removeCBData = async () => {
            try {
              // keys to remove
              const keysToRemove = ['L1CB', 'L1CBTime', 'L2CB', 'L2CBTime', 'L3CB', 'L3CBTime'];
      
              // wait for all removals to complete
              await Promise.all(
                keysToRemove.map(async (key) => {
                  await AsyncStorage.removeItem(key);
                  console.log(`${key} removed successfully`);
                })
              );   
              console.log('Saved data removed successfully');
            } catch (error) {
              console.error('Error removing values:', error);
            }
          };
          removeCBData();
    }, []);

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
        setIsRequestTime(true);
        setResult(count)
        console.log('Result ', count, '/', images.length);
    }, [clickedNumbers]);

    useEffect(() => {
        if (done) {
            setTimeSpent(timeSpent === 0 ? Constants.INITIAL_TIME : (Constants.INITIAL_TIME - timeSpent));
            setSeconds(0);
        }
    }, [done]);

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

    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: colors[colorIndex],
        },
        container: {
            flex: 1,
            flexDirection: "column",
            alignItems: 'center',
            padding: 20
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
                        <Summary isOver={false} whichGame='L1CB' results={result} playTime={timeSpent} navigation={navigation} nextScreen='InstructionL2CB' />
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
                        <View style={styles.timeContainer}>
                            <Timer setDone={setDone} requestTime={isRequestTime} initialSeconds={seconds} updatedTime={setTimeSpent} />
                        </View>
                    </>
                }
            </View>
        </View>
    );
}

export default Level1CB;

