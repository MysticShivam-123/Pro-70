import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
const bgimage=require('../assets/background2.png')
const appicon=require('../assets/appicon.png')
const appName=require('../assets/appName.png')

export default class TransactionScreen extends Component {
constructor(props) {
super(props);
this.state = {
      domState: "normal",
      hasCameraPermissions: null,
      scanned: false,
      scannedData: ""
    };
  }

  getCameraPermissions = async domState => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
      hasCameraPermissions: status === "granted",
      domState: domState,
      scanned: false
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scannedData: data,
      domState: "normal",
      scanned: true
    });
  };

  render() {
    const { domState, hasCameraPermissions, scannedData, scanned } = this.state;
    if (domState === "scanner") {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }

return (
<View style={styles.container}>
<ImageBackground source={bgimage} style={styles.bgimage}>
<View style={styles.upperContainer}>
<Image source={appicon} styles={styles.appicon}/>
<Image source={appName} styles={styles.appName}/>
</View>
<Text style={styles.text}>
{hasCameraPermissions ? scannedData : "Request for Camera Permission"}
</Text>
<TouchableOpacity
style={[styles.button, { marginTop: 25 }]}
onPress={() => this.getCameraPermissions("scanner")}
>
<Text style={styles.buttonText}>Scan QR Code</Text>
</TouchableOpacity>
</ImageBackground>
</View>
);
}
}

const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: "center",
alignItems: "center",
backgroundColor: "#5653D4"
},
text: {
color: "#ffff",
fontSize: 15
  },
  button: {
    width: "43%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F48D20",
    borderRadius: 15
},
buttonText: {
fontSize: 24,
color: "#FFFFFF"
},
bgimage:{
flex:1,
resizeMode:'cover',
justifyContent:'center'
},
upperContainer:{
flex:0.5,
justifyContent:'center',
alignItems:'center'
},
appIcon:{ width: 200,
height: 200,
resizeMode: "contain",
marginTop: 80
},
appName: { width: 80,
height: 80,
resizeMode: "contain" 
},
});
