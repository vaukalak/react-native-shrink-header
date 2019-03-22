import React from 'react';
import Animated from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  label: {
    color: 'white',
    fontSize: 40,
    padding: 10,
  },
});

const { multiply, sub, interpolate, min } = Animated;

const OverlayMenuItem = ({ animation, index, text }) => (
  <Animated.Text
    style={[
      styles.label,
      {
        transform: [
          {
            translateX: multiply(
              sub(
                1,
                interpolate(animation, {
                  inputRange: [0, (index / 4), (index / 4) + 0.2, 1],
                  outputRange: [0, 0.2, 1, 1]
                })
              ),
              ((index % 2) * 2 - 1) * 100,
            ),
          }
        ],
        opacity: min(interpolate(animation, {
          inputRange: [0, index / 4, (index / 4) + 0.2, 1],
          outputRange: [0, 0.2, 1, 1]
        }), 1),
      }
    ]}
  >
    {text}
  </Animated.Text>
);

export default OverlayMenuItem;
