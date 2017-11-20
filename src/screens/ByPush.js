import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ByPush = ({ navigation }) => {
  const { number } = navigation.state.params
    ? navigation.state.params
    : { number: 'Nada' };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>
          Welcome to this view only from push! {number}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#374046'
  },
  text: {
    color: '#FFF'
  }
});

export default ByPush;
