import React, { Component } from 'react'
import { Alert, TouchableOpacity, TextInput, ImageBackground, Image, Text, View, StyleSheet } from 'react-native';
import iconProfil from '../assets/iconProfil.png';
import imgBack from '../assets/backgroundImg.png';
import iconMasina from '../assets/bmw.png';
import iconMasina1 from '../assets/bmw1.png';
import iconMasina2 from '../assets/bmw2.png';
import iconMasina3 from '../assets/bmw3.png';
import Add from '../assets/Add.png';
import { clearUpdateCacheExperimentalAsync } from 'expo-updates';
import { httpsCallable } from 'firebase/functions';
import { fireFunc } from '../firebase';
const UpdateCar = httpsCallable(fireFunc, 'updateCar')
export default class Pg5 extends React.Component {

    state = {
        nume: '',
        distantaMax: '',
        capacBaterie: '',
        culoare: '',
        numarKm: '',
        caiPutere: ''
    }
    eroare = {
        camp1: '',
        camp2: '',
        camp3: '',
        camp4: '',
        camp5: '',
        camp6: '',
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
    validForm = () => {
        //Eroare nume 
        if (this.state.nume.length > 11) {
            this.eroare.camp1 = "Maxim 10 caractere"
        }
        else {
            this.eroare.camp1 = ''
        }
        //Eroare distanta
        var n = Number(this.state.distantaMax);
        if (isNaN(n)) {
            this.eroare.camp2 = "Distanta gresita"
        }
        else {
            this.eroare.camp2 = ''
        }
        if (this.state.distantaMax[0] == '0') {
            this.eroare.camp2 = "Distanta gresita"
        }
        //Eroare baterie
        n = Number(this.state.capacBaterie)
        if (this.state.capacBaterie.length > 6 || (isNaN(n) || this.state.capacBaterie[0] == '0')) {
            this.eroare.camp3 = "Valoare gresita"
        }
        else {
            this.eroare.camp3 = ''
        }
        //Eroare culoare
        //Eroare nrkm
        n = Number(this.state.numarKm)
        if (isNaN(n) || (this.state.numarKm[0] == '0' && this.state.numarKm.length > 1)) {
            this.eroare.camp5 = "Kilometraj gresit"
        }
        else {
            this.eroare.camp5 = ''
        }
        //Eroare CaiPutere
        n = Number(this.state.caiPutere)
        if (isNaN(n) == true) {
            this.eroare.camp6 = "Valoare gresita"
        }
        else {
            if (n < 50 && (this.state.caiPutere != '')) {
                this.eroare.camp6 = "Valoare prea mica"
            }
            else {
                this.eroare.camp6 = ''
            }
        }
        return true;
    }
    login = (nume, distantaMax, capacBaterie, culoare, numarKm, caiPutere,) => {//ce fac cu ce am extras
        var campuri_necompletate = 0;
        var fara_erori = 0;
        if (nume == '' || distantaMax == '' || caiPutere == '' || capacBaterie == '' || numarKm == '' || caiPutere == '') {
            campuri_necompletate = 1;
        }
        if ((this.eroare.camp1 == '') && (this.eroare.camp2 == '') && (this.eroare.camp3 == '') && (this.eroare.camp4 == '') && (this.eroare.camp5 == '') && (this.eroare.camp6 == '')) {
            fara_erori = 1;
        }
        if ((fara_erori == 1) && (campuri_necompletate == 0)) {
            alert("Succer");
        }
        if (campuri_necompletate == 1) {
            alert("Campuri necompletate");
        }
        if (fara_erori == 0) {
            alert("Erori");
        }
        console.log(this.state)
    }
    function
    render() {
        this.state = this.props.route.params;
        return (
            <View style={styles.container}>
                <ImageBackground source={imgBack} resizeMode="cover" style={styles.bgImage}>
                    <View style={styles.container}>
                        <View style={styles.container2}>
                            <Image source={iconProfil} style={styles.imagine1} />
                            <View style={styles.container3}>
                                <Text style={styles.text1}>Beneficiary Uster</Text>
                                <Text style={styles.text2}>Pavel Silviu</Text>
                            </View>
                        </View>
                        <View style={styles.containerJos}>
                            <View style={styles.containerJos0}>
                                <Text style={styles.text3}>Detalii masina</Text>
                            </View>
                            <View style={styles.containerJos1}>
                                <View style={styles.paddingMasina}>
                                    <Image source={iconMasina} style={styles.iconMasinaa} />
                                </View>

                                <View style={styles.containerForm}>
                                    <TextInput style={styles.input}
                                        underlineColorAndroid="transparent"
                                        placeholder="Nume masina"
                                        placeholderTextColor="white"
                                        autoCapitalize="none"
                                        defaultValue={this.state.name}
                                        onChangeText={this.handleNume} />
                                    {this.validForm() ? <Text style={{ color: 'red' }}>{this.eroare.camp1}</Text> : null}
                                    <View style={styles.separator}></View>

                                    <TextInput style={styles.input}
                                        underlineColorAndroid="transparent"
                                        placeholder="Distanta maxima (km)"
                                        placeholderTextColor="white"
                                        autoCapitalize="none"
                                        defaultValue={this.state.distantaMax}
                                        onChangeText={this.handledistantaMax} />
                                    {this.validForm() ? <Text style={{ color: 'red' }}>{this.eroare.camp2}</Text> : null}
                                    <View style={styles.separator}></View>

                                    <TextInput style={styles.input}
                                        underlineColorAndroid="transparent"
                                        placeholder="Capacitate baterie"
                                        placeholderTextColor="white"
                                        autoCapitalize="none"
                                        defaultValue={this.state.capacBaterie}
                                        onChangeText={this.handlecapacBaterie} />
                                    {this.validForm() ? <Text style={{ color: 'red' }}>{this.eroare.camp3}</Text> : null}
                                    <View style={styles.separator}></View>

                                    <TextInput style={styles.input}
                                        underlineColorAndroid="transparent"
                                        placeholder="Culoare"
                                        placeholderTextColor="white"
                                        autoCapitalize="none"
                                        defaultValue={this.state.color}
                                        onChangeText={this.handleculoare} />
                                    {this.validForm() ? <Text style={{ color: 'red' }}>{this.eroare.camp4}</Text> : null}
                                    <View style={styles.separator}></View>

                                    <TextInput style={styles.input}
                                        underlineColorAndroid="transparent"
                                        placeholder="Numar km"
                                        placeholderTextColor="white"
                                        autoCapitalize="none"
                                        defaultValue={this.state.numarKm}
                                        onChangeText={this.handlenumarKm} />
                                    {this.validForm() ? <Text style={{ color: 'red' }}>{this.eroare.camp5}</Text> : null}
                                    <View style={styles.separator}></View>

                                    <TextInput style={styles.input}
                                        underlineColorAndroid="transparent"
                                        placeholder="Cai putere"
                                        placeholderTextColor="white"
                                        autoCapitalize="none"
                                        defaultValue={this.state.caiPutere}
                                        onChangeText={this.handlecaiPutere} />
                                    {this.validForm() ? <Text style={{ color: 'red' }}>{this.eroare.camp6}</Text> : null}
                                    <View style={styles.galerieMasini}>
                                        <Image source={iconMasina1} style={styles.imgMasinaGalerie} />
                                        <Image source={iconMasina2} style={styles.imgMasinaGalerie} />
                                        <Image source={iconMasina3} style={styles.imgMasinaGalerie} />
                                        <View style={styles.imgMasinaGalerie2}>
                                            <Image source={Add} style={styles.Add} />
                                        </View>

                                    </View>


                                    <TouchableOpacity
                                        style={styles.submitButton}
                                        onPress={
                                            async() => //this.login(this.state.name, this.state.distantaMax, this.state.capacBaterie, this.state.culoare, this.state.numarKm, this.state.caiPutere)
                                            {
                                                await UpdateCar(this.state);
                                                setTimeout(() =>this.props.navigation.navigate('CarList'), 1000);
                                            }
                                        }>
                                        <Text style={styles.submitButtonText}> TRIMITE </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.containerJos2}>

                            </View>
                        </View>
                        {/* <TouchableOpacity onPress={()=> this.props.pageChange(2)}>
                <Text style={styles.textInainte}>
                    Go to page 2
                </Text>
                </TouchableOpacity> */}

                    </View>
                </ImageBackground>
                {/* <Text> page 2</Text>
        <TouchableOpacity onPress={()=> this.props.pageChange(1)}>
          <Text>
            Go to page 1
          </Text>
        </TouchableOpacity> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "black"
    },
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'flex-start',
        // paddingTop: Constants.statusBarHeight,
        // padding: 8,
    },
    containerJos: {
        padding: '5%',
        flexDirection: "column",
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    containerJos0: {
        flex: 0.05,
        paddingBottom: 10,
        flexDirection: "row",
        justifyContent: 'flex-start',
        width: '95%',
        alignItems: 'center',
    },
    containerJos1: {
        flex: 0.95,
        flexDirection: "column",
        backgroundColor: 'rgba(24, 39, 36, 1)',
        borderRadius: 20,
        width: '95%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    containerJos2: {
        flex: 0,
    },
    container2: {
        flexDirection: "row",
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    container3: {
        flexDirection: "column",
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagine1: {
        resizeMode: 'contain',
        aspectRatio: 1 // Your aspect ratio
    },
    text1: {
        color: 'white',
        fontSize: 16,
    },
    text2: {
        color: 'white',
        fontSize: 24,
        fontWeight: "700",
    },
    text3: {
        color: 'white',
        fontSize: 14,
        fontWeight: "600",
    },
    textInainte: {
        marginLeft: '4%',
        fontSize: 16,
        color: 'white',
    },
    iconMasinaa: {
        resizeMode: 'contain',
        height: 60,
    },
    paddingMasina: {
        display: 'flex',
        height: 80,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 0,
        // backgroundColor:'red',
    },
    //stil form
    galerieMasini: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '90%',
        height: '38%',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 20,
    },
    imgMasinaGalerie: {
        marginRight: 10,
        marginBottom: 10,
        width: 100,
        height: 50,
    },
    imgMasinaGalerie2: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginBottom: 10,
        width: 100,
        height: 50,
    },
    Add: {

    },
    containerForm: {
        flexDirection: "column",
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    input: {
        backgroundColor: 'black',
        height: 24,
        margin: 0,
        borderWidth: 1,
        paddingLeft: 7,
        color: "white",
        // borderColor: 'green',
        width: '90%',
    },
    separator: {
        borderBottomColor: 'white',
        width: '90%',
        borderBottomWidth: 0.5,
        // borderBottomWidth: StyleSheet.hairlineWidth,
    },
    submitButton: {
        marginTop: 7,
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: 'rgba(1, 167, 143, 1)',
        width: '90%',
        borderRadius: 61,
    },
    submitButtonText: {
        textAlign: 'center',
        fontSize: 10,
        color: 'white'
    },
});