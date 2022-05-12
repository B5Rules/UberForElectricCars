import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Pg2 from './src/pg2';
import Pg3 from './src/pg3';
import Pg4 from './src/pg4';
import Pg5 from './src/pg5';


//My snacks are at: https://expo.io/snacks/@uni


export default class App extends React.Component {
  state = {
    page: 5,
  };

  pickPageToRender = () => {
    if (this.state.page === 1){
      return (<Pg1 pageChange={(pageNum) => this.setState({page: pageNum})} />);
    }
    if (this.state.page === 2) {
      return (<Pg2 pageChange={(pageNum) => this.setState({page: pageNum})} />);
    }
    if (this.state.page === 3){
      return (<Pg3 pageChange={(pageNum) => this.setState({page: pageNum})} />);
    }
    if (this.state.page === 4){
      return (<Pg4 pageChange={(pageNum) => this.setState({page: pageNum})} />);
    }
    if (this.state.page === 5){
      return (<Pg5 pageChange={(pageNum) => this.setState({page: pageNum})} />);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.pickPageToRender()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'black',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'red',
  },
});
