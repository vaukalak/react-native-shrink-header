import React from 'react';
import ShrinkHeaderScroll from './ShrinkHeaderScroll';
import {Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  lineItem: {
    flex: 1,
    backgroundColor: '#fff4f6',
    padding: 20,
  },
});

const contentText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const items = [
  'PROFILE',
  'ABOUT',
  'SETTINGS',
  'PHOTOS',
];

const TestContent = () => (
  <Text style={styles.lineItem}>
    {contentText.repeat(5)}
  </Text>
);


export default () => (
  <ShrinkHeaderScroll
    items={items}
    title="ABOUT"
    selectedItem="ABOUT"
  >
    <TestContent />
  </ShrinkHeaderScroll>
);
