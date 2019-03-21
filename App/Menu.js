import React, { useState } from 'react';
import Animated from 'react-native-reanimated';
import { Dimensions, View, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'grey',
    left: 0,
    top: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 60,
  },
});

const { width: screenWidth } = Dimensions.get('window');
const { min, max, add, multiply, sub, divide, Value, interpolate } = Animated;

const Menu = ({ scroll }) => {

  const [labelWidth] = useState(new Value(0));
  const scrollProgress = min(divide(scroll, 140), 1);
  const titleScale = max(sub(1, scrollProgress), 0.4);
  const titleTranslationBase = sub(
    1,
    interpolate(scrollProgress, {
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
    }),
  );
  const titleTranslation = max(titleTranslationBase, 0.4);

  const lwi = multiply(labelWidth, min(titleTranslation, 1));
  const lmti = sub(labelWidth, lwi);
  const dyi = divide(sub(screenWidth, lwi), 2);
  const lxi = sub(
    screenWidth,
    lwi,
    divide(lmti, 2),
    multiply(dyi, min(titleTranslationBase, 1)),
    multiply(40, sub(1, min(titleTranslationBase, 1))),
  );

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: max(add(multiply(scroll, -1), 200), 60),
        }
      ]}
    >
      <Animated.Text
        onLayout={({nativeEvent: {layout: {width}}}) => {
          labelWidth.setValue(width);
        }}
        style={[
          styles.title,
          {
            transform: [
              { translateX: lxi },
              { scale: titleScale },
            ],
          }
        ]}
      >
        TEXT
      </Animated.Text>
    </Animated.View>
  );
};

export default Menu;
