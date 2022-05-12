import React, { Component } from 'react'
import {useState} from 'react';
import { Alert, TouchableOpacity, TextInput, ImageBackground, Image, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import iconProfil from '../assets/iconProfil.png'; 
import imgBack from '../assets/backgroundImg.png';
import {fireAuth, fireFunc} from '../firebase';
import {httpsCallable} from 'firebase/functions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
const addCar=httpsCallable(fireFunc,'addCar');



export default class Pg4 extends React.Component {
  state = {
    nume: '',
    distantaMax: '',
    capacBaterie: '',
    culoare: '',
    numarKm: '',
    caiPutere:''
 }
 handleNume = (text) => {
    this.setState({ nume: text })
 }
 handledistantaMax = (text) => {
    this.setState({ distantaMax: text })
 }
 handlecapacBaterie = (text) => {
   this.setState({ capacBaterie: text })
 }
 handleculoare = (text) => {
   this.setState({ culoare: text })
 }
 handlenumarKm = (text) => {
   this.setState({ numarKm: text })
 }
 handlecaiPutere = (text) => {
   this.setState({ caiPutere: text })
 }

  render() {
    return (
      <ImageBackground source={imgBack} resizeMode="cover" style={styles.bgImage}>
        <View style={styles.container}>
            <View style={styles.container2}>
                <Image source={iconProfil} style={styles.imagine1} /> 
                <View style={styles.container3}>
                    <Text style={styles.text1}>Beneficiary Uster</Text>
                    <Text style={styles.text2}>Pavel Silviu</Text>
                </View>
            </View>
            <View style = {styles.containerForm}>
           <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Nume masina"
              placeholderTextColor = "white"
              autoCapitalize = "none"
              onChangeText = {this.handleNume}/>

           <View style={styles.separator}></View>

           <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Distanta maxima (km)"
              placeholderTextColor = "white"
              autoCapitalize = "none"
              onChangeText = {this.handledistantaMax}/>

           <View style={styles.separator}></View>

           <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Capacitate baterie"
              placeholderTextColor = "white"
              autoCapitalize = "none"
              onChangeText = {this.handlecapacBaterie}/>

           <View style={styles.separator}></View>

           <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Culoare"
              placeholderTextColor = "white"
              autoCapitalize = "none"
              onChangeText = {this.handleculoare}/>

           <View style={styles.separator}></View>

           <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Numar km"
              placeholderTextColor = "white"
              autoCapitalize = "none"
              onChangeText = {this.handlenumarKm}/>

           <View style={styles.separator}></View>

           <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Cai putere"
              placeholderTextColor = "white"
              autoCapitalize = "none"
              onChangeText = {this.handlecaiPutere}/>

           <View style={styles.separator}></View>

           <TouchableOpacity
              style = {styles.submitButton}
              onPress = {
                 async () => {//this.login(this.state.nume, this.state.distantaMax, this.state.capacBaterie, this.state.culoare, this.state.numarKm, this.state.caiPutere)
                         await addCar(this.state);
                       this.props.navigation.navigate('CarList');
                }
                }>
              <Text style = {styles.submitButtonText}> TRIMITE </Text>
           </TouchableOpacity>
        </View>
            {/* <TouchableOpacity onPress={()=> this.props.pageChange(2)}>
            <Text style={styles.textInainte}>
                Go to page 2
            </Text>
            </TouchableOpacity> */}

        </View>
      </ImageBackground>
    );
  }
}




const styles = StyleSheet.create({
  bgImage:{
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex:1,
    flexDirection:"column",
    justifyContent: 'flex-start',
    // paddingTop: Constants.statusBarHeight,
    // padding: 8,
  },
  container2:{
    flexDirection:"row",
    flex:0.2,
    justifyContent: 'center',
    alignItems:'center',
    marginTop: 10,
  },
  container3:{
    flexDirection:"column",
    flex:0.5,
    justifyContent: 'center',
    alignItems:'center',
  },
  imagine1:{
    marginLeft:10,
    resizeMode: 'contain',
    flex: 0.2,
    aspectRatio: 1 // Your aspect ratio
  },
  text1:{
    color:'white',
    fontSize:16,
  },
  text2:{
    color:'white',
    fontSize:24,
    fontWeight:"700",
  },
  textInainte:{
    marginLeft:'4%',
    fontSize:16,
    color:'white',
  },
  //stil form
  containerForm:{
    flexDirection:"column",
    flex:1,
    justifyContent: 'flex-start',
    alignItems:'center',
  },
  input: {
    backgroundColor: 'rgba(40, 47, 45, 1)',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "white",
    // borderColor: 'green',
    width:'90%',
  },
  separator: {
    borderBottomColor: 'white',
    width: '90%',
    borderBottomWidth:0.5,
    // borderBottomWidth: StyleSheet.hairlineWidth,
  },
  submitButton:{
    backgroundColor: 'rgba(1, 167, 143, 1)',
    padding: 10,
    margin: 15,
    width:'90%',
    borderRadius:61,
  },
  submitButtonText:{
    textAlign:'center',
    fontSize:20,
    color:'white'
  },
});
