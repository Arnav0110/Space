import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.iosSafeArea} />
        <ImageBackground
          source={require('../assets/bg.png')}
          style={styles.backgroundImage}>
          <View style={styles.titleBar}>
            <Text style={styles.titleText}>ISS Tracker App</Text>
          </View>

          <TouchableOpacity
            style={styles.routeCard}
            onPress={() => this.props.navigation.navigate('ISS Location')}>
            <Text style={styles.routeText}>ISS Location</Text>
            <Text style={styles.knowMore}>{'Know More --->'}</Text>
            <Text style={styles.bgDigit}>1</Text>
            <Image
              source={require('../assets/iss_icon.png')}
              style={styles.issImage}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.routeCard}
            onPress={() => this.props.navigation.navigate('Meteors')}>
            <Text style={styles.routeText}>Meteors</Text>
            <Text style={styles.knowMore}>{'Know More --->'}</Text>
            <Text style={styles.bgDigit}>2</Text>
            <Image
              source={require('../assets/meteor_icon.png')}
              style={styles.meteorImage}
            />
          </TouchableOpacity>

        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  routeCard: {
    flex: 0.25,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50,
    borderRadius: 30,
    borderWidth: 2.5,
    borderColor: 'rgba(255,255,255, 0.3)',
    backgroundColor: 'rgba(255,255,255, 0.5)',
  },
  titleBar: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'underline',
    color: 'white',
    //fontFamily: 'Fantasy'
  },
  routeText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 45,
    paddingLeft: 20,
  },
  knowMore: {
    paddingLeft: 20,
    color: 'red',
    fontSize: 15,
  },
  bgDigit: {
    position: 'absolute',
    color: 'rgba(255,255,255, 0.5)',
    fontSize: 150,
    right: 20,
    bottom: -30,
    zIndex: -1,
    fontWeight: 'bold',
    //fontFamily: 'Fantasy'
  },
  meteorImage: {
    position: 'absolute',
    height: 220,
    width: 220,
    resizeMode: 'contain',
    right: 40,
    top: -70,
  },
  issImage: {
    position: 'absolute',
    height: 150,
    width: 150,
    resizeMode: 'contain',
    right: -15,
    top: -50,
  },
  updateImage: {
    position: 'absolute',
    height: 200,
    width: 150,
    resizeMode: 'contain',
    right: 50,
    top: -60,
  },
  iosSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
