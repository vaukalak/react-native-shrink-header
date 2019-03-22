import React from 'react';
import {StyleSheet, View} from 'react-native';
import OverlayMenuItem from './OverlayMenuItem';
import pure from './pure';

const styles = StyleSheet.create({
  menu: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

const OverlayMenu = ({ items, showOverlayAnimation }) => (
  <View
    pointerEvents="box-none"
    style={styles.menu}
  >
    <View>
      {items.map((key, index) => (
        <OverlayMenuItem
          key={key}
          index={index}
          animation={showOverlayAnimation}
          text={key}
        />
      ))}
    </View>
  </View>
);

export default pure(OverlayMenu);
