import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft:16,
        marginRight:16,
        marginTop: 3,
        marginBottom: 8,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 10,
        elevation: 2
    },
    title: {
        fontSize: 24,
        color: '#fff',
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
        color: '#fff'
    },
    description: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#fff'
    },
    iconSt: {
        height: 100,
        width: 100,
    },
    earningItem: {
        color: '#fbc531',
        fontSize: 22,
        marginBottom: 20
    },
    profitItem: {
        color: '#A8EB12',
        fontSize: 22,
    }
});

class DriverLogRow extends Component {
    constructor(props) {
        super(props);
    }

    deleteItem() {
        // Get Date Primary Key and realm
        let thisDate = this.props.date;
        let realm = this.props.database;

        // remove from database
        realm.write(() => {
            let recordToDelete = realm.objectForPrimaryKey('Record', thisDate);
            realm.delete(recordToDelete);
        });
        
        // Send handler to refresh listing
        this.props.menuAction();
    }

    render () { 
        var date = this.props.date;
        var startingKM = this.props.startKM;
        var endingKM = this.props.endKM;
        var gasPrice = this.props.curPrice;
        var shiftEarn = this.props.shiftEarn;
        var profit = this.props.shiftProfit;

        return (
                <View style={styles.container}>
                    <View style={styles.iconSt}>
                        <Text style={{color: '#fff'}}>before</Text>
                        <Text style={styles.earningItem}>{'$ ' + shiftEarn}</Text>
                        <Text style={{color: '#fff'}}>after</Text>
                        <Text style={styles.profitItem}>{'$ ' + profit}</Text>
                    </View>
                    <View style={styles.container_text}>
                        <Text style={styles.title}>
                            {date}
                        </Text>
                    <Text style={styles.description}>
                        {"Start: " + startingKM + "KM"}
                    </Text>
                    <Text style={styles.description}>
                        {"End: " + endingKM + "KM"}
                    </Text>
                    <Text style={styles.description}>
                        {"Gas price: " + gasPrice + 'cents'}
                    </Text>
                </View>
                <TouchableOpacity onPress={this.deleteItem.bind(this)}>
                        <Icon name='ios-trash' size={25} color='#f0f0f0' />
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        database: state.database.records
    }
}

export default connect(mapStateToProps)(DriverLogRow);