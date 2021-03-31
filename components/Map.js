import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { animateCamera, getCamera , Marker } from 'react-native-maps';
import Navigation from './Navigation';
import redArrow from '../assets/red_arrow.png'

const STORE_LOCATION = { latitude: 26.286637840478523, longitude: -80.20009302407799 };

export default function Map () {

    const _map = useRef(null);
    const [ navigate, setNavigate ] = useState(false);
    const [ position, setPosition ] = useState(STORE_LOCATION);
    const [ compass, setCompass ] = useState();
    const [ region, setRegion ] = useState({
        latitude: position.latitude,
        longitude: position.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    useEffect(() => {
        if(navigate){
            if(_map.current){
                _map.current.animateCamera({
                    center: {
                        latitude: position.latitude,
                        longitude: position.longitude
                        },
                    zoom: 15,
                    heading: compass.magHeading
                    }, 5000
                );
            }
        }
    }, [position]);
    
    return (
        <View style={styles.container}>
            <Text>LAT: { position.latitude } LNG: { position.longitude}</Text>
            <MapView 
            style={styles.map} 
            initialRegion={region}
            rotateEnabled={true} 
            showsCompass={true} 
            ref={_map}
            >
                <Marker
                    coordinate={position}
                    image={redArrow}
                />
            </MapView>
            <Navigation 
            setPosition={ setPosition } 
            setCompass={ setCompass } 
            setNavigate={ setNavigate }
            navigate={ navigate }/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height - 30,
    },
    button: {
        position: "absolute",
        bottom: 40
    }
});