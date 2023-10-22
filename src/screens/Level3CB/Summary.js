import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Lottie from 'lottie-react-native';

const Level3CBSummary = ({ navigation }) => {
    const [result, setResult] = useState('');

    useEffect(() => {
        const getEnab = async () => {
            try {
                const cb3l1 = await AsyncStorage.getItem("L3CB-L1");
                const cb3l2 = await AsyncStorage.getItem("L3CB-L2");
                const cb3l3 = await AsyncStorage.getItem("L3CB-L3");
                const cb3l4 = await AsyncStorage.getItem("L3CB-L4");
                const cb3l5 = await AsyncStorage.getItem("L3CB-L5");
                if (cb3l1 !== null) {
                    //calculate CBL3 values
                    const resultsCBL3 = parseInt(cb3l1) + parseInt(cb3l2) + parseInt(cb3l3) + parseInt(cb3l4) + parseInt(cb3l5);
                    setResult(`Colorblindness Level 03 Results ${resultsCBL3} / 5`)
                } else {
                    console.log("No saved state");
                }
            } catch (error) {
                console.log("Error getting the state", error);
            }
        };
        getEnab();
    });

    return (
        <View style={styles.mainContainer}>
            <View style={styles.ltView}>
                <Lottie
                    style={styles.lottie}
                    source={require('../../anim/celeb1.json')}
                    autoPlay
                    loop />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.text}>{result}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Instructions')}>
                    <View style={styles.buttonContent}>
                        <Text style={styles.buttonText}>Next</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Level3CBSummary;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',

    },
    ltView: {
        height: '60%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    lottie: {
        height: '100%',
        width: '100%',
    },
    textContainer: {
        alignItems: 'center',
        marginTop: '100%',
        position: 'absolute',
        padding: 5,
    },
    text: {
        color: '#565b64',
        textAlign: 'center',
        fontFamily: 'DreamingOutloudPro',
        fontSize: 22,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowRadius: 2,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        margin: 10,
        backgroundColor: '#565b64',
        padding: 10,
        borderRadius: 25,
        shadowRadius: 5,
        shadowOpacity: 1,
    },
    buttonContent: {
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


