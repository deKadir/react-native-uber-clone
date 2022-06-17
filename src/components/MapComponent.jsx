import React, { useRef, useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Image } from 'react-native';
//local imports

import { carsAround } from '../constants/dummy';
import { mapStyle } from './../constants/mapStyle';
const MapComponent = () => {
  const [latLng, setLatLng] = useState({});
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

export default MapComponent;
