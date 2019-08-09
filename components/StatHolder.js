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
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

// NICE COLORS: ['#2ecc71', '#A8EB12']

/**
 * PROPS-NEEDED: icon, title, shortDesc, value, gradStart, gradEnd
 */
export default class StatHolder extends Component {
    render() {
        return (
            <View style={styles.container}>
                <LinearGradient
                    colors = {[this.props.gradStart, this.props.gradEnd]}
                    locations = {[0.23, 1]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.iconContainer}>
                        <Icon style={styles.iconStyles} name={this.props.icon} size={40} color='#f0f0f0' />
                </LinearGradient>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>
                        {this.props.title.toUpperCase()}
                    </Text>
                    <Text style={styles.subTitle}>
                        {this.props.shortDesc}
                    </Text>
                </View>
                <Text style={styles.amount}>
                    {this.props.value}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'flex-end',
        flexDirection: 'row',
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginRight: 10,
        height: 80,
        marginBottom: 15,
        shadowOffset: {width: 0, height: 2},
        shadowColor: '#333',
        shadowOpacity: 0.3
    },
    iconContainer: {
        width: '23%',
        height: 60,
        backgroundColor: '#000',
        borderRadius: 8,
        marginLeft: -30,
        marginRight: 10,
        marginTop: -3,
    },
    iconStyles: {
        alignSelf: 'center',
        marginTop: 10
    },
    contentContainer: {
        flexDirection: 'column'
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    subTitle: {
        marginTop: 20,
        marginLeft: 2,
        color: '#333'
    },
    amount: {
        alignSelf: 'center',
        position: 'absolute',
        right: 15,
        fontSize: 16,
        color: '#16a085'
    }
});