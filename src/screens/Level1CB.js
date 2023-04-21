import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Text, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Level1CB = ({ navigation }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [clickedNumbers, setClickedNumbers] = useState([]);
    const [done, setDone] = useState(false);
    const [progress, setProgress] = useState(0);

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

    const handleButtonClick = (number) => {
        if (currentImageIndex == (images.length-1)) {
            setDone(true);
        }
        if (progress < 1) {
            setProgress(prevProgress => prevProgress + (1/images.length));
        }
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
        setClickedNumbers((prevClickedNumbers) => [...prevClickedNumbers, number]);    
    };

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
        console.log('Result ', count, '/', images.length);
    }, [clickedNumbers]);

    const ProgressBar = ({ progress, width, height, color }) => {
        const animatedValue = useRef(new Animated.Value(progress-(1/images.length))).current;

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
                        setClickedNumbers([]);
                        setProgress(0);
                    }}>
                        <Text style={styles.Txt}>Try Again?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("Test")}>
                        <Text style={styles.Txt}>Next</Text>
                    </TouchableOpacity>
                </>
                :
                <>
                    <Text style={styles.Txt}>How many items are there?</Text>

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
                </>
            }         
        </View>
        <ProgressBar progress={progress} color={'#FFB52E'} width='100%' height={30} />
        </>
    );
}

export default Level1CB;

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
        marginBottom: 40
    },
    Txt: {
        padding: 20,
        fontFamily: 'Cochin',
        color: '#A36A00',
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#FFB52E',
        borderRadius: 25,
        height: 80,
        width: 80,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 30,
        color: 'black'
    },
});