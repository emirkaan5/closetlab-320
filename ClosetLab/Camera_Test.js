//Adapted from:
//https://docs.expo.dev/versions/latest/sdk/camera/#example-appjson-with-config-plugin
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useState } from 'react';
import { SafeAreaView, Button, StyleSheet, Text, Pressable, View } from 'react-native';
import {useNavigation} from '@react-navigation/native';


//messages

const giveCamPermissionMessage = "We need your permission to use your camera."
const giveCamPermissionButton = "Grant permission!"

const recentPhotoURI = [];

export const usePhotoGallery = () => {
  //const [recentPhotoURI, setRecentPhotoURI] = useState(["test"]); 
  
  //returns last taken photo URI.
  function getRecentPhoto(){
    return recentPhotoURI.length>0?recentPhotoURI[recentPhotoURI.length-1]:"";
  }
  //appends something to the end of the internal photo URI storage.
  function addPhoto(thisURI){
    return recentPhotoURI.push(thisURI);
    //return setRecentPhotoURI(recentPhotoURI.push(thisURI))
  }
  return {
    getRecentPhoto,
    addPhoto
  };
}


//Open Camera View
//This took unnecessarily long lol
export default Camera_Test = () => {
  const navigation = useNavigation();
  const onGoToHome = () => { 
    navigation.navigate('Home');
  };

  const [facing, setFacing] = useState('back'); //facing dir of camera; should only ever be "back" or "front"
  const [camera, setCamera] = useState(null); //camera object.
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    //TODO: way to exit this page without closing app
    return <SafeAreaView style={styles.container}><View /></SafeAreaView>;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet; displays a simple message prompting user to give access
    //TODO: way to exit this page without closing app
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.message}>{giveCamPermissionMessage}</Text>
          <Button onPress={requestPermission} title={giveCamPermissionButton} />
        </View>
      </SafeAreaView>
    );
  }

  function toggleCameraFacing() {
    setFacing(facing==="front" ? "back" : "front");
  }
  
  async function takePictureAndStore (){
    if (camera){
      const photoTools = usePhotoGallery();
      const newPic = await camera.takePictureAsync({
        base64:true,
        skipProcessing:true,
      });
      photoTools.addPhoto(newPic.uri)
      console.log("photo taken")
      //console.log(photoTools.getRecentPhoto())
    }
    else{
      console.log("attempted photo failed")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <CameraView style={styles.camera} facing={facing} ref={(ref) => setCamera(ref)}>
          <View style={styles.buttonContainer}>

            <Pressable style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </Pressable>
            
            <Pressable style={styles.button} onPress={takePictureAndStore}>
              <Text style={styles.text}>Take Picture</Text>
            </Pressable>
            
          </View>

          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={onGoToHome}>
              <Text style={styles.text}>Back to Home</Text>
            </Pressable>
          </View>

        </CameraView>
      </View>
    </SafeAreaView>
  );
}

//TODO: 1 file devoted to common styles across entire app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

