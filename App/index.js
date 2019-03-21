import React, { useState, useRef } from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import _ from 'lodash';
import Animated  from 'react-native-reanimated';
import Menu from './Menu';
import LayerMenu from './LayerMenu';

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  statusBarPlaceholder: { height: 20, width: null, backgroundColor: 'white' },
  flex: { flex: 1 },
  scrollTopGap: { paddingTop: 200 },
  lineItem: { flex: 1, backgroundColor: 'yellow', padding: 20 },
});

const { Value, event } = Animated;

type Props = {};

const App = (props: Props) => {

  const [scroll] = useState(new Value(0));
  const scrollRef = useRef(null);

  return (
    <View style={styles.flex}>
      <View style={styles.statusBarPlaceholder} />
      <View style={styles.flex}>
        <Animated.ScrollView
          ref={scrollRef}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollTopGap}
          onScrollEndDrag={({ nativeEvent }) => {
            const { targetContentOffset: { y } } = nativeEvent;
            if (y > 50 && y < 140) {
              const newY = y > 100 ? 140 : 50;
              scrollRef.current._component.scrollTo({
                y: newY,
                animated: true,
              });
            }
          }}
          onScroll={event([
            { nativeEvent: { contentOffset: { y: scroll } } }
          ])}
          style={styles.flex}
        >
          {_.times(30, (i) => (
            <Text style={styles.lineItem}>
              {`Hello ${i}`}
            </Text>
          ))}
        </Animated.ScrollView>
        <Menu scroll={scroll} />
        <LayerMenu scroll={scroll} />
      </View>
    </View>
  );
};

export default App;
