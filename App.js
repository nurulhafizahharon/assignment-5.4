import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { Camera } from "expo-camera";

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={"1:1"}
        />
      </View>
      <Button
        title="Flip Image"
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      ></Button>
      <Button title="Take Picture" onPress={() => takePicture()} />
      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});

// import { StatusBar } from "expo-status-bar";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Button,
//   TochableOpacity,
//   TouchableOpacity,
// } from "react-native";
// import { useEffect, useState } from "react";
// import { Camera, CameraType } from "expo-camera";

// export default function App() {
//   const [type, setType] = useState(CameraType.back);
//   const [permission, requestPermission] = Camera.useCameraPermissions();
//   const [startCamera, setStartCamera] = useState(false);

//   // Checks component state for camera access permission
//   if (!permission) {
//     return <Text>Requesting for camera permission</Text>;
//   }
//   if (!permission.granted) {
//     return <Text>No access to camera</Text>;
//   }

//   function toggleCameraType() {
//     setType((current) =>
//       current === CameraType.back ? CameraType.font : CameraType.back
//     );
//   }

//   function startCamera)()

//   return (
//     <View style={styles.container}>
//         <View style={styles.container}>
//           <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
//             <Text>Take Picture</Text>
//           </TouchableOpacity>
//         </View>
//         <StatusBar style="auto"/>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   button: {
//     width: 130,
//     borderRadius: 4,
//     backgroundColor: "#14274e",
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     height: 40,
//   },
//   text: {
//     color: '#fff',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });
