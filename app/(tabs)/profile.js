import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction } from '../redux/authSlice';
import ProtectRoute from '../../components/ProtectRoute';
import * as Device from 'expo-device'
import * as Network from 'expo-network';

export default function Profile() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <ProtectRoute>
      <View style={styles.container}>
        <Text style={styles.title}>Tu perfil</Text>
        {user ? (
          <>
            <Text style={styles.text}>Email: {user.usuario.email}</Text>
            {/* <Text style={styles.text}>modelo: {Device.modelName}</Text>
            <Text style={styles.text}>marca : {Device.brand}</Text>
            <Text style={styles.text}>nombre del dispositivo cuando se diseñó : {Device.designName}</Text>
            <Text style={styles.text}>nombre legible por humanos del dispositivo : {Device.deviceName}</Text>
            <Text style={styles.text}>fabricante real del dispositivo del producto o hardware : {Device.manufacturer}</Text>

            <Text style={styles.title}>Nombre de la Red Wi-Fi: {wifiName}</Text> */}


            {/* <TouchableOpacity style={styles.button} onPress={(handleLogout)}>
              <Text style={styles.buttonText}>Cerrar sesión</Text>

              
            </TouchableOpacity> */}
          </>
        ) : (
          <Text style={styles.text}>No user logged in</Text>
        )}
      </View>
    </ProtectRoute>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  text: {
    fontSize: 18,
    marginBottom: 16,
  },
  button: {
    height: 50,
    backgroundColor: "#6200ea",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
})