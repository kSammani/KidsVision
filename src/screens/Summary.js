import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Lottie from 'lottie-react-native';

const Summary = ({ isOver, whichGame, results, playTime, navigation, nextScreen }) => {
    const [result, setResult] = useState(0);
    const [customResult, setCustomResult] = useState('');
    const [text, setText] = useState('Next');

    useEffect(() => {
        setResult(results);
        if (whichGame === 'L1CB') {
            setCustomResult(`Color Blindness Level 01 Results ${results} / 5`)
        }
        else if (whichGame === 'L2CB') {
            setCustomResult(`Color Blindness Level 02 Results ${results} / 5`)
        }
        else if (whichGame === 'L3CB') {
            setText('Nearsightedness Test');
            async function fetchData() {
                try {
                    let cb3l1 = await AsyncStorage.getItem("L3CB-L1");
                    let cb3l2 = await AsyncStorage.getItem("L3CB-L2");
                    let cb3l3 = await AsyncStorage.getItem("L3CB-L3");
                    let cb3l4 = await AsyncStorage.getItem("L3CB-L4");
                    let cb3l5 = await AsyncStorage.getItem("L3CB-L5");
                    if (cb3l1 === null) {
                        cb3l1 = 0;
                    }
                    if (cb3l2 === null) {
                        cb3l2 = 0;
                    }
                    if (cb3l3 === null) {
                        cb3l3 = 0;
                    }
                    if (cb3l4 === null) {
                        cb3l4 = 0;
                    }
                    if (cb3l5 === null) {
                        cb3l5 = 0;
                    }
                    //calculate CBL3 values
                    const resultsCBL3 = parseInt(cb3l1) + parseInt(cb3l2) + parseInt(cb3l3) + parseInt(cb3l4) + parseInt(cb3l5);
                    setResult(resultsCBL3)
                    setCustomResult(`Color Blindness Level 03 Results ${resultsCBL3} / 5`)
                } catch (error) {
                    console.log("Error getting the state", error);
                }
            }
            fetchData()
        }
        else if (whichGame === 'L1N') {
            setCustomResult(`Nearsightedness Level 01 Results ${results} / 6`)
        }
        else if (whichGame === 'L2N') {
            setText('Final Score');
            setCustomResult(`Nearsightedness Level 02 Results ${results} / 5`)
        }
    }, [whichGame, results]);

    const saveAndContinue = async (navigateScreen) => {
        try {
            await AsyncStorage.setItem(
                whichGame,
                result.toString(),
            );
            await AsyncStorage.setItem(
                `${whichGame}Time`,
                playTime.toString(),
            );
            navigation.navigate(navigateScreen);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.ltView}>
                <Lottie
                    style={styles.lottie}
                    source={require('../anim/celeb1.json')}
                    autoPlay
                    loop />
            </View>
            <View style={styles.resultContainer}>
                {isOver &&
                    <View style={styles.textContainer}>
                        <Text style={styles.endTxt}>Great Job Kid {'\n'} You've Finished the Game!</Text>
                    </View>
                }
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{customResult}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    {whichGame === 'L3CB' &&
                        <TouchableOpacity style={styles.button} onPress={() => saveAndContinue('FinalScore')}>
                            <View style={styles.buttonContent}>
                                <Text style={styles.buttonText}>Final Score</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity style={styles.button} onPress={() => saveAndContinue(nextScreen)}>
                        <View style={styles.buttonContent}>
                            <Text style={styles.buttonText}>{text}</Text>
                        </View>
                    </TouchableOpacity>
                    {whichGame === 'L2N' &&
                        <TouchableOpacity style={styles.button} onPress={() => saveAndContinue('InstructionL1CB')}>
                            <View style={styles.buttonContent}>
                                <Text style={styles.buttonText}>Color Blindness Test</Text>
                            </View>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    );
}

export default Summary;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    ltView: {
        flex: .5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    resultContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    lottie: {
        height: '100%',
        width: '100%',
    },
    textContainer: {
        padding: 5,
        marginVertical: 10
    },
    text: {
        color: '#565b64',
        textAlign: 'center',
        fontFamily: 'DreamingOutloudPro',
        fontSize: 22,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowRadius: 2,
    },
    endTxt: {
        textAlign: 'center',
        fontFamily: 'DreamingOutloudPro',
        color: '#000',
        fontSize: 30,
    },
    buttonContainer: {
        justifyContent: 'space-between',
        gap: 20
    },
    button: {
        backgroundColor: '#565b64',
        padding: 10,
        borderRadius: 25,
        shadowRadius: 5,
        shadowOpacity: 1,
    },
    buttonContent: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    buttonText: {
        color: 'white',
        fontFamily: 'DreamingOutloudPro',
        fontSize: 18,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
});


