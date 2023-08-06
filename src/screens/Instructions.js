import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { COLORS, SIZE } from '../images/constants/theme';

const Instructions = ({navigation}) =>{
    const slides = [
        {
            id:1,
            title:'Keep the Phone like this',
            description: 'Keep the mobile phone 30 cm away from the eyes between them & the screen.',
            image: require('../images/instruction/1.png')
        },
        {
            id:2,
            title:'Remove the Glasses',
            description: 'Remove glasses before playing games if the child is wearing them.',
            image: require('../images/instruction/3.png')
        },
        {
            id:3,
            title:'Cover an Eye',
            description: 'Play the game with one eye covered, then repeat with the other eye covered.',
            image: require('../images/instruction/2.png')
        }
    ]

    const [showLevel1N , setShowLevel1N] = useState(false);

    const buttonLables = (lable) => {
        return(
            <View style={{
                padding:12
            }}>
                <Text style={{
                    color:COLORS.title,
                    fontWeight:600,
                    fontSize:SIZE.h4
                }}>
                    {lable}
                </Text>
            </View>
        )
    }

    if (!showLevel1N){
        return(
            <AppIntroSlider
                data={slides}
                renderItem={({item}) => {
                    return(
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            padding:20,
                            paddingTop: 100,
                            backgroundColor:'#FAF7F0'
                        }}>
                            <Image
                                source={item.image}
                                style={{
                                    width:SIZE.width - 80,
                                    height:300
                                }}
                                resizeMode='contain'
                            />
                            <Text style={{
                         
                                color: COLORS.title,
                                fontSize:SIZE.h1,
                                fontFamily: 'DreamingOutloudPro',
                                paddingTop:40,
                            }}>
                                {item.title}
                            </Text>
                            <Text style={{
                                color: COLORS.title,
                                textAlign: 'center',
                                fontSize:SIZE.h3,
                                fontFamily: 'DreamingOutloudPro',
                                paddingTop:10,
                            }}>
                                {item.description}
                            </Text>
                        </View>
                    )
                }}
                activeDotStyle={{
                    backgroundColor: COLORS.primary,
                    width:30,
                }}
                showSkipButton
                renderNextButton={() => buttonLables('Next')}
                renderSkipButton={() => buttonLables('Skip')}
                renderDoneButton={() => buttonLables('Done')}
                onDone={() =>{
                    // setShowLevel1N(true);
                    navigation.navigate('InstructionL1N')
                }}
            />
        )
    }
}

export default Instructions; 


    