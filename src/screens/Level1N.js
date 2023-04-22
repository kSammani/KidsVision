import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Text, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Level1N = ({ navigation }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [clickedFruit, setClickedFruit] = useState([]);
    const [done, setDone] = useState(false);
    const [progress, setProgress] = useState(0);

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
        if (currentImageIndex == (images.length-1)) {
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
            <View style={{ width, height, backgroundColor: '#fff', position: 'absolute' }}>
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

    return (
        <>
            <View style={styles.container}>
                {done ?
                    <>
                        <TouchableOpacity onPress={() => {
                            setDone(false);
                            setCurrentImageIndex(0);
                            setClickedFruit([]);
                            setProgress(0);
                        }}>
                            <Text style={styles.Txt}>Try Again?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                            <Text style={styles.Txt}>Next</Text>
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
            <ProgressBar progress={progress} color={'#FFB52E'} width='100%' height={30} />
        </>
    );
}

export default Level1N;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    imgcontainer: {
        alignItems: 'center',
        marginBottom: 20
    },
    Txt: {
        padding: 20,
        fontFamily: 'Cochin',
        color: '#000',
        fontSize: 22,
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
        color: 'black'
    },
});