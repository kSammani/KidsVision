import React from 'react';
import MainComp from './Level3CB';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Level2 = ({ navigation, route }) => {
  const quote = 'Impressive!';
  const startTime = route.params?.startTime;
  const saveValue = async (value) => {
    try {
      console.log(value);
      await AsyncStorage.setItem(
        'L3CB-L2',
        value.toString(),
      );
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <MainComp startTime={startTime} imageSource={require('../../images/level3CB/ish2.png')} pathValue={saveValue} quote={quote} navigation={navigation} nextScreen="Level3CBLevel3" />
  );
};

export default Level2;

// import React, { useRef, useState } from 'react';
// import { View, PanResponder } from 'react-native';

// const LetterWDetector = () => {
//   const path = useRef([]);
//   const isDrawing = useRef(false);
//   const [drawnPaths, setDrawnPaths] = useState([]);

//   const isLetterW = (path) => {
//     if (path.length < 10) {
//       return 'Unknown Shape'; // Require a minimum number of points for detection
//     }

//     // Get the start and end points of the path
//     const startPoint = path[0];
//     const endPoint = path[path.length - 1];

//     // Calculate the distance between the start and end points
//     const distance = Math.sqrt(
//       Math.pow(endPoint.x - startPoint.x, 2) +
//       Math.pow(endPoint.y - startPoint.y, 2)
//     );

//     // Calculate the angles based on the direction of drawing
//     const angle = Math.atan2(
//       endPoint.y - startPoint.y,
//       endPoint.x - startPoint.x
//     );

//     // You can fine-tune these thresholds for better accuracy
//     const minLength = 50;
//     const angleThreshold = 0.1; // Adjust this as needed for bold "W"

//     if (distance >= minLength) {
//       if (Math.abs(angle) < angleThreshold) {
//         return 'Letter W';
//       }
//     }

//     return 'Unknown Shape';
//   };

//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onMoveShouldSetPanResponder: () => true,
//     onPanResponderGrant: () => {
//       isDrawing.current = true;
//       path.current = [];
//     },
//     onPanResponderMove: (e, gestureState) => {
//       if (isDrawing.current) {
//         path.current.push({ x: gestureState.moveX, y: gestureState.moveY });
//       }
//     },
//     onPanResponderRelease: () => {
//       isDrawing.current = false;
//       const shape = isLetterW(path.current);
//       console.log('Detected Shape:', shape);
//       if (shape) {
//         setDrawnPaths([...drawnPaths, path.current]);
//       }
//     },
//   });

//   const renderPaths = () => {
//     return drawnPaths.map((drawnPath, index) => (
//       <View
//         key={index}
//         // style={{
//         //   position: 'absolute',
//         //   borderColor: 'white',
//         //   borderWidth: 2,
//         // }}
//       >
//         {drawnPath.map((point, pointIndex) => (
//           <View
//             key={pointIndex}
//             style={{
//               position: 'absolute',
//               width: 6,
//               height: 6,
//               backgroundColor: 'white',
//               left: point.x - 2,
//               top: point.y - 2,
//               borderRadius: 6,
//             }}
//           />
//         ))}
//       </View>
//     ));
//   };

//   return (
//     <View
//       {...panResponder.panHandlers}
//       style={{ flex: 1 }}
//     >
//         {renderPaths()}
//     </View>
//   );
// };

// export default LetterWDetector;
