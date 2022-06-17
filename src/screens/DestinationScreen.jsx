import React, { useContext, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

//local imports
import {
  colors,
  parameters,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from './../constants/styles';
import { useEffect } from 'react';
import { OriginContext } from '../context/Contexts';
const DestinationScreen = ({ navigation }) => {
  const textInput = useRef(4);
  const textInput1 = useRef(5);
  const { setOrigin, setDestination } = useContext(OriginContext);
  useEffect(() => {
    //fake origin data since i didnt create billing account to google maps API
    setOrigin({
      latitude: 37.02916645896905,
      longitude: 35.3129580570009,
      address: 'Duygu Cafe',
    });
    //fake destination data since i didnt create billing account to google maps API
    setDestination({
      latitude: 37.03259243826138,
      longitude: 35.3135588718108,
      address: 'Iller bankası Kavşağı',
    });
    setTimeout(() => {
      navigation.goBack();
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.headerLeftIcon}
            onPress={() => navigation.goBack()}
          >
            <Icon
              type="material-community"
              name="arrow-left"
              size={32}
              color={colors.grey1}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1 }}>
            <View style={styles.headerTopContent}>
              <Avatar
                rounded
                size={30}
                source={require('../../assets/blankProfilePic.jpg')}
              />
              <Text style={{ marginLeft: 5 }}>For someone</Text>
              <Icon
                type="material-community"
                name="chevron-down"
                color={colors.grey1}
                size={26}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <GooglePlacesAutocomplete
        nearbyPlacesAPI="GooglePlacesSearch"
        placeholder="Going to..."
        listViewDisplayed="auto"
        debounce={400}
        currentLocation={true}
        ref={textInput1}
        minLength={2}
        enablePoweredByContainer={false}
        fetchDetails={false}
        styles={autoComplete}
        autoFocus={true}
        query={{
          key: 'AIzaSyBmSVTBSf7g6EvH8v9iVhXgWEiwBcfOAdM',
          language: 'en',
        }}
        onPress={(data, details = null) => {
          console.log(data, details);
          //if we add billing, real data will be printed
        }}
        onFail={(e) => {
          console.error(e);
        }}
      />
    </View>
  );
};

export default DestinationScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: parameters.statusBarHeight,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'relative',
    backgroundColor: colors.white,
  },

  headerTop: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  headerLeftIcon: {
    position: 'absolute',
    left: 0,
    zIndex: 10,
    padding: 5,
  },
  headerTopContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

const autoComplete = {
  textInput: {
    backgroundColor: colors.grey6,
    height: 50,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
    borderWidth: 1,
    marginHorizontal: 15,
  },
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: colors.white,
  },

  textInputContainer: {
    flexDirection: 'row',
  },
};
