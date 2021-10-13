import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  SafeAreaView,
  FlatList,
  StatusBar,
  Platform,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import axios from 'axios';

export default class MeteorScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meteors: {},
    };
  }

  getMeteors = async () => {
    axios
      .get(
        'https://api.nasa.gov/neo/rest/v1/feed?api_key=1TR8qbduxwLaUOrW9GpyybEHYAHxECfOpP4ZVBgB'
      )
      .then((response) => {
        this.setState({
          meteors: response.data.near_earth_objects,
        });
      })
      .catch((error) => {
        Alert.aler(error.message);
      });
  };

  componentDidMount() {
    this.getMeteors();
  }
  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => {
    let meteor = item;
    let bg_image, speed, size;
    if (meteor.threat_score <= 30) {
      bg_image = require('../assets/meteor_bg1.png');
      speed = require('../assets/meteor_speed3.gif');
      size = 100;
    } else if (meteor.threat_score <= 75) {
      bg_image = require('../assets/meteor_bg2.png');
      speed = require('../assets/meteor_speed2.gif');
      size = 150;
    } else {
      bg_image = require('../assets/meteor_bg3.png');
      speed = require('../assets/meteor_speed1.gif');
      size = 200;
    }
    return (
      <View>
        <ImageBackground source={bg_image} style={styles.backgroundImage}>
          <View style={styles.gifContainer}>
            <Image
              source={speed}
              style={{ width: size, height: size, alignSelf: 'center' }}
            />
            <View>
              <Text
                style={[styles.cardTitle, { marginTop: 200, marginLeft: 50 }]}>
                {item.name}
              </Text>
              <Text
                style={[styles.cardText, { marginTop: 20, marginLeft: 50 }]}>
                Closest To Earth 🌎 -
                {item.close_approach_data[0].close_approach_data_full}
              </Text>
              <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
                Minimum Diamter (Km) -
                {item.estimated_diameter.kilometers.estimated_diameter_min}
              </Text>
              <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
                Maximum Diamter (km) -
                {item.estimated_diameter.kilometers.estimated_diameter_max}
              </Text>
              <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
                Velocity (km/h) -
                {
                  item.close_approach_data[0].relative_velocity
                    .kilometers_per_hour
                }
              </Text>
              <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
                Missing Earth By (km) -
                {item.close_approach_data[0].miss_distance.kilometers}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };
  render() {
    if (Object.keys(this.state.meteors).length === 0) {
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
      let meteor_arr = Object.keys(this.state.meteors).map((meteor_date) => {
        return this.state.meteors[meteor_date];
      });
      let meteors = [].concat.apply([], meteor_arr);
      //let = var
      meteors.forEach(function (element) {
        let diameter =
          (element.estimated_diameter.kilometers.estimated_diameter_min +
            element.estimated_diameter.kilometers.estimated_diameter_max) /
          2;
        let threatScore =
          (diameter / element.close_approach_data[0].miss_distance.kilometers) *
          1000000000;
        element.threat_score = threatScore;
      });
      meteors.sort(function (a, b) {
        return b.threat_score - a.threat_score;
      });
      meteors = meteors.slice(0, 5);
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.iosSafeArea} />
          <FlatList
            keyExtractor={this.keyExtractor}
            data={meteors}
            renderItem={this.renderItem}
            horizontal={true}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iosSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  cardTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  cardText: {
    color: 'white',
  },

  gifContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
