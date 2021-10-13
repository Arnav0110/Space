import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class UpdatesScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Updates</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
