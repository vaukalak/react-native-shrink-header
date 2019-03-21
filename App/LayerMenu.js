import React, { useState } from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import MenuItem from './MenuItem';

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  menuItemsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    top: 0,
    height: 190,
    paddingBottom: 10,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
});

const { max, multiply, add, min, sub, interpolate, Value } = Animated;
const items = [
  'MENU 1',
  'MENU 2',
  'MENU 3',
  'MENU 4',
];


const LayerMenu = ({ scroll }) => {

  const [showLayerAnim] = useState(new Value(0));
  const [layerVisible, setLayerVisible] = useState(false);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {!!layerVisible && (
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 'black' }
          ]}
        />
      )}
      <TouchableOpacity
        onPress={() => {
          setLayerVisible(!layerVisible);
          Animated.timing(
            showLayerAnim,
            { toValue: layerVisible ? 0 : 1, easing: Easing.out(Easing.back(1)), duration: 600 },
          ).start();
        }}
        style={{
          width: 24,
          height: 19,
          right: 8,
          top: 23,
          position: 'absolute',
        }}
      >
        <Animated.View
          style={{ flex: 1}}
        />
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.menuItemsContainer,
          {
            height: max(add(multiply(scroll, -1), 200), 60),
          }
        ]}
        pointerEvents="none"

      >
        {items.map((key, index) => (
          <MenuItem
            key={key}
            rotation={
              index === 0 ?
                showLayerAnim :
                (
                  index === 3 ?
                    multiply(showLayerAnim, -1) :
                    undefined
                )
            }
            label={key}
            visible={!layerVisible || index === 0 || index === 3}
            scroll={scroll}
            screenWidth={screenWidth}
            index={index}
          />
        ))}
      </Animated.View>
      {!!layerVisible && (
        <View
          pointerEvents="box-none"
          style={[
            StyleSheet.absoluteFill,
            { alignItems: 'center', justifyContent: 'space-around' }
          ]}
        >
          <View>
            {items.map((key, index) => (
              <Animated.Text
                style={{
                  transform: [
                    {
                      translateX: multiply(
                        sub(
                          1,
                          interpolate(showLayerAnim, {
                            inputRange: [0, (index / 4), (index / 4) + 0.2, 1],
                            outputRange: [0, 0.2, 1, 1]
                          })
                        ),
                        ((index % 2) * 2 - 1) * 100,
                      ),
                    }
                  ],
                  opacity: min(interpolate(showLayerAnim, {
                    inputRange: [0, index / 4, (index / 4) + 0.2, 1],
                    outputRange: [0, 0.2, 1, 1]
                  }), 1),
                  color: 'white',
                  fontSize: 40,
                  padding: 10,
                }}
              >
                {key}
              </Animated.Text>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default LayerMenu;
