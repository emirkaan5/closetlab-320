import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system'; // Replaces rn-fetch-blob

// Fetch all stored keys and their corresponding image paths from AsyncStorage.
export async function getStoredImages() {
  try {
    const keys = await AsyncStorage.getAllKeys(); // Get all stored image keys
    const imageURIs = await AsyncStorage.multiGet(keys); // Retrieve all image paths as key-value pairs

    imageURIs.forEach((image) => {
      console.log('Image Key:', image[0]); // Log the key (filename)
      console.log('Image URI:', image[1]); // Log the image path (URI)
    });

    return imageURIs; // Return key-value pairs [key, uri]
  } catch (error) {
    console.log('Error loading images:', error);
  }
}

// Save image to file system and store path in AsyncStorage
export async function saveImage(imageUri) {
  const fileName = `photo_${Date.now()}.jpg`; // Create a unique file name
  const path = `${FileSystem.documentDirectory}${fileName}`; // Define local path

  try {
    // Save base64 image to file system
    await FileSystem.writeAsStringAsync(path, imageUri, { encoding: FileSystem.EncodingType.Base64 });
    console.log('Image saved to file system:', path);

    // Save file path in AsyncStorage
    await AsyncStorage.setItem(fileName, path);
    console.log('Image saved in AsyncStorage:', path);

    return path; // Return the path for further use
  } catch (error) {
    console.error('Error saving image:', error);
  }
}

// Delete image from file system and AsyncStorage
export async function deleteImage(key) {
  try {
    // Retrieve file path from AsyncStorage
    const filePath = await AsyncStorage.getItem(key);

    if (filePath) {
      // Remove image from file system
      await FileSystem.deleteAsync(filePath);
      console.log('Image deleted from file system:', filePath);

      // Remove file path from AsyncStorage
      await AsyncStorage.removeItem(key);
      console.log('Image deleted from AsyncStorage:', key);
    } else {
      console.log('No image found for the given key');
    }
  } catch (error) {
    console.error('Error deleting image:', error);
  }
}

// Clear all keys and values from AsyncStorage
export async function clearAllImages() {
  try {
    await AsyncStorage.clear();
    console.log('All images cleared from storage');
  } catch (error) {
    console.error('Error clearing image storage:', error);
  }
}

