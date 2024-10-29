import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, Pressable, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePhotoGallery } from './Camera_Test.js';
import styles from './Stylesheet';
import { logFetch, getItem, postItem, deleteItem } from './APIContainer.js';


//Base Home Tab. This also serves as a template for a basic tab. 
export default Home = () => {
    const navigation = useNavigation();
    const photoTools = usePhotoGallery();
    const [imageElement, setImageElement] = useState(<Text >No Recent Image</Text>);
    const onGoToCamera = () => {
        navigation.navigate('Camera');
    };
    const onGoToClothingItemTest = () => {
        navigation.navigate('Clothing Item View');
    };
    function getRecentTakenPhoto() {
        const maybeURI = photoTools.getRecentPhoto();
        if (maybeURI) {

            setImageElement(<Image style={
                {
                    width: 300,
                    height: 300,
                    resizeMode: "contain",
                    borderWidth: 1,
                    borderColor: 'red'
                }
            }
                source={{ uri: maybeURI }} />)
        }
        else {
            //console.log("uri unavailable")
            setImageElement(<View>
                <Text >No Recent Image!</Text>
            </View>)

        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {imageElement}
            <Pressable style={styles.button} onPress={getRecentTakenPhoto}>
                <Text style={styles.button_text}>Update Image</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={onGoToCamera}>
                <Text style={styles.button_text}>Go to video camera</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={onGoToClothingItemTest}>
                <Text style={styles.button_text}>Go to clothing item test</Text>
            </Pressable>
        
        </SafeAreaView>
    );
};