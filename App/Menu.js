import React, { useState, useCallback, useEffect } from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import HeaderMenuItem from './HeaderMenuItem';
import OverlayMenu from './OverlayMenu';

const styles = StyleSheet.create({
  flex: { flex: 1 },
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

const Menu = ({ scroll, items, screenWidth, selectedItem }) => {
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
      <Animated.View
        style={[
          styles.menuItemsContainer,
          {
            height: max(add(multiply(scroll, -1), 200), 60),
          }
        ]}
      >
        {items.map((key, index) => (
          <HeaderMenuItem
            key={key}
            isSelected={selectedItem === key}
            showOverlayAnimation={showOverlayAnimation}
            label={key}
            visible={!overlayVisible || index === 0 || index === 3}
            scroll={scroll}
            screenWidth={screenWidth}
            index={index}
          />
        ))}
      </Animated.View>
      <TouchableOpacity
        onPressIn={switchToOverlay}
        style={styles.switchToOverlayButton}
      >
        <Animated.View
          style={styles.flex}
        />
      </TouchableOpacity>
      {!!overlayVisible && (
        <OverlayMenu
          items={items}
          selectedItem={selectedItem}
          showOverlayAnimation={showOverlayAnimation}
        />
      )}
    </View>
  );
};

export default Menu;
