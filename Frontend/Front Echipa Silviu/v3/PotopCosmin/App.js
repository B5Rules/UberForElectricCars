
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

console.ignoredYellowBox=['Setting a timer'];

import SignIn from './Pages/Sign_In'
import SignUp from './Pages/Sign_Up'
import ViewProfile from './Pages/Profile/View_Profile'
import EditProfile from './Pages/Profile/Edit_Profile'
import DeleteAccount from './Pages/Profile/Delete_Account'
 import UpdateCar from'./paginiSilviu/UpdateCar'
import CarList from './paginiSilviu/CarList'; 
import CarDetail from './paginiSilviu/CarDetail';
import AddCar from './paginiSilviu/AddCar';
const Stack = createNativeStackNavigator();
 
export default function App() {

  return( 
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CarList"
        screenOptions={{
          headerStyle: {
            backgroundColor: "transparent"
          },
          headerTintColor: "#f1f1f1",
          headerTransparent: true,
          headerTitle: ""
        }}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen options={{headerTintColor: "#f1f1f1"}} name="SignUp" component={SignUp} />
        <Stack.Screen name="ViewProfile" component={ViewProfile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
        <Stack.Screen name="CarDetail" component={CarDetail}/>
        <Stack.Screen name="CarList" component={CarList}/>
        <Stack.Screen name="AddCar" component={AddCar}/>
        <Stack.Screen name="UpdateCar" component={UpdateCar}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}