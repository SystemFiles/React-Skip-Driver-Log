import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  YellowBox,
} from 'react-native';

// SIDE MENU IMPORT
import SideMenu from 'react-native-side-menu';

// REDUX IMPORTS
import { connect } from 'react-redux';
import { addRecord } from '../actions/index';
import { openDatabase } from '../actions/index';

// REALM IMPORTS
const Realm = require('realm');
import { DB_PATH } from '../realm/info';
import { RECORD_SCHEMA } from '../realm/schemas';

import Icon from 'react-native-vector-icons/Ionicons';

import LinearGradient from 'react-native-linear-gradient';
import SpecialInput from '../components/SpecialInput';
import DateTimePicker from 'react-native-modal-datetime-picker';
import SpecialText from '../components/SpecialText';
import GenericButton from '../components/GenericButton';

// Modal to show error and info messages
import Modal from "react-native-modal";

const devWidth = Dimensions.get('window').width;
const devHeight = Dimensions.get('window').height;

class MainScreen extends Component {
// State stuff
state = {
  date: 'Date',
  dateColor: 'rgba(255,255,255,0.6)',
  starting: '',
  ending: '',
  gasPriceCurrent: '',
  shiftEarn: '',
  visible: false, // Visibility of the customized date picker component
  inputError: {
    visible: false,
    message: 'Unknown error ocurred!'
  },
  menuOpen: false
}

componentWillMount() {
  if (!this.database) {
    Realm.open({
      path: DB_PATH,
      schema: [RECORD_SCHEMA]
    }).then(realm => {
      console.log("Opened Realm DB");
      this.props.openDatabase(realm);
      console.log("Added database reference to redux");
    }).catch(err => {
      console.log("Error occured in realmDB: " + err);
    });

    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);
  }
}

// UTILITIES //
validEntry = (start, end, price, shiftEarn) => {
  if (this.stringifyNumbers(start).length == 0) {
    return ({
      valid: false,
      message: 'Entry for starting KM reading is invalid.\nRemember, \nyou need to enter only numbers from 1-999!'
    });
  } else if (this.stringifyNumbers(end).length == 0) {
    return ({
      valid: false,
      message: 'Entry for ending KM reading is invalid.\nRemember, \nyou need to enter only numbers from 1-999!'
    });
  } else if (this.stringifyNumbers(price).length == 0 || !this.stringifyNumbers(price).includes('.')) {
    return ({
      valid: false,
      message: 'Entry for current gas price is incorrect.\nPlease follow this format: \nIII.I eg: 116.4 or 135.2'
    });
  } else if (this.stringifyNumbers(shiftEarn).length == 0) {
    return ({
      valid: false,
      message: 'Entry for shift earnings is invalid. \nPlease enter a valid dollar amount!'
    });
  }

  return ({
    valid: true,
    message: ''
  });
}

resetInput = () => {
  this.setState({
    date: 'Date',
    dateColor: 'rgba(255,255,255,0.6)',
    starting: '',
    ending: '',
    shiftEarn: '',
    gasPriceCurrent: '',
    visible: false,
  });
}

stringifyNumbers = (inputObj) => {
  return inputObj.toString().replace(/[^0-9.]/g, '')
}

// HANDLERS & PROGRAM LOGIC
handleDateConfirm = value => {
  this.setState({
    date: value.toString().substring(4, 15),
    dateColor: 'rgba(255,255,255,1)'
  });
  
  // Hide the date picker
  this.hideDatePicker();
}

handleStartChange = (event) => {
  this.setState({
    starting: event.nativeEvent.text
  });
}

handleEndChange = (event) => {
  this.setState({
    ending: event.nativeEvent.text
  });
}

handleGasChange = (event) => {
  this.setState({
    gasPriceCurrent: event.nativeEvent.text
  });
}

handleShiftEarnChange = (event) => {
  this.setState({
    shiftEarn: event.nativeEvent.text
  });
}

hideDatePicker = () => {
  this.setState({
    visible: false
  });
}

showDateTimePicker = () => {
  this.setState({ 
    visible: true,
    dateColor: 'rgba(255,255,255,0.6)'
  });
}

recordEntry = () => {
  const record = {
    date: this.state.date,
    startKM: this.state.starting,
    endKM: this.state.ending,
    curPrice: this.state.gasPriceCurrent,
    shiftEarn: this.state.shiftEarn
  }

  // Validate entry
  var validator = this.validEntry(record.startKM, record.endKM, record.curPrice, record.shiftEarn);
  if (!validator.valid) {
    this.setState({
      inputError: {
        visible: true,
        message: 'Error: ' + validator.message
      }
    });
  } else {
    // Add the record to redux store
    this.props.addRecord(record);
    // Now go to confirmation
    this.props.navigation.navigate('CostAnalysis');
  }

  // Reset input fields after recording entry
  this.resetInput();
}

// Open help screen
openHelp() {
  this.props.navigation.navigate('HelpInfo', );
}

