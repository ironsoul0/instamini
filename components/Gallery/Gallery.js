import React from 'react';
import { Text, View, StyleSheet, Modal, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import GalleryItem from '../GalleryItem/GalleryItem';
import Bar from '../Bar/Bar';
import Expo from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';

const {height, width} = Dimensions.get('window');

const Gallery = (props) => {
  const keyExtractor = (item, index) => String(index);

  const renderItem = ({item}) => {
    return (
      <GalleryItem 
        link={item.node.thumbnail_src}
        itemChoice={props.itemChoice}
      />
    );
  };
  
  let galleryContent = (
    <FlatList
      data={props.photos}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      numColumns={450 > width ? 2 : 3}
      style={{paddingTop: 20}}
    />
  );
  
  if (props.photos.length === 0) {
    galleryContent = (
      <View style={{width: "100%", alignItems: 'center', marginTop: 200}}> 
        <Icon name="frown-o" size={100} color="#000"/>
        <Text style={{fontSize: 18}}>
          Private or empty account
        </Text>
      </View>
    );
  }

  return (
    <Modal animationType="slide" onRequestClose={props.cancelEverything}>
      <View style={styles.container}>
        <Bar>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity style={{marginRight: 20}} onPress={props.cancelEverything}>
              <Icon name="long-arrow-left" size={25} color="#000"/>
            </TouchableOpacity>
            <Text style={{fontSize: 18, fontWeight: '500'}}>
              {props.currentName}
            </Text>
          </View>
        </Bar>
        {galleryContent}
      </View> 
    </Modal>
  );
}

export default Gallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }  
});