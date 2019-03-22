import React, { useState, useRef, useCallback } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import _ from 'lodash';
import Animated  from 'react-native-reanimated';
import Header from './Header';
import Menu from './Menu';

const styles = StyleSheet.create({
  statusBarPlaceholder: { height: 20, width: null, backgroundColor: 'white' },
  flex: { flex: 1 },
  container: {
    backgroundColor: 'grey',
    flex: 1,
  },
  scrollTopGap: { paddingTop: 200 },
  lineItem: { flex: 1, backgroundColor: 'yellow', padding: 20 },
});

const { Value, event } = Animated;

type Props = {};

const App = (props: Props) => {

  const [scroll] = useState(new Value(0));
  const scrollRef = useRef(null);
  const onScrollEndDrag = useCallback(({ nativeEvent }) => {
    const { targetContentOffset: { y } } = nativeEvent;
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
      <View style={styles.statusBarPlaceholder} />
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
          {_.times(30, (i) => (
            <Text style={styles.lineItem} key={i}>
              {`Hello ${i}`}
            </Text>
          ))}
        </Animated.ScrollView>
        <Header scroll={scroll} />
        <Menu scroll={scroll} />
      </View>
    </View>
  );
};

export default App;