// RENDER SCREEN
render() {
  // The navigation menu to be shown
  const menu = (<View style={{
    backgroundColor: '#f0f0f0', 
    alignContent: 'center', 
    textAlign: 'center', height: '100%', width: '100%', paddingTop: '40%'}}>
    <Text style={styles.menuTitle}>{'S K I P\nD R I V E R\nL O G'}</Text>
    <TouchableOpacity onPress={() => {
      this.setState({menuOpen: false});
      this.props.navigation.navigate('Home');}}>
      <Text style={styles.menuItem}>HOME</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {
      this.setState({menuOpen: false});
      this.props.navigation.navigate('DriverLog');}}>
      <Text style={styles.menuItem}>DRIVING LOG</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {
      this.setState({menuOpen: false});
      this.props.navigation.navigate('Overview');}}>
        <Text style={styles.menuItem}>OVERVIEW</Text>
    </TouchableOpacity>
  </View>);

  // Return actual screen
  return (
    <SideMenu menu={menu} isOpen={this.state.menuOpen} onCancel={() => {this.setState({menuOpen: false})}} >
        <LinearGradient 
          colors = {['#051937', '#A8EB12']}
          style ={styles.homeScreen}
          locations = {[0.23, 1]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}>

          {/* SHOW ERROR MESSAGE WHEN NEEDED */}
          <Modal isVisible={this.state.inputError.visible}
            animationIn={'zoomIn'}
            animationOut={'slideOutDown'}
            backdropColor={colors.textWhite}
            backdropOpacity={1}
            style={{width: '90%', height: 0}}
          >
            <View style={{alignSelf: 'center'}}>
              <Icon onPress={() => {this.setState({
                inputError: {
                  visible: false,
                  message: ''
                }
              })}} style={{alignSelf: 'center', marginBottom: 100, fontSize: 42}} name='ios-close-circle-outline' />
              <Text>{this.state.inputError.message}</Text>
            </View>
          </Modal>
          
          {/* HANDLE OPEN MENU BUTTON */}
          <TouchableOpacity style={{width: 30, height: 30, position: 'absolute', top: 48, left: 23}} onPress={() => {this.setState({menuOpen: true})}}>
            <Icon name='ios-menu' size={35} color={'#f0f0f0'} />
          </TouchableOpacity>

          <TouchableOpacity style={{width: 30, height: 35, position: 'absolute', top: 48, right: 23}} onPress={this.openHelp.bind(this)}>
            <Icon name='ios-information-circle-outline' size={35} color='#f0f0f0' />
          </TouchableOpacity>
          
          <Text style={styles.heading}>Let's Record</Text>
          <Text style={styles.subHeading}>
            Please start recording some trips by filling out the required data fields
          </Text>
          <View style={styles.inputContainer}>
          <TouchableOpacity onPress={this.showDateTimePicker}>
              <SpecialText
                  content = {this.state.date}
                  style={{
                    fontSize: 22,
                    color: this.state.dateColor
                  }}
              />
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.visible}
              onConfirm={this.handleDateConfirm}
              onCancel={this.hideDatePicker}
            />
            <SpecialInput
              placeholder = {"Starting"}
              iconName = 'ios-car'
              iconText= '  KM'
              maxLength={3}
              style={styles.inputStyle}
              value={this.state.starting}
              placeholderTextColor={'rgba(255,255,255, 0.6)'}
              onChange = {this.handleStartChange}
            />
            <SpecialInput
              placeholder = {"Ending"}
              iconName = 'ios-car'
              iconText= '  KM'
              maxLength={3}
              style={styles.inputStyle}
              value={this.state.ending}
              placeholderTextColor={'rgba(255,255,255, 0.6)'}
              onChange={this.handleEndChange}
            />

            <SpecialInput
              placeholder = {"Current Gas Prices"}
              iconName = 'ios-pricetags'
              iconText= '  cents'
              maxLength={5}
              style={styles.inputStyle}
              value={this.state.gasPriceCurrent}
              placeholderTextColor={'rgba(255,255,255, 0.6)'}
              onChange={this.handleGasChange}
            />

            <SpecialInput
              placeholder = {"Shift Earnings"}
              iconName = 'ios-cash'
              iconText= '  dollars'
              maxLength={6}
              style={styles.inputStyle}
              value={this.state.shiftEarn}
              placeholderTextColor={'rgba(255,255,255, 0.6)'}
              onChange={this.handleShiftEarnChange}
            />
          </View>
            {/* Record the entry into data storage */}
            <GenericButton 
              style={styles.recordButton}
              textColor={'#ffffff'}
              placeholder = "RECORD"
              onPress={this.recordEntry} />
        </LinearGradient>
        </SideMenu>
    );
  }
}

const colors = {
  textWhite: '#f0f0f0',
}

const styles = StyleSheet.create(
  {
    heading: {
      marginTop: 80,
      marginLeft: 20,
      fontSize: 50,
      color: colors.textWhite,
      
    },
    subHeading: {
      marginTop: 20,
      marginLeft: 25,
      marginRight: 15,
      color: colors.textWhite
    },
    homeScreen: {
      height: devHeight,
      width: devWidth
    },
    inputContainer: {
      width: '100%',
      marginTop: 5,
      padding: 30,
    },
    inputStyle: {
      fontSize: 22,
      color: '#fff'
    },
    recordButton: {
      bottom: 40,
      alignSelf: 'center',
      position: 'absolute',
      width: '95%',
      height: 55,
      alignItems: 'center',
      color: '#fff',
      backgroundColor: 'rgba(5, 43, 80, 1)',
      borderRadius: 10,
      paddingTop: 14
    },
    menuTitle: {
      marginBottom: 60,
      fontSize: 40,
      textAlign: 'center',
      color: '#e74c3c'
    },
    menuItem: {
      marginBottom: 10,
      fontSize: 26,
      textAlign: 'center'
    }
  }
)

function mapStateToProps(state) {
    return {
        records: state.records.records,
        database: state.database.records
    }
}

const mapDispatchToProps = dispatch => {
    return {
      addRecord: (record) => {
        dispatch(addRecord(record))
      },
      openDatabase: (database) => {
        dispatch(openDatabase(database))
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)