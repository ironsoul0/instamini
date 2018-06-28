import React from 'react';
import { View, StyleSheet, Image, Modal, TouchableOpacity, Text } from 'react-native';
import Bar from '../Bar/Bar';
import Icon from 'react-native-vector-icons/FontAwesome';

const UserChoice = (props) => {
  return (
    <Modal onRequestClose={props.cancelChoice}>
      <Bar>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity style={{marginRight: 20}} onPress={props.cancelChoice}>
            <Icon name="long-arrow-left" size={25} color="#000"/>
          </TouchableOpacity>
          <Text style={{fontSize: 18, fontWeight: '500'}}>
            {props.currentName}
          </Text>
        </View>
      </Bar>  
      <View style={styles.container}>
        <Image 
          source={{uri: props.link}}  
          style={styles.image}
        />
      </View>
    </Modal>
  );
}

export default UserChoice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 300,
    height: 300
  }
});