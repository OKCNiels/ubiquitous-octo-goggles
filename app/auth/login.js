import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import axios from "axios";
import { loginUser } from '../services/api/api';
import { loginUserAction } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Too Short!").required("Required"),
});

const loginUser2 = async (values) => { 
  const response = await axios.post('https://qamgc.solutionsokc.pe/api/login', values); 
  // const response = await axios.post('http://192.168.50.128:8000/api/login', values); 
  return response.data; 
};



export default function Login() {

    const router = useRouter();
    const dispatch = useDispatch();
    const mutation = useMutation({
      mutationFn: loginUser2,
      mutationKey:["login"]
    });
    // console.log("mutation", mutation);
    // useSelector((state) => console.log("Store dataa", state));


// --------------------------------------------- biometrico ---------------------------------------------

  const [isBiometricSupported, SetIsBiometricSupported] = useState(false);

  const fallBackToDefaultAuth = () => {
    console.log('Fallback to default auth');
  };

  const alertComponent = (title, mess,btnTxt,btnFunc) => {
    return Alert.alert( title, mess, [{ text: btnTxt, onPress: btnFunc }]);
  };

  const TwoButtonAlert = () => Alert.alert("You are logged in", "Subscribe now @omate", [
    {
      text:"Back",
      onPress: () => console.log("cancel pressed"),
      style: "cancel"
    },
    {
      text:"PROCEED", 
      onPress: () => console.log("OK pressed")
    }
  ]);
  const TwoButtonAlertCancel = () => Alert.alert("Acceso Biometrico", "Huella incorrecta intento de nuevo mas tarde", [
    // {
    //   text:"Back",
    //   onPress: () => console.log("cancel pressed"),
    //   style: "cancel"
    // },
    {
      text:"Aceptar", 
      onPress: () => console.log("OK pressed")
    }
  ]);


  useEffect(() => {
    (
      async () => {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        SetIsBiometricSupported(compatible);
      } 
    )
  } , []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {mutation?.isError  && (
        <Text style={styles.errorText}>
          credenciales invalidas
        </Text>
      )}

      {mutation?.isSuccess  && (
        <Text style={styles.successText}>
          logged in successfully
        </Text>
      )}

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={
          async (values) => {
            const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
            // console.log(isBiometricAvailable);
            
            if (!isBiometricAvailable) {
              return alertComponent(
                "Biometrico detectado", 
                "No cuenta con un detector biometrico.", 
                "OK",
                ()=> fallBackToDefaultAuth()
              );
            }
        
            let supportedBiometrics;
            if(isBiometricAvailable) {
              supportedBiometrics = await LocalAuthentication.supportedAuthenticationTypesAsync();
              // console.log('paso1', supportedBiometrics);
              
            }
        
            const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
            // console.log('paso2');
            if (!savedBiometrics) {
              return alertComponent(
                "Biometrico", 
                "No cuenta con una huella registrada.", 
                "OK",
                ()=> fallBackToDefaultAuth()
              );
            }else{
              // console.log('paso3', savedBiometrics);
            }
        
            const biometricAuth = await LocalAuthentication.authenticateAsync({
              promptMessage: "Autenticación Biométrica",
              cancelLabel: "Cancel",
              disableDeviceFallback: true,
            });
        
            if (biometricAuth) {
              // console.log('paso4', biometricAuth);
              
              // TwoButtonAlert();
              if(biometricAuth.success){
                mutation.mutateAsync(values) .then((data) => {
                  dispatch(loginUserAction(data)); 
                  router.push("/(tabs)");
                }) 
                .catch((err) => { 
                  console.log(err); 
                });
              }else{
                console.log("acceso incorrecto");
                TwoButtonAlertCancel();
              }
              
            }
          // console.log("values=", values);
          // const dataValue = values;
          // console.log("valorde la huella",handleBiometricAuth());
          
          // mutation.mutateAsync(values) .then((data) => {
          //   dispatch(loginUserAction(data)); 
          //   // router.push("/(tabs)");
          // }) 
          // .catch((err) => { 
          //   console.log(err); 
          // });


          // axios.post('http://192.168.50.128:8000/api/login', dataValue)
          //   .then(response => {
          //     console.log(response.data);
          //   })
          //   .catch(error => {
          //     console.error("Error sending data: ", error);
          //   });

          // 
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
            />
            {/* error de que no tiene un email */}
            {errors.email && touched.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />
            {/* erro de que no tiene una clave ingresada */}
            {errors.password && touched.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              {/* <Text style={styles.buttonText}>Login</Text> */}
              {mutation?.isPending ? (
                <ActivityIndicator color='#fff' />
              ):( <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={handleBiometricAuth}>
              <Entypo name='fingerprint' size={50} color="black"></Entypo>
            </TouchableOpacity> */}


          </View>
        )}
      </Formik>
    </View>
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
        form: {
        width: "100%",
    },
        input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: "#fff",
    },
        errorText: {
        color: "red",
        marginBottom: 16,
    },
        button: {
        height: 50,
        backgroundColor: "#6200ea",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginTop: 16,
    },
        buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
        successText: {
        color: "green",
        marginBottom: 18,
    },
})