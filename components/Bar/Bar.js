import React from 'react';
import { View, StyleSheet } from 'react-native';

const Bar = (props) => {
  return (
    <View style={styles.bar}>
      {props.children}
    </View>
  );
}

export default Bar;

const styles = StyleSheet.create({
  bar: {
    backgroundColor: 'skyblue',
    width: "100%",
    padding: 15,
    flexDirection: 'row'
  }  
});