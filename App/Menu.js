import React, { useState, useCallback } from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import HeaderMenuItem from './HeaderMenuItem';
import OverlayMenu from './OverlayMenu';

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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
  switchToOverlayButton: {
    width: 24,
    height: 19,
    right: 8,
    top: 23,
    position: 'absolute',
  },
});

const { max, multiply, add, Value } = Animated;

const items = [
  'MENU 1',
  'MENU 2',
  'MENU 3',
  'MENU 4',
];

const Menu = ({ scroll }) => {
  const [showOverlayAnimation] = useState(new Value(0));
  const [overlayVisible, setOverlayVisible] = useState(false);
  const switchToOverlay = useCallback(() => {
    setOverlayVisible(!overlayVisible);
    Animated.timing(
      showOverlayAnimation,
      {
        toValue: overlayVisible ? 0 : 1,
        easing: Easing.out(Easing.back(1)),
        duration: 800,
      },
    ).start();
  });

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {!!overlayVisible && (
        <View style={styles.overlay} />
      )}
      <TouchableOpacity
        onPress={switchToOverlay}
        style={styles.switchToOverlayButton}
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
          <HeaderMenuItem
            key={key}
            showOverlayAnimation={showOverlayAnimation}
            label={key}
            visible={!overlayVisible || index === 0 || index === 3}
            scroll={scroll}
            screenWidth={screenWidth}
            index={index}
          />
        ))}
      </Animated.View>
      {!!overlayVisible && (
        <OverlayMenu
          items={items}
          showOverlayAnimation={showOverlayAnimation}
        />
      )}
    </View>
  );
};

export default Menu;
