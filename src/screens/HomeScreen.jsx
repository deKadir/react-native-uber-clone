import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Icon } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
//local imports

import { colors, parameters, SCREEN_WIDTH } from '../constants/styles';
import { uberOffers, carsAround } from '../constants/dummy';
import { mapStyle } from '../constants/mapStyle';
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuIcon}
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Icon
            type="material-community"
            name="menu"
            color={colors.white}
            size={40}
          />
        </TouchableOpacity>
        <ScrollView style={{ width: SCREEN_WIDTH }}>
          <Text style={styles.title}>Destress your commute</Text>
          <View>
            <View>
              <Text style={styles.caption}>
                Read a book. Take a nap. Stare out of the window.
              </Text>
              <TouchableOpacity
                style={styles.headerBtn}
                onPress={() => navigation.navigate('RequestScreen')}
              >
                <Text style={styles.headerBtnText}>Ride with uber</Text>
              </TouchableOpacity>
              <Image
                style={styles.carImg}
                source={require('../../assets/uberCar.png')}
              />
            </View>
          </View>
        </ScrollView>
        <StatusBar style="light" backgroundColor="#2058c0" translucent={true} />
      </View>
      <ScrollView style={styles.body}>
        <Offers />
        <View style={styles.destination}>
          <Text style={styles.destinationText}>Where to?</Text>
          <TouchableOpacity style={styles.destinationButton}>
            <Icon
              type="material-community"
              name="clock-time-four"
              color={colors.grey1}
              size={26}
            />
            <Text style={{ marginLeft: 5 }}>Now</Text>
            <Icon
              type="material-community"
              name="chevron-down"
              color={colors.grey1}
              size={26}
            />
          </TouchableOpacity>
        </View>
        <Address />
        <Address />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 32,
            height: 250,
          }}
        >
          <Map />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: parameters.statusBarHeight,
  },
  header: {
    backgroundColor: colors.blue,
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingTop: 5,
    width: SCREEN_WIDTH,
  },
  title: {
    color: colors.white,
    fontSize: 21,
    paddingBottom: 20,
    paddingTop: 20,
  },

  caption: {
    color: colors.white,
    fontSize: 16,
    paddingRight: 16,
  },
  headerBtn: {
    height: 40,
    width: 150,
    backgroundColor: colors.black,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  headerBtnText: { color: colors.white, fontSize: 17, marginTop: -2 },
  carImg: {
    alignSelf: 'flex-end',
    bottom: 0,
    right: 0,
  },
  body: {
    padding: 16,
  },
  destination: {
    backgroundColor: colors.grey6,
    borderRadius: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  destinationText: { fontSize: 20, color: colors.black },
  destinationButton: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  address: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  addressBody: {
    flexDirection: 'row',
  },
  addressIcon: {
    borderRadius: 99,
    padding: 12,
    backgroundColor: colors.grey6,
    marginRight: 32,
  },
});

const Offers = () => {
  return (
    <View>
      <ScrollView
        horizontal
        contentContainerStyle={{
          marginVertical: 16,
          justifyContent: 'space-between',
          flex: 1,
        }}
        bounces={false}
      >
        {uberOffers.map((item, key) => {
          return (
            <TouchableOpacity key={key} style={{ marginRight: 32 }}>
              <Image source={item.image} />
              <Text style={{ marginTop: 4 }}>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const Address = () => {
  return (
    <TouchableOpacity style={styles.address}>
      <View style={styles.addressBody}>
        <View style={styles.addressIcon}>
          <Icon
            type="material-community"
            name="map-marker"
            color={colors.black}
            size={22}
          />
        </View>
        <View style={styles.addressInfo}>
          <Text style={{ fontSize: 18, color: colors.black }}>
            32 Olivia Rd
          </Text>
          <Text style={{ color: colors.grey3 }}>
            Klipfontein 83-Ir, Boksburg
          </Text>
        </View>
      </View>
      <View>
        <Icon
          type="material-community"
          name="chevron-right"
          color={colors.grey}
          size={26}
        />
      </View>
    </TouchableOpacity>
  );
};

const Map = () => {
  const map = useRef(1);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({});
      setLatLng({ latitude, longitude });
    })();
  }, []);
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      ref={map}
      style={{
        height: '100%',
        marginVertical: 0,
        width: '100%',
      }}
      customMapStyle={mapStyle}
      showsUserLocation={true}
      followsUserLocation={true}
    >
      {carsAround.map((item, k) => {
        return (
          <MapView.Marker coordinate={item} key={k}>
            <Image
              source={require('../../assets/carMarker.png')}
              style={{ width: 28, height: 12 }}
              resizeMode="cover"
            />
          </MapView.Marker>
        );
      })}
    </MapView>
  );
};
