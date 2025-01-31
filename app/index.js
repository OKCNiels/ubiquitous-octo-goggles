import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { ResizeMode, Video } from 'expo-av';
import { useRouter } from 'expo-router';
import logoMGC from '../assets/mgc_logo.png';
// import { useRouter } from "expo-router";

export default function Home() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* <Video ref={video}
      style={styles.video}
      source={{
        uri:"https://videos.pexels.com/video-files/5377700/5377700-sd_540_960_25fps.mp4",
      }}
      risizeMode={ResizeMode.COVER}
      shouldPlay
      isLooping
      ></Video> */}

      <View style={{justifyContent: "center",
    alignItems: "center",}}>
        <Image source={require('../assets/mgc_logo.png')} style={{width: 300, height: 300}} />
        {/* <Text style={styles.mainText}>MGC</Text>
        <Text style={styles.subText}>Aplicativo movil</Text> */}
        {/* <Text style={styles.tagline}>Build Apps, Build Futures</Text> */}
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/auth/login")}
        >
          <Text style={styles.buttonText}>IngresarR</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/auth/register")}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  mainText: {
    color: "white",
    fontSize: 68,
    fontWeight: "bold",
    textAlign: "center",
  },
  subText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  tagline: {
    color: "white",
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
  },
  button: {
    backgroundColor: "#6200ea",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3, // Adds a shadow effect on Android
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
})