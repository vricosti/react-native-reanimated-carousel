import React, { useEffect } from "react";
import type {
  StyleProp,
  ViewStyle,
  ViewProps,
  ImageSourcePropType,
} from "react-native";
import { 
  Dimensions,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { ScrollView } from "react-native-gesture-handler";
import { LongPressGestureHandler } from "react-native-gesture-handler";
import type { AnimateProps } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import Remotes from "./Remotes"

import Constants from "expo-constants";

// type ImageMap = {
//   [key: string]: ImageSourcePropType;
// };
// const images: ImageMap = {
//   'sony-rmt-tx101d.jpg': require('../../assets/sony-rmt-tx101d.jpg'),
//   'free-freebox-revolution.jpg': require('../../assets/free-freebox-revolution.jpg'),
// };

type ImageMap = {
  [key: string]: string;
};
const images: ImageMap = {
  'sony-rmt-tx101d.jpg': 'http://192.168.1.8:8999/images/sony-rmt-tx101d.jpg',
  'free-freebox-revolution.jpg': 'http://192.168.1.8:8999/images/free-freebox-revolution.jpg',
};
interface Props extends AnimateProps<ViewProps> {
  style?: StyleProp<ViewStyle>
  index?: number
  pretty?: boolean
  showIndex?: boolean
  img?: ImageSourcePropType
}

const MDPI = 160;
const INCHESMM = 25.4;
const sizeToPixel = (sz: number) => {
  return (MDPI * sz) / INCHESMM;
}

export const RemoteCtlCarouselItem: React.FC<Props> = (props) => {
  const { style, showIndex = true, index, pretty, img, testID, ...animatedViewProps } = props;
  const enablePretty = Constants?.expoConfig?.extra?.enablePretty || false;
  const [isPretty, setIsPretty] = React.useState(pretty || enablePretty);

  const remoteData = Remotes[index ? index : 0];
  const [imageInfo, setImageInfo] = React.useState({ uri: '', width: 0, height: 0, scaleFactor: 1 });
  const [showButtons, setShowButtons] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(false);
  const [visualDebug, setVisualDebug] = React.useState(true);

  
  useEffect(() => {
    console.log(`Updated imageInfo: width - ${imageInfo.width}, height - ${imageInfo.height}`);
  }, [imageInfo]);


  useEffect(() => {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!! INIT RemoteCtlScreen !!!!!!!!!!!!!!!!!!!!!!!!!!');    
    if (!remoteData || !remoteData.remote) {
      return;
    }

    // console.log(`index: ${index}`);
    // console.log(`remoteData: ${remoteData}`);
    // console.log(`remoteData.remote: ${remoteData.remote}`)

    const wndWidth = Dimensions.get('window').width;
    const wantedWidth = fullWidth ? wndWidth : sizeToPixel(remoteData.remote.dimensions.width);
    const imageUri = remoteData ? images[remoteData.remote.image] : null;
    
    Image.getSize(imageUri!, (width, height) => {
      const scaleFactor = wantedWidth / width;
      const imageHeight = height * scaleFactor;
      setImageInfo({ uri: imageUri!, width: wantedWidth, height: imageHeight, scaleFactor });
      console.log(`image (${imageUri}):  (${wantedWidth}, ${imageHeight})`);
      console.log(`wantedWidth: ${wantedWidth}, scaleFactor: ${scaleFactor}`);
      console.log(`imageInfo: (width: ${imageInfo.width}, height: ${imageInfo.height})`);
    }, (error) => {
      console.error('Failed to load image', error);
    });

    //const image = Image.resolveAssetSource(imageUri!);
    //console.log(`window dimensions: (${wndW}, ${wndH}, ${wndScale})`);
    //console.log(`screen dimensions: (${screenW}, ${screenH}, ${screenScale})`);
    //console.log('pixel ratio: ', PixelRatio.get());
   
  }, [index, setImageInfo]);


  const handlePress = async (buttonName: string) => {
    console.log(`Button pressed: ${buttonName}`);
  };

  return (
    <LongPressGestureHandler
      onActivated={() => {
        setIsPretty(!isPretty);
      }}
    >
      <Animated.View testID={testID} style={{ flex: 1 }} {...animatedViewProps}>
      { remoteData && remoteData.remote && imageInfo.uri && (<ScrollView style={styles.showBorderBlue}>
          <View >
              <Image
                style={[
                  {
                    width: imageInfo.width,
                    height: imageInfo.height,
                    alignSelf: 'center'
                  },
                  visualDebug ? styles.showBorderRed : {},
                ]}
                source={{ uri: imageInfo.uri }}
                resizeMode="contain"
              />
            
             {Object.entries(remoteData.remote.buttons).map(([key, value], index) => {
              const [left, top, right, bottom] = value.imgrect.map(coord => coord * imageInfo.scaleFactor);
              const width = right - left;
              const height = bottom - top;
              return width > 0 && height > 0 ? (
                <TouchableWithoutFeedback key={index} onPress={() => handlePress(key)}>
                  <View
                    style={{
                      position: 'absolute',
                      left,
                      top,
                      width,
                      height,
                      borderColor: showButtons ? 'green' : 'transparent',
                      borderWidth: showButtons ? 2 : 0,
                      backgroundColor: 'transparent',
                    }}
                  />
                </TouchableWithoutFeedback>
              ) : null;
            })}
          </View>
        </ScrollView>)}
      </Animated.View>
    </LongPressGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showBorderRed: {
    borderColor: 'red',
    borderWidth: 2,
    
  },
  showBorderBlue: {
    borderColor: 'blue',
    borderWidth: 2,
    
  },

});
