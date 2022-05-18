import { StatusBar } from 'expo-status-bar';
import { StyleSheet,ImageBackground } from 'react-native';
import {useEffect} from 'react';
import { NavigationContainer,DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as NavigationBar from 'expo-navigation-bar';

import { StripeProvider } from "@stripe/stripe-react-native";


import HomeScreen from './screens/HomeScreen';
import SignInHandler from './screens/SignInHandler';
import SignUpHandler from './screens/SignUpHandler';
import ProfileSetup from './screens/ProfileSetup';
import Journal from './screens/Journal';
import Enter_kwh from './screens/Enter_kwh';
import LoadingScreen from './screens/Loadingscreen';
import StripeApp from "./screens/StripeApp";
import AddCar from "./screens/AddCar";
import CarList from "./screens/CarList";
import CarDetail from "./screens/CarDetail";
import UpdateCar from "./screens/UpdateCar";
import Pg1 from "./screens/pg1";
const ComponentStripeProvider = () => {
  return (
    <StripeProvider publishableKey="pk_test_51KvNRAKNgHgd1DYNECNL3IkZfcjDMJHNxedX6KNF854wrKXYGJupNvzqF1lL36f8X9OI1ky9NeDyZxKJ52dPcvrM00DsPmDs4r">
      <StripeApp />
    </StripeProvider>
  );
};

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
}

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(()=>{
    NavigationBar.setBackgroundColorAsync('#182724')
  },[]);
  return (
    <ImageBackground source={require('./images/streets.png')} style={styles.backgroundImage}>
      <NavigationContainer style={{backgroundColor:'transparent'}} theme={navTheme}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <Stack.Navigator>
          <Stack.Screen options={{headerShown:false}} name="SignInHandler" component={SignInHandler}/>
          <Stack.Screen options={{headerShown:false}} name="SignUpHandler" component={SignUpHandler}/>
          <Stack.Screen options={{headerShown:false}} name="HomeScreen" component={HomeScreen}/>
          <Stack.Screen options={{headerShown:false}} name="ProfileSetup" component={ProfileSetup}/>
          <Stack.Screen options={{headerShown:false}} name="Enter_kwh" component={Enter_kwh} />
          <Stack.Screen options={{headerShown:false}} name="LoadingScreen" component={LoadingScreen} />
          <Stack.Screen options={{headerShown:false}} name="Journal" component={Journal} />
          <Stack.Screen options={{headerShown:false}} name="Pay" component={ComponentStripeProvider} />
          <Stack.Screen options={{headerShown:false}} name="AddCar" component={AddCar} />
          <Stack.Screen options={{headerShown:false}} name="CarList" component={CarList} />
          <Stack.Screen options={{headerShown:false}} name="CarDetail" component={CarDetail} />
          <Stack.Screen options={{headerShown:false}} name="UpdateCar" component={UpdateCar} />
          </Stack.Navigator>
      </NavigationContainer>
    </ImageBackground> 
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode:'cover',
    height:'100%',
    width:'100%',
    backgroundColor:'#0A1613'
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});