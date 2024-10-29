# closetlab-320
This is the repository for Closet Lab, our CS 320 project.

## Installation Notes

```cd ClosetLab```

Do all of the following in the Closet Lab directory.

```npx expo start```

Runs app. Press w to open web server, a to open Android (might not be implemented yet?), and i to open iOS simulator (this requires having MacOS with Xcode and an iOS simulator installed and open). If you have an Android phone, you can also use the Expo Go app to scan the provided QR code to run the app on your physical device.

Also, if you get an error that looks like this...

<img src="react_native_error_1.png" width="300">

... then run `npm uninstall watchman`. This fixed the error for me, I have no idea why.