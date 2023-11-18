import React, { useEffect, useRef, useState } from 'react';
import { View, PanResponder, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from '@react-native-community/blur';
import Timer from '../helpComp/Timer';
import Summary from '../Summary';
import Constants from '../helpComp/Constants';

const Level3CB = ({ startTime, imageSource, pathValue, quote, navigation, nextScreen }) => {
  const path = useRef([]);
  const isDrawing = useRef(false);
  const [drawnPaths, setDrawnPaths] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPath, setIsPath] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [updatedTime, setUpdatedTime] = useState();
  const [seconds, setSeconds] = useState(startTime);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isSummary, setSummary] = useState(false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !isDone && !isCompleted,
    onMoveShouldSetPanResponder: () => !isDone && !isCompleted,
    onPanResponderGrant: () => {
      setIsPath(true);
      if (!isDone && !isCompleted) {
        isDrawing.current = true;
        path.current = [];
      }
    },
    onPanResponderMove: (e, gestureState) => {
      setIsPath(true);
      if (isDrawing.current) {
        path.current.push({ x: gestureState.moveX, y: gestureState.moveY });
        setDrawnPaths([...drawnPaths, path.current]);
      }
    },
    onPanResponderRelease: () => {
      setIsPath(true);
      isDrawing.current = false;
      //setDrawnPaths([...drawnPaths, path.current]);
      setIsCompleted(true);
      setSeconds(0);
      setResetTimer(true);
    },
  });

  const determinePath = () => {
    const correct = true;

    if (correct) {
      return {
        message: 'Correct!',
        value: 1,
      };
    } else {
      return {
        message: '\nNOT CORRECT!',
        value: 0,
      };
    }
  }

  useEffect (() => {
    if (!isPath && updatedTime === 0){
      setSummary(true);
      setTimeSpent(Constants.INITIAL_TIME);
      if (nextScreen === 'Level3CBLevel2') {
        console.log('Saving timeout...');
        const saveValue = async () => {
          try {
            await AsyncStorage.setItem(
              'L3CB-L1',
              '0',
            );
          } catch (error) {
            console.log(error);
          }
        }
        saveValue();
      }
    }
  }, [isPath, updatedTime, nextScreen]);

  const onYesClick = () => {
    pathValue(determinePath().value);
    if (nextScreen === 'Instructions') {
      setTimeSpent(updatedTime === 0 ? Constants.INITIAL_TIME : (Constants.INITIAL_TIME - updatedTime));
      setSummary(true);
    } else {
      navigation.navigate(nextScreen, { startTime: updatedTime });
    }
  }

  const onNoClick = () => {
    pathValue(0);
    if (nextScreen === 'Instructions') {
      setTimeSpent(updatedTime === 0 ? Constants.INITIAL_TIME : (Constants.INITIAL_TIME - updatedTime));
      setSummary(true);
    } else {
      navigation.navigate(nextScreen, { startTime: updatedTime });
    }
  }

  const tryAgain = () => {
    path.current = [];
    isDrawing.current = false;
    setIsCompleted(false);
    setDrawnPaths([]);
    setResetTimer(true);
    setSeconds(startTime);
  };

  const renderPaths = () => {
    if (drawnPaths.length > 0) {
      const lastDrawnPath = drawnPaths[drawnPaths.length - 1];
      return (
        <View>
          {lastDrawnPath.map((point, pointIndex) => (
            <View
              key={pointIndex}
              style={{
                position: 'absolute',
                width: 15,
                height: 15,
                backgroundColor: 'white',
                left: point.x - 2,
                top: point.y - 2,
                borderRadius: 6,
              }}
            />
          ))}
        </View>
      );
    }
  };

  return (
    <>
      {isSummary ?
        <Summary isOver={true} whichGame='L3CB' playTime={timeSpent} navigation={navigation} nextScreen='Instructions' />
        :
        <View style={styles.container}>
          <Image
            source={imageSource}
            style={styles.img}
            resizeMode="contain" />
          <View style={styles.drawingArea} {...panResponder.panHandlers}>
            {(isDone || isCompleted) && (
              <BlurView style={styles.overlay} blurType="light" blurAmount={10} />
            )}
            {renderPaths()}
            {(isDone || isCompleted) && (
              <>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{quote}</Text>
                </View>
                <View style={styles.btnContainer}>
                  <View style={styles.btnRow}>
                    <TouchableOpacity style={styles.noButton} onPress={onNoClick}>
                      <View style={styles.buttonContent}>
                        <Text style={styles.buttonText}>No, Continue</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onYesClick}>
                      <View style={styles.buttonContent}>
                        <Text style={styles.buttonText}>Yes, Continue</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.tryButtonContainer}>
                    <TouchableOpacity style={styles.tryButton} onPress={tryAgain}>
                      <View style={styles.buttonContent}>
                        <Text style={styles.buttonText}>Not Sure, Try Again</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </View>
          <Timer setDone={setIsDone} initialSeconds={seconds} requestTime={true} updatedTime={setUpdatedTime} resetTimer={resetTimer} onReset={() => setResetTimer(false)} />
        </View>
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    width: '90%',
    height: '50%',
    position: 'absolute',
  },
  drawingArea: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent background
  },
  pathsContainer: {
    position: 'absolute',
    zIndex: 1,
  },
  textContainer: {
    alignItems: 'center',
    padding: 5,
    marginTop: '20%',
  },
  text: {
    color: '#565b64',
    textAlign: 'center',
    fontFamily: 'DreamingOutloudPro',
    fontSize: 22,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowRadius: 2,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: '10%'
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  tryButtonContainer: {
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
  noButton: {
    margin: 10,
    backgroundColor: '#757c8a',
    padding: 10,
    borderRadius: 25,
    shadowRadius: 5,
    shadowOpacity: 1,
  },
  tryButton: {
    margin: 10,
    backgroundColor: 'transparent',
    padding: 10,
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

export default Level3CB;