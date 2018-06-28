import React from 'react';
import { Text, View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import Bar from '../Bar/Bar';
import Expo from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';

const Error = (props) => {
  return (
    <Modal animationType="slide" onRequestClose={props.cancelEverything}>
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
      <View style={styles.container}>
        <Icon name="bug" size={140} color="#000" style={{marginTop: 50}}/>
        <Text style={{fontSize: 25, marginTop: 40}}>
          Ooops.. We found nothing..
        </Text>
        <Text style={{fontSize: 15, marginTop: 20}}>
          Did you enter a valid Instagram username?
        </Text>
        <Text style={{fontSize: 15}}>
          Do you have a connection to the Internet?
        </Text>
      </View> 
    </Modal>
  );
}

export default Error;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  }
});