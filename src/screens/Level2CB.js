import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DraxProvider, DraxView } from 'react-native-drax';

import Timer from './helpComp/Timer';
import Summary from './Summary';
import Constants from './helpComp/Constants';

const Test = ({ navigation }) => {
    const [staged1, setStaged1] = useState([]);
    const [staged2, setStaged2] = useState([]);
    const [staged3, setStaged3] = useState([]);
    const [staged4, setStaged4] = useState([]);
    const [staged5, setStaged5] = useState([]);

    const [data, setData] = useState(['null', 'null', 'null', 'null', 'null']);
    const [initialData, setInitialData] = useState(['Blue', 'Red', 'Yellow', 'Green1', 'Green2']);
    const newData = [...data];
    const [done, setDone] = useState(false);
    const [result, setResult] = useState(0);
    const [timeSpent, setTimeSpent] = useState(0);
    const [isRequestTime, setIsRequestTime] = useState(false);
    const [seconds, setSeconds] = useState(Constants.INITIAL_TIME);

    useEffect(() => {
        if (done) {
            setTimeSpent(timeSpent === 0 ? Constants.INITIAL_TIME : (Constants.INITIAL_TIME - timeSpent));
            setSeconds(0);
        }
    }, [done]);

    useEffect(() => {
        if (JSON.stringify(data) !== JSON.stringify(initialData)) {
            console.log('Wrong');
            console.log(data);
        } else {
            console.log('Correct');
            console.log(data);
        }
        if (!data.includes('null')) {
            setDone(true);
        }
        let count = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i] === initialData[i]) {
                count++;
            }
        }
        setIsRequestTime(true);
        setResult(count)
        console.log('Result ', count, '/', data.length);
    }, [data]);

    // const tryAgain = () => {
    //     setDone(false);
    //     setSeconds(initialSeconds);
    //     setStaged1([]);
    //     setStaged2([]);
    //     setStaged3([]);
    //     setStaged4([]);
    //     setStaged5([]);
    //     setData(['null', 'null', 'null', 'null', 'null']);
    //     setResult('');
    // }

    return (
        <>
            {done ?
                <>
                    <Summary isOver={false} whichGame='L2CB' results={result} playTime={timeSpent} navigation={navigation} nextScreen='InstructionL3CB' />
                </>
                :
                <View style={styles.mainContainer}>
                    <View style={styles.draxContainer}>
                        <DraxProvider>
                            <View style={styles.container}>
                                <View style={styles.palette}>
                                    <DraxView
                                        style={[styles.centeredContent, styles.draggableBox, styles.blue]}
                                        draggingStyle={styles.dragging}
                                        dragReleasedStyle={styles.dragging}
                                        dragPayload={'B'}
                                        longPressDelay={0}
                                    />
                                    <DraxView
                                        style={[styles.centeredContent, styles.draggableBox, styles.red]}
                                        draggingStyle={styles.dragging}
                                        dragReleasedStyle={styles.dragging}
                                        dragPayload={'R'}
                                        longPressDelay={0}
                                    />
                                    <DraxView
                                        style={[styles.centeredContent, styles.draggableBox, styles.yellow]}
                                        draggingStyle={styles.dragging}
                                        dragReleasedStyle={styles.dragging}
                                        dragPayload={'Y'}
                                        longPressDelay={0}
                                    />
                                </View>
                                <View style={styles.rContainer}>
                                    <DraxView
                                        dragPayload={staged1.join(' ')}
                                        draggable={staged1.length > 0}
                                        renderContent={({ viewState }) => {
                                            const receivingDrag = viewState && viewState.receivingDrag;
                                            const dragging = viewState && viewState.dragStatus !== 0;
                                            const combinedStyles = [
                                                styles.centeredContent,
                                                styles.receivingZone,
                                                styles.white,
                                            ];
                                            if (staged1[staged1.length - 1] == 'R') {
                                                combinedStyles.push(styles.red);
                                            } else if (staged1[staged1.length - 1] == 'G1') {
                                                combinedStyles.push(styles.green1);
                                            } else if (staged1[staged1.length - 1] == 'G2') {
                                                combinedStyles.push(styles.green2);
                                            } else if (staged1[staged1.length - 1] == 'B') {
                                                combinedStyles.push(styles.blue);
                                            } else if (staged1[staged1.length - 1] == 'Y') {
                                                combinedStyles.push(styles.yellow);
                                            }
                                            if (dragging) {
                                                combinedStyles.push({ opacity: 0.2 });
                                            } else if (receivingDrag) {
                                                combinedStyles.push(styles.receiving);
                                            }
                                            return <View style={combinedStyles}></View>;
                                        }}
                                        onReceiveDragDrop={event => {
                                            setStaged1([event.dragged.payload || '?']);
                                            if (event.dragged.payload == 'R') {
                                                newData[0] = 'Red';
                                                setData(newData);
                                            } else if (event.dragged.payload == 'G1') {
                                                newData[0] = 'Green1';
                                                setData(newData);
                                            } else if (event.dragged.payload == 'G2') {
                                                newData[0] = 'Green2';
                                                setData(newData);
                                            } else if (event.dragged.payload == 'B') {
                                                newData[0] = 'Blue';
                                                setData(newData);
                                            } else if (event.dragged.payload == 'Y') {
                                                newData[0] = 'Yellow';
                                                setData(newData);
                                            }
                                        }}
                                        onDragDrop={() => {
                                            setStaged1([]);
                                        }}
                                    />
                                    <View style={[styles.receivingZone, styles.inblue]}></View>
                                    <View style={[styles.receivingZone, styles.inred1]}></View>
                                    <DraxView
                                        dragPayload={staged2.join(' ')}
                                        draggable={staged2.length > 0}
                                        renderContent={({ viewState }) => {
                                            const receivingDrag = viewState && viewState.receivingDrag;
                                            const dragging = viewState && viewState.dragStatus !== 0;
                                            const combinedStyles = [
                                                styles.centeredContent,
                                                styles.receivingZone,
                                                styles.white,
                                            ];
                                            if (staged2[staged2.length - 1] == 'R') {
                                                combinedStyles.push(styles.red);
                                            } else if (staged2[staged2.length - 1] == 'G1') {
                                                combinedStyles.push(styles.green1);
                                            } else if (staged2[staged2.length - 1] == 'G2') {
                                                combinedStyles.push(styles.green2);
                                            } else if (staged2[staged2.length - 1] == 'B') {
                                                combinedStyles.push(styles.blue);
                                            } else if (staged2[staged2.length - 1] == 'Y') {
                                                combinedStyles.push(styles.yellow);
                                            }
                                            if (dragging) {
                                                combinedStyles.push({ opacity: 0.2 });
                                            } else if (receivingDrag) {
                                                combinedStyles.push(styles.receiving);
                                            }
                                            return <View style={combinedStyles}></View>;
                                        }}
                                        onReceiveDragDrop={event => {
                                            setStaged2([event.dragged.payload || '?']);
                                            if (event.dragged.payload == 'R') {
                                                newData[1] = 'Red';
                                                setData(newData);
                                            } else if (event.dragged.payload == 'G1') {
                                                newData[1] = 'Green1';
                                                setData(newData);
                                            } else if (event.dragged.payload == 'G2') {
                                                newData[1] = 'Green2';
                                                setData(newData);
                                            } else if (event.dragged.payload == 'B') {
                                                newData[1] = 'Blue';
                                                setData(newData);
                                            } else if (event.dragged.payload == 'Y') {
                                                newData[1] = 'Yellow';
                                                setData(newData);
                                            }
                                        }}
                                        onDragDrop={() => {
                                            setStaged2([]);
                                        }}
                                    />
                                    <View style={[styles.receivingZone, styles.inred2]}></View>
                                    <DraxView
                                        dragPayload={staged3.join(' ')}
                                        draggable={staged3.length > 0}
                                        renderContent={({ viewState }) => {
                                            const receivingDrag = viewState && viewState.receivingDrag;
                                            const dragging = viewState && viewState.dragStatus !== 0;
                                            const combinedStyles = [
                                                styles.centeredContent,
                                                styles.receivingZone,
                                                styles.white,
                                            ];
                                            if (staged3[staged3.length - 1] == 'R') {
                                                combinedStyles.push(styles.red);
                                            } else if (staged3[staged3.length - 1] == 'G1') {
                                                combinedStyles.push(styles.green1);
                                            } else if (staged3[staged3.length - 1] == 'G2') {
                                                combinedStyles.push(styles.green2);
                                            } else if (staged3[staged3.length - 1] == 'B') {
                                                combinedStyles.push(styles.blue);
                                            } else if (staged3[staged3.length - 1] == 'Y') {
                                                combinedStyles.push(styles.yellow);
                                            }
                                            if (dragging) {
                                                combinedStyles.push({ opacity: 0.2 });
                                            } else if (receivingDrag) {
                                                combinedStyles.push(styles.receiving);
                                            }
                                            return <View style={combinedStyles}></View>;
                                        }}
                                        onReceiveDragDrop={event => {
                                            setStaged3([event.dragged.payload || '?']);
                                            if (event.dragged.payload == 'R') {
                                                newData[2] = 'Red';
                                                setData(newData);
                                            } else if (event.dragged.payload == 'G1') {
                                                newData[2] = 'Green1';
                                                setData(newData);
                                            } else if (event.dragged.payload == 'G2') {
                                                newData[2] = 'Green2';
                                                setData(newData);
                                            } else if (event.dragged.payload == 'B') {
                                                newData[2] = 'Blue';
                                                setData(newData);
                                            } else if (event.dragged.payload == 'Y') {
                                                newData[2] = 'Yellow';
                                                setData(newData);
                                            }
                                        }}
                                        onDragDrop={() => setStaged3([])}
                                    />
                                    <View style={[styles.receivingZone, styles.inyellow]}></View>
                                    <DraxView
                                        dragPayload={staged4.join(' ')}
                                        draggable={staged4.length > 0}
                                        renderContent={({ viewState }) => {
                                            const receivingDrag = viewState && viewState.receivingDrag;
                                            const dragging = viewState && viewState.dragStatus !== 0;
                                            const combinedStyles = [
                                                styles.centeredContent,
                                                styles.receivingZone,
                                                styles.white,
                                            ];
                                            if (staged4[staged4.length - 1] == 'R') {
                                                combinedStyles.push(styles.red);
                                            } else if (staged4[staged4.length - 1] == 'G1') {
                                                combinedStyles.push(styles.green1);
                                            } else if (staged4[staged4.length - 1] == 'G2') {
                                                combinedStyles.push(styles.green2);
                                            } else if (staged4[staged4.length - 1] == 'B') {
                                                combinedStyles.push(styles.blue);
                                            } else if (staged4[staged4.length - 1] == 'Y') {
                                                combinedStyles.push(styles.yellow);
                                            }
                                            if (dragging) {
                                                combinedStyles.push({ opacity: 0.2 });
                                            } else if (receivingDrag) {
                                                combinedStyles.push(styles.receiving);
                                            }
                                            return <View style={combinedStyles}></View>;
                                        }}
                                        onReceiveDragDrop={event => {
                                            setStaged4([event.dragged.payload || '?']);
                                            if (event.dragged.payload == 'R') {
                                                newData[3] = 'Red';
                                                setData(newData);
                                            } else if (event.dragged.payload == 'G1') {
                                                newData[3] = 'Green1';
                                                setData(newData);
                                            } else if (event.dragged.payload == 'G2') {
                                                newData[3] = 'Green2';
                                                setData(newData);
                                            } else if (event.dragged.payload == 'B') {
                                                newData[3] = 'Blue';
                                                setData(newData);
                                            } else if (event.dragged.payload == 'Y') {
                                                newData[3] = 'Yellow';
                                                setData(newData);
                                            }
                                        }}
                                        onDragDrop={() => setStaged4([])}
                                    />
                                    <View style={[styles.receivingZone, styles.ingreen]}></View>
                                    <DraxView
                                        dragPayload={staged5.join(' ')}
                                        draggable={staged5.length > 0}
                                        renderContent={({ viewState }) => {
                                            const receivingDrag = viewState && viewState.receivingDrag;
                                            const dragging = viewState && viewState.dragStatus !== 0;
                                            const combinedStyles = [
                                                styles.centeredContent,
                                                styles.receivingZone,
                                                styles.white,
                                            ];
                                            if (staged5[staged5.length - 1] == 'R') {
                                                combinedStyles.push(styles.red);
                                            } else if (staged5[staged5.length - 1] == 'G1') {
                                                combinedStyles.push(styles.green1);
                                            } else if (staged5[staged5.length - 1] == 'G2') {
                                                combinedStyles.push(styles.green2);
                                            } else if (staged5[staged5.length - 1] == 'B') {
                                                combinedStyles.push(styles.blue);
                                            } else if (staged5[staged5.length - 1] == 'Y') {
                                                combinedStyles.push(styles.yellow);
                                            }
                                            if (dragging) {
                                                combinedStyles.push({ opacity: 0.2 });
                                            } else if (receivingDrag) {
                                                combinedStyles.push(styles.receiving);
                                            }
                                            return <View style={combinedStyles}></View>;
                                        }}
                                        onReceiveDragDrop={event => {
                                            setStaged5([event.dragged.payload || '?']);
                                            if (event.dragged.payload == 'R') {
                                                newData[4] = 'Red';
                                                setData(newData);
                                            } else if (event.dragged.payload == 'G1') {
                                                newData[4] = 'Green1';
                                                setData(newData);
                                            } else if (event.dragged.payload == 'G2') {
                                                newData[4] = 'Green2';
                                                setData(newData);
                                            } else if (event.dragged.payload == 'B') {
                                                newData[4] = 'Blue';
                                                setData(newData);
                                            } else if (event.dragged.payload == 'Y') {
                                                newData[4] = 'Yellow';
                                                setData(newData);
                                            }
                                        }}
                                        onDragDrop={() => setStaged5([])}
                                    />
                                </View>
                                <View style={styles.palette}>
                                    <DraxView
                                        style={[styles.centeredContent, styles.draggableBox, styles.green1]}
                                        draggingStyle={styles.dragging}
                                        dragReleasedStyle={styles.dragging}
                                        dragPayload={'G1'}
                                        longPressDelay={0}
                                    />
                                    <DraxView
                                        style={[styles.centeredContent, styles.draggableBox, styles.green2]}
                                        draggingStyle={styles.dragging}
                                        dragReleasedStyle={styles.dragging}
                                        dragPayload={'G2'}
                                        longPressDelay={0}
                                    />
                                </View>
                            </View>
                        </DraxProvider>
                    </View>
                    <View style={styles.timerContainer}>
                        <Timer setDone={setDone} requestTime={isRequestTime} initialSeconds={seconds} updatedTime={setTimeSpent} />
                    </View>
                </View>}
        </>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FAF7F0',
        justifyContent: 'center',
    },
    draxContainer: {
        flex: 1,
        paddingTop: '10%',
    },
    timerContainer: {
        paddingBottom: '5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    finalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '80%',
        padding: 10
    },
    finalSubContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: '20%',
        padding: 20,
    },
    ltView: {
        height: '60%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
    lottie: {
        height: '100%',
        width: '100%',
    },
    rTxt: {
        textAlign: 'center',
        fontFamily: 'DreamingOutloudPro',
        color: '#000',
        fontSize: 25,
    },
    timerTxt: {
        textAlign: 'center',
        fontFamily: 'DreamingOutloudPro',
        color: '#000',
        fontSize: 20,
    },
    redTimerTxt: {
        color: 'red',
    },
    finalBtnContainer: {
        flexDirection: 'row',
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
    nTxt: {
        fontFamily: 'DreamingOutloudPro',
        color: '#fff',
        fontSize: 25,
    },
    lt: {
        position: 'absolute',
        height: '100%',
        left: 0,
        right: 0,
    },
    rContainer: {
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    receivingZone: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    receiving: {
        borderColor: '#A9A9A9',
        borderWidth: 2,
    },
    palette: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    draggableBox: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    white: {
        backgroundColor: '#fff',
    },
    red: {
        backgroundColor: '#D60000',
    },
    inred1: {
        backgroundColor: '#CC00A4',
    },
    inred2: {
        backgroundColor: '#ED003E',
    },
    green1: {
        backgroundColor: '#C3FF3E',
    },
    green2: {
        backgroundColor: '#00D100',
    },
    ingreen: {
        backgroundColor: '#00FF00',
    },
    blue: {
        backgroundColor: '#006FFF',
    },
    inblue: {
        backgroundColor: '#0000FF',
    },
    yellow: {
        backgroundColor: '#FFBE6A',
    },
    inyellow: {
        backgroundColor: '#FFFF00',
    },
    dragging: {
        opacity: 0.2,
    },
    stagedCount: {
        fontSize: 18,
    },
});

export default Test;
