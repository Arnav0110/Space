import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
  Image,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

export default class ISSScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
    };
  }
  componentDidMount() {
    this.getISSLocation();
  }

  getISSLocation = async () => {
    axios
      .get('https://api.wheretheiss.at/v1/satellites/25544')
      .then((response) => {
        this.setState({
          location: response.data,
        });
      })
      .catch((error) => {
        Alert.aler(error.message);
      });
  };

  render() {
    if (Object.keys(this.state.location).length === 0) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text> Loading ...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.iosSafeArea} />
          <ImageBackground
            source={require('../assets/iss_bg.jpg')}
            style={styles.backgroundImage}>
            <View style={styles.titleBar}>
              <Text style={styles.titleText}>ISS Location</Text>
            </View>
            <View style={{ flex: 0.6 }}>
              <MapView
                style={{ width: '100%', height: '100%' }}
                region={{
                  latitude: this.state.location.latitude,
                  longitude: this.state.location.longitude,
                  latitudeDelta: 100,
                  longitudeDelta: 100,
                }}>
                <Marker
                  coordinate={{
                    latitude: this.state.location.latitude,
                    longitude: this.state.location.longitude,
                  }}>
                  <Image
                    source={require('../assets/iss_icon.png')}
                    style={{ width: 50, height: 50 }}
                  />
                </Marker>
              </MapView>
            </View>
            <Text style={styles.information}>
              Latitude: {this.state.location.latitude}
            </Text>
            <Text style={styles.information}>
              Longitude: {this.state.location.longitude}
            </Text>
            <Text style={styles.information}>
              Altitude (km): {this.state.location.altitude}
            </Text>
            <Text style={styles.information}>
              Velocity (km/h): {this.state.location.velocity}
            </Text>
          </ImageBackground>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: 400,
  },
  iosSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  titleBar: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'underline',
    color: 'white',
    //fontFamily: 'Fantasy'
  },
  information: {
    color: 'white',
    fontSize: 20,
    margin: 10,
    marginTop: 20,
  },
});
