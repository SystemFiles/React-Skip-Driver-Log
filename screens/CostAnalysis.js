import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

// Graffix
import LinearGradient from 'react-native-linear-gradient';

// REDUX IMPORTS
import { connect } from 'react-redux';

// Icons
import Icon from 'react-native-vector-icons/Ionicons';
import GenericButton from '../components/GenericButton';
import { NavigationActions } from 'react-navigation';

const device = Dimensions.get('window');

class CostAnalysis extends Component {
    // This screens state (ie: state not needed from application)
    state = {
        isCalculating: true,
    };

    // UTILITIE FUNCTIONS
    moneyRound = (amount) => {
        return Math.round(amount * 100) / 100
    }
    
    calculateShiftProfit = (record) => {
        //TODO: RE-Calculate cost per KM (Mainly wear & tear)
        var avgFuelConsumptionPerHundredKM = 7;
        var costPerKM = (avgFuelConsumptionPerHundredKM
             * (record.curPrice / 100)) / 100;
        var kmDriven = record.startKM - record.endKM;

        var wearTear = ((3534 / 15000) * 0.62) * kmDriven;
        var shiftEarn = record.shiftEarn;

        var totalCost = (costPerKM * kmDriven) + wearTear;
        // Done calculating set state and return result
        setTimeout(() => {
            this.setState({
                isCalculating: false
            });
        }, 1000);

        return this.moneyRound(shiftEarn - totalCost);
    }

    // HANDLERS
    confirmData = () => {
        var realm = this.props.database;
        var record = this.props.records[this.props.records.length - 1];
        try {
            realm.write(() => {
                realm.create('Record', {
                    date: record.date,
                    startKM: parseInt(record.startKM),
                    endKM: parseInt(record.endKM),
                    curGasPrice: parseFloat(record.curPrice),
                    shiftEarn: parseFloat(record.shiftEarn),
                    profitCalculated: this.calculateShiftProfit(record)
                });
            });
        } catch (e) {
            if (e.message.includes('existing primary key value')) {
                alert('Error entering data! \nDid you already record a trip today?');
            } else {
                alert('Unknown Error Confirming data');
            }
            console.log("Error on confirming data!: " + e);
        }

        // Take the user back to Entry screen
        this.props.navigation.dispatch(NavigationActions.back())
    }

    render() {
        // Get the record for the user to confirm
        const confirmRecord = this.props.records[this.props.records.length - 1];
        const profit = this.calculateShiftProfit(confirmRecord);
        return (
            <LinearGradient 
                    colors = {['#051937', '#A8EB12']}
                    style ={styles.mainContainer}
                    locations = {[0.4, 1]}
                    start={{x: 1, y:0}}
                    end={{x: 1, y: 0}}>
                        <Text style={styles.header}>THANK YOU</Text>
                        <Text style={styles.subHeader}>
                            {'Please confirm that we have the right information!'}
                        </Text>
                
                
                <View style={styles.breakdownContainer}>
                    <Icon style={{alignSelf: 'center'}} name='ios-compass' size={60} color={'#051937'} />
                    <View style={styles.dataContainer}>
                        <Text style={styles.dataDate}>{confirmRecord.date.toString().toUpperCase()}</Text>
                        <Text style={styles.dataNormal}>{'Starting: ' + confirmRecord.startKM + ' Kilometers'}</Text>
                        <Text style={styles.dataNormal}>{'Ending: ' + confirmRecord.endKM + ' Kilometers'}</Text>
                        <Text style={styles.dataNormal}>{'Gas Price: ' + confirmRecord.curPrice + ' cents'}</Text>
                        <Text style={styles.dataNormal}>{'Stated Earnings: $' + confirmRecord.shiftEarn}</Text>
                        <TouchableOpacity style={{marginVertical: 5}} onPress={() => {this.props.navigation.dispatch(NavigationActions.back())}}>
                            <Text style={{textAlign: 'center', color: '#e67e22'}}>{'re-enter record...'.toUpperCase()}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.state.isCalculating ? 
                    <View>
                        <ActivityIndicator style={{marginTop: '10%'}} size="large" color='#A8EB12' />
                    </View> :
                    <View style={styles.profitContainer}>
                        <Text style={{
                            fontSize: 42,
                            color: profit > 0 ? '#A8EB12' : '#e74c3c',
                            textAlign: 'center'
                        }}>$ {profit}</Text>
                    </View>
                }

                {/* CONFIRM BUTTON */}
                <GenericButton 
                    style={styles.confirmButton}
                    textColor={'#000'}
                    placeholder = "CONFIRM"
                    fontWeight={'500'}
                    onPress={this.confirmData} />
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        height: device.height,
        paddingTop: 60,
        paddingHorizontal: 10,
        width: '100%',
        position: 'absolute',
        bottom: 0
    },
    header: {
        color: '#fff',
        fontSize: 42,
        alignSelf: 'center',
        marginTop: 5,
    },
    subHeader: {
        fontSize: 16,
        color: '#f0f0f0',
        marginTop: 14,
        alignSelf: 'center',
        textAlign: 'center',
    },
    breakdownContainer: {
        marginTop: 85,
        width: '98%',
        height: '48%',
        alignSelf: 'center',
        backgroundColor: '#f0f0f0',
        padding: 15,
    },
    dataContainer: {
        marginTop: 15,
    },
    dataDate: {
        alignSelf: 'center',
        fontSize: 22,
        marginBottom: 20,
    },
    dataNormal: {
        marginTop: 2,
        marginBottom: 5,
        fontSize: 16,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 10,
        textAlign: 'center',
        fontStyle: 'italic'
    },
    profitContainer: {
        marginTop: '10%',
        alignContent: 'center',
        width: '100%',
        height: '15%'
    },
    confirmButton: {
        bottom: 30,
        width: '90%',
        height: 55,
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: '#A8EB12',
        borderRadius: 10,
        paddingTop: 14,
        alignSelf: 'center'
    }
});

function mapStateToProps(state) {
    return {
        records: state.records.records,
        database: state.database.records
    }
}

export default connect(mapStateToProps)(CostAnalysis);