import React, { useState } from 'react';
import Animated, { Easing } from 'react-native-reanimated';
import {StyleSheet} from 'react-native';

const { min, max, sub, concat, Value, multiply } = Animated;

const MenuItem = ({ label, scroll, screenWidth, index, rotation, visible }) => {

  const [x] = useState(new Value(0));

  const translation = min(scroll.interpolate({
    inputRange: [0, 70, 150, 1000],
    outputRange: [0, 0, 1, 1],
  }), 1);

  const translationY = min(1, scroll.interpolate({
    inputRange: [0, 70, 100, 1000],
    outputRange: [0, 0, 1, 1],
  }));

  const background = min(scroll.interpolate({
    inputRange: [0, 100, 110, 1000],
    outputRange: [0, 0, 1, 1],
  }), 1);


  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      onLayout={({ nativeEvent: { layout } }) => {
        x.setValue(layout.x);
      }}
      style={{
        transform: [
          {
            translateX: max(
              min(multiply(translation, 400), sub(sub(screenWidth, x), 60)),
              0
            ),
          }, {
            translateY: sub(
              multiply(-9, translationY),
              multiply(multiply(translationY, 5), index),
              multiply(rotation, 7.5),
            ),
          }
        ]
      }}
    >
      <Animated.View
        style={{
          transform: [
            { rotate: concat(multiply(rotation, 45), 'deg') },
            { scaleX: sub(1, min(translation, 0.7)) },
          ],
        }}
      >
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'white',
              opacity: background,
            }
          ]}
        />
        <Animated.Text
          style={{
            width: 80,
            color: 'white',
            fontSize: multiply(sub(1, min(translation, 0.9)), 20),
            textAlign: 'center',
          }}
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
};

export default MenuItem;
