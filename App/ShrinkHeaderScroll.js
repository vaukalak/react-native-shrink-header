import React, { useState, useRef, useEffect, useCallback } from 'react';
import {StyleSheet, View, Platform, Dimensions} from 'react-native';
import Animated from 'react-native-reanimated';
import Header from './Header';
import Menu from './Menu';

const styles = StyleSheet.create({
  statusBarPlaceholder: { height: 20, width: null, backgroundColor: 'white' },
  flex: { flex: 1 },
  container: {
    backgroundColor: '#fff4f6',
    flex: 1,
  },
  scrollTopGap: { paddingTop: 200 },
});

const { Value, event } = Animated;

const useAnimatedScreenSize = () => {
  const [width] = useState(new Value(0));
  const [height] = useState(new Value(0));
  useEffect(() => {
    const updateSize = ({ window }) => {
      width.setValue(window.width);
      height.setValue(window.height);
    };
    const window = Dimensions.get('window');
    width.setValue(window.width);
    height.setValue(window.height);
    Dimensions.addEventListener('change', updateSize);
    return () => {
      Dimensions.removeEventListener('change', updateSize);
    }
  });
  return { width, height };
};

const ShrinkHeaderScroll = ({ children, items, title, selectedItem }) => {

  const [scroll] = useState(new Value(0));
  const scrollRef = useRef(null);
  const { width: screenWidth } = useAnimatedScreenSize();
  const onScrollEndDrag = useCallback(({ nativeEvent }) => {
    const { y } = Platform.OS === 'ios' ?
      nativeEvent.targetContentOffset :
      nativeEvent.contentOffset;
    if (y > 50 && y < 140) {
      const newY = y > 100 ? 140 : 50;
      scrollRef.current._component.scrollTo({
        y: newY,
        animated: true,
      });
    }
  });

  return (
    <View style={styles.flex}>
      {Platform.OS === 'ios' && <View style={styles.statusBarPlaceholder} />}
      <View style={styles.container}>
        <Animated.ScrollView
          ref={scrollRef}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollTopGap}
          onScrollEndDrag={onScrollEndDrag}
          onScroll={event([
            { nativeEvent: { contentOffset: { y: scroll } } }
          ])}
          style={styles.flex}
        >
          {children}
        </Animated.ScrollView>
        <Header screenWidth={screenWidth} scroll={scroll} title={title} />
        <Menu
          screenWidth={screenWidth}
          items={items}
          scroll={scroll}
          selectedItem={selectedItem}
        />
      </View>
    </View>
  );
};

export default ShrinkHeaderScroll;
