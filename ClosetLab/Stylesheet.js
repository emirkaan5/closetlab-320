// import React, { useState } from 'react';
import { StyleSheet, Image, Platform } from "react-native";

const iconResources = {
    flip: require("./assets/buttonIcons/icon_flip.png"),
    home:require("./assets/buttonIcons/icon_home.png"),
    cam:require("./assets/buttonIcons/icon_cam.png"),
    donation_on:require("./assets/buttonIcons/icon_donation_on.png"),
    donation_off:require("./assets/buttonIcons/icon_donation_off.png"),
}
const defaultIconStyle = {
    width: 100,
    height: 100,
    borderWidth: 0,
    resizeMode: "contain",
    alignItems: 'center',
    borderColor: 'black'
}


export function generateIcon(name, optionalStyle = defaultIconStyle) {
    //console.log(name)
    
    if (!iconResources[name]){
        console.log("using favicon")
        return (<Image
            style={optionalStyle}
            resizeMode={'cover'} // cover or contain its upto you view look
            source={require("./assets/favicon.png")} />)
    }
    //console.log("using normal")
    return (<Image
        style={optionalStyle}
        resizeMode={'contain'} // cover or contain its upto you view look
        source={iconResources[name] } />)
        //source={{ uri: iconResources[name] }} />)
}


const styles = StyleSheet.create({
    spacer_row: {
        paddingHorizontal: 100,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        opacity: 0,
        borderWidth:0,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    container_test: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    container_row: {
        //flex: 1,
        margin: 0,
        flexDirection: 'row',
        alignItems: 'right',
        justifyContent: 'center',
        position: 'relative'
    },
    container_underTopRow: {
        flex: 1,
        padding: 0,
        //top:-500,
        //flexDirection: 'row',
        alignItems: 'top',
        justifyContent: 'top',
        position: 'relative'
    },
    container_camera: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        flexDirection: 'row',
        bottom: 0,
    },
    button: {
        padding: 20,
        margin: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#f0f0f0',
        backgroundColor: '#2c2c2c',
        justifyContent: 'center',
    },
    listItem: {
        padding: 20,
        margin: 10,
        justifyContent: 'left',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#022b6e',
        backgroundColor: '#bbd3fa',
    },
    button_camera: {
        backgroundColor: 'rgba(44, 44, 44, 0.2)',
        padding: 10,
        margin: 7,
        width: 'calc(100vw/6)',
        height: 'calc(100vw/6)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: StyleSheet.hairlineWidth,
    },
    button_corner: {
        width: '25%',
        height:'100%',
        //margin: 7,
        alignItems: 'center',
        justifyContent: 'center',
        //borderWidth: 5,
    },
    button_iconCorner: {
        width: 40,
        height:40,
        //margin: 7,
        alignItems: 'center',
        justifyContent: 'bottom',
        borderWidth: 0,
    },
    button_text: {
        color: 'white',
        textAlign: 'center',
    },
    camera: {
        width: '100%',
        height: '100%'
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },

    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default styles;