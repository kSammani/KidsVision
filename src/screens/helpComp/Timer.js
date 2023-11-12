import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native'

const Timer = ({ setDone, initialSeconds, updatedTime, resetTimer, onReset }) => {
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        if (resetTimer) {
            updatedTime(seconds);
            setSeconds(initialSeconds);
            onReset();
            setDone(false);
            return;
        }
        if (seconds <= 0) {
            setDone(true);
            return;
        }
        const timeout = setTimeout(() => {
            setSeconds(seconds - 1);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [seconds, resetTimer, onReset]);

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const isUnderOneMinute = minutes < 1;
    const textColor = isUnderOneMinute && remainingSeconds < 10 && seconds != 0 ? 'red' : 'black';
    return (
        <View style={styles.container}>
            <Text style={[styles.intrTxt, isUnderOneMinute && { color: textColor }]}>Time Remaining {minutes < 10 ? `0${minutes}` : minutes}:{remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}</Text>
        </View>
    )
}

export default Timer;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        justifyContent: 'flex-end',
        marginBottom: 5,
        bottom: 0,
        zIndex: -1,
    },
    intrTxt: {
        textAlign: 'center',
        fontFamily: 'DreamingOutloudPro',
        color: '#000',
        fontSize: 20,
    },
})