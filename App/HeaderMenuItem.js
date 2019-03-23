import React, { useState, useCallback } from 'react';
import Animated  from 'react-native-reanimated';
import {StyleSheet, TouchableOpacity } from 'react-native';
import pure from './pure';

const { min, max, sub, concat, Value, multiply } = Animated;

const styles = StyleSheet.create({
  label: {
    width: 80,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
  }
});

const HeaderMenuItem = ({
  label,
  scroll,
  showOverlayAnimation,
  screenWidth,
  index,
  visible,
  isSelected,
}) => {

  if (!visible) {
    return null;
  }

  const [x] = useState(new Value(0));

  const onLayout = useCallback(
    ({ nativeEvent: { layout } }) => {
      x.setValue(layout.x);
    }
  );

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

  const rotation = index === 0 ?
    showOverlayAnimation :
    (
      index === 3 ?
        multiply(showOverlayAnimation, -1) :
        undefined
    );

  const containerTranslation = {
    transform: [
      {
        translateX: max(
          min(multiply(translation, screenWidth), sub(sub(screenWidth, x), 60)),
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
  };

  const containerRotation = {
    transform: [
      {
        rotate: concat(
          multiply(rotation, 45),
          'deg',
        ),
      },
      { scaleX: sub(1, min(translation, 0.7)) },
    ],
  };

  return (
    <Animated.View
      onLayout={onLayout}
      style={containerTranslation}
    >
      <TouchableOpacity activeOpacity={0.5}>
        <Animated.View
          style={containerRotation}
        >
          <Animated.View
            style={[
              styles.background,
              { opacity: background },
            ]}
          />
          <Animated.Text
            style={[
              styles.label,
              {
                fontSize: multiply(sub(1, min(translation, 0.9)), 16),
                opacity: isSelected ? 1 : 0.8
              },
            ]}
          >
            {label}
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default pure(HeaderMenuItem);
