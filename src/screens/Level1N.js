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

    const handleButtonClick = (fruit) => {
        if (currentImageIndex == (images.length - 1)) {
            setDone(true);
        }
        if (progress < 1) {
            setProgress(prevProgress => prevProgress + (1 / images.length));
        }
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
        setClickedFruit((prevClickedFruit) => [...prevClickedFruit, fruit]);
    };

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



    const ProgressBar = ({ progress, width, height, color }) => {
        const animatedValue = useRef(new Animated.Value(progress - (1 / images.length))).current;

        useEffect(() => {
            Animated.timing(animatedValue, {
                toValue: progress,
                duration: 500,
                useNativeDriver: false,
            }).start();
        }, [progress]);

        const widthInterpolate = animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%'],
            extrapolate: 'clamp',
        });

        return (
            <View style={{ width, height, backgroundColor: '#FAF7F0', position: 'absolute' }}>
                <Animated.View
                    style={[
                        styles.progress,
                        {
                            width: widthInterpolate,
                            height,
                            backgroundColor: color,
                        },
                    ]}
                />
            </View>
        );
    };

    const tryAgain = () => {
        setDone(false);
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
            navigation.navigate('FinalScore');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <View style={styles.container}>
                {done ?
                    <>
                        <Text style={styles.endTxt}>End of Nearsightedness Test</Text>
                        <TouchableOpacity onPress={tryAgain}>
                            <Text style={styles.Txt}>Try Again?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={next}>
                            <Text style={styles.Txt}>Final Score</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { navigation.navigate('First') }}>
                            <Text style={styles.Txt}>Home</Text>
                        </TouchableOpacity>
                    </>
                    :
                    <>
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
                    </>
                }
            </View>
            <ProgressBar progress={progress} color={'#000'} width='100%' height={40} />
        </>
    );
}

export default Level1N;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#FAF7F0',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
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
    Txt: {
        padding: 20,
        fontFamily: 'DreamingOutloudPro',
        color: '#000',
        fontSize: 25,
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
        fontSize: 20,
        fontFamily: 'DreamingOutloudPro',
        color: 'black'
    },
});