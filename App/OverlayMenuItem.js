import React from 'react';
import Animated from 'react-native-reanimated';
import { StyleSheet, TouchableOpacity } from 'react-native';
import pure from './pure';

const styles = StyleSheet.create({
  label: {
    color: 'white',
    fontSize: 40,
    padding: 10,
  },
});

const { multiply, sub, interpolate, min } = Animated;

const OverlayMenuItem = ({ animation, index, text, isSelected }) => (
  <Animated.View
    style={{
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
    }}
  >
    <TouchableOpacity activeOpacity={0.7}>
      <Animated.Text
        style={[
          styles.label,
          {
            opacity: multiply(min(interpolate(animation, {
              inputRange: [0, index / 4, (index / 4) + 0.2, 1],
              outputRange: [0, 0.2, 1, 1]
            }), 1), isSelected ? 1 : 0.4),
          }
        ]}
      >
        {text}
      </Animated.Text>
    </TouchableOpacity>
  </Animated.View>
);

export default pure(OverlayMenuItem);
