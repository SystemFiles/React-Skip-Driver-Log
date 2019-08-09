import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import GenericButton from '../components/GenericButton';
import StatHolder from '../components/StatHolder';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

// redux
import { connect } from 'react-redux';


class Overview extends Component {

    allRecords = this.props.database.objects('Record');

    calcTotalProfit() {
        return this.allRecords.sum("profitCalculated").toFixed(2);
    }

    calcTotalIncome() {
        return this.allRecords.sum("shiftEarn").toFixed(2);
    }

    calcTotalDistance() {
        return (this.allRecords.sum("startKM") 
        - this.allRecords.sum("endKM")).toFixed(2);
    }

    calcAvgGasPrice() {
        return (this.allRecords.avg("curGasPrice")).toFixed(1);
    }

    calcAvgProfit() {
        return (this.allRecords.avg("profitCalculated")).toFixed(2);
    }

    showDriverLog() {
        this.props.navigation.navigate('DriverLog');
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.dashContainer}>
                    <TouchableOpacity 
                        style={{marginLeft: 8, flex: 2/5}}
                        onPress={() => {this.props.navigation.
                        dispatch(NavigationActions.back())}}>
                            <Icon name='ios-arrow-round-back' size={40} color='#333' />
                    </TouchableOpacity>
                    <Text style={styles.dashHeader}>
                        Overview
                    </Text>
                </View>
                <View style={styles.balanceContainerFull}>
                    <Text style={styles.totalProfit}>$ {this.calcTotalProfit()}</Text>
                    <Text style={styles.totalProfitSubText}>total profit from <Text style={{color: '#27ae60'}}>{this.allRecords.length}</Text> recorded trips</Text>
                </View>

                <View style={styles.statsContainer}>
                    <Text style={styles.statTitle}>Summary of records<Text style={{fontSize: 12}}> (scroll down for more)</Text></Text>
                    <ScrollView>
                        <StatHolder
                            gradStart='#2ecc71'
                            gradEnd='#A8EB12'
                            icon='ios-cash'
                            title="Total Income"
                            shortDesc="total income before costs"
                            value={'$ ' + this.calcTotalIncome()}
                        />
                        <StatHolder
                            gradStart='#2980b9'
                            gradEnd='#3498db'
                            icon='ios-car'
                            title='Total Distance'
                            shortDesc="total kilometers driven"
                            value={this.calcTotalDistance() + 'km'}
                        />
                        <StatHolder
                            gradStart='#c0392b'
                            gradEnd='#e74c3c'
                            icon='ios-pricetags'
                            title='Average Gas Price'
                            shortDesc="Avg amount you pay for gas"
                            value={this.calcAvgGasPrice() + '¢'}
                        />
                        <StatHolder
                            gradStart='#f39c12'
                            gradEnd='#f1c40f'
                            icon='ios-trending-up'
                            title='Average Profit'
                            shortDesc="average profit per day!"
                            value={'$' + this.calcAvgProfit()}
                        />
                    </ScrollView>
                </View>

                <GenericButton
                    style={styles.driverLogBtn}
                    textColor={'#fff'}
                    fontWeight={'400'}
                    placeholder={'Show FULL Log'.toUpperCase()}
                    onPress={this.showDriverLog.bind(this)} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignContent: 'flex-end',
        backgroundColor: '#f0f0f0',
        paddingTop: '15%',
    },
    dashContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
    },  
    dashHeader: {
        flex: 1,
        color: '#333',
        fontSize: 32,
        fontWeight: '700',
        marginBottom: 30,
    },
    balanceContainerFull: {
        marginTop: 15,
        height: 120,
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        paddingVertical: 10,
        paddingHorizontal: 30
    },
    totalProfit: {
        alignSelf: 'center',
        fontSize: 36,
        fontWeight: '500',
        color: '#27ae60',
        marginTop: 8,
    },
    totalProfitSubText: {
        fontSize: 18,
        position: 'absolute',
        bottom: 8,
        alignSelf: 'center',
        color: '#bdc3c7',

    },  
    subContainer: {
        alignSelf: 'center',
        width: '95%',
        minHeight: 300,
        backgroundColor: '#fff',
        padding: 20,
    },
    statTitle: {
        position: 'absolute',
        top: -40,
        left: 10,
        fontSize: 22,
        fontWeight: '500',
        color: '#333'
    },
    statsContainer: {
        width: '100%',
        height: 275,
        position: 'absolute',
        bottom: 100
    },
    driverLogBtn: {
        width: '95%',
        position: 'absolute',
        bottom: 30,
        paddingVertical: 15,
        backgroundColor: '#051937',
        borderRadius: 10,
        alignSelf: 'center',
    },
});

function mapStateToProps(state) {
    return {
        database: state.database.records
    }
}

export default connect(mapStateToProps)(Overview);