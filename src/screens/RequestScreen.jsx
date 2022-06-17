import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors, parameters } from './../constants/styles';
const RequestScreen = () => {
  return (
    <View style={styles.container}>
      <Text>RequestScreen</Text>
    </View>
  );
};

export default RequestScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: parameters.statusBarHeight,
  },
});
