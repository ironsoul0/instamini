import React from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';

const GalleryItem = (props) => {
  return (
    <TouchableWithoutFeedback onPress={props.itemChoice.bind(this, props.link)}>
      <Image
        style={styles.galleryItem}
        source={{uri: props.link}}  
      />
    </TouchableWithoutFeedback>
  );
}

export default GalleryItem;

const styles = StyleSheet.create({
  galleryItem: {
    width: 150,
    height: 150
  }
});