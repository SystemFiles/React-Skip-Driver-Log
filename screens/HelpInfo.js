import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  YellowBox,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationActions } from 'react-navigation';

export default class HelpInfo extends Component {
    
    constructor(props) {
        super(props);
    }

    goBack() {
        this.props.navigation.dispatch(NavigationActions.back());
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity style={{width: 50, height: 50, position: 'absolute', top: 40, left: 39, marginBottom: 10}} onPress={this.goBack.bind(this)} >
                        <Icon name='ios-arrow-round-back' size={42} color='#fff' />
                </TouchableOpacity>
                <Text style={styles.helpHeader}>
                    {'  Help'}
                </Text>
                <ScrollView 
                    showsHorizontalScrollIndicator={false} 
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.helpBoxContainer}>
                        <Text style={styles.helpBoxTitle}>Distance to record</Text>
                        <Text style={styles.helpBoxDesc}>
                            The distance measurement we use in this app is Kilometers (1000 meters).
                            You may be confused as to which data we are actually asking for when we say "starting KM".
                            We mean to use the starting range left on your cars gas range meter (this is to give us more accurate usage and consumption information for our calculations).
                            As you can assume, we ask that you provide the same range data after your shift/day ends so that we can calculate easily the total number of Kilometers you travelled on your shift.
                            
                            COMING SOON: Automated shift distance tracking.
                        </Text>
                    </View>
                    <View style={styles.helpBoxContainer}>
                        <Text style={styles.helpBoxTitle}>Current Gas Prices</Text>
                        <Text style={styles.helpBoxDesc}>
                            In later versions of Skip Driver Log, I will be adding the ability for the app to automatically suggest a gas station for you to fill up on at the end of your shift based on the nearby cheapest gas available in your area.
                            Until then, please provide the current gas price (in cents) which you are using to fill up your car after your shift ends.
                        </Text>
                    </View>
                    <View style={styles.helpBoxContainer}>
                        <Text style={styles.helpBoxTitle}>Shift Earnings</Text>
                        <Text style={styles.helpBoxDesc}>
                            Shift earnings is self explanitory, however, I would like to mention that you should be entering your exact DAILY earnings from the app into our app to get an accurate record.
                            Please also note that when I say DAILY, I mean, that if you have multiple shifts in one day, the app will only let you record one shift a day (Currently) so you will need to combine your usage data from all shifts 
                            in the current day of record. The reason I keep only one record a day is to normalize the data to provide clearer results so that you can easily see which days are better or worse and which days are costing the most money 
                            and therefore taking the largest chunk from your profits! 
                        </Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: '100%',
        paddingVertical: 30,
        backgroundColor: '#051937'
    },
    helpBoxContainer: {
        width: '90%',
        minHeight: 200,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        alignSelf: 'center',
        borderRadius: 2,
        marginBottom: 20,
    },
    helpBoxTitle: {
        fontSize: 26,
        marginBottom: 5,
        paddingBottom: 15,
    },
    helpBoxDesc: {
        fontStyle: 'italic'
    },
    helpHeader: {
        color: '#fff',
        fontSize: 42,
        textAlign: 'left',
        left: 20,
        top: 45,
        marginBottom: 50
    },
});