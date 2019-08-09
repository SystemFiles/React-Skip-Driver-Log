import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

// Log lister
import SearchBar from '../components/SearchBar.js';
import DriverLogView from '../components/DriverLogView';

// REDUX IMPORTS
import { connect } from 'react-redux';

const device = Dimensions.get('window');

class DriverLog extends Component {

    state = {
        isLoading: true,
        error: null,
        data: this.getRecords()
    }

    componentWillMount() {
        this.setState({
            data: this.getRecords()
        })
    }

    getRecords() {
        setTimeout(() => {
            this.setState({
                isLoading: false
            });
        }, 500);
        return (this.props.database.objects('Record'));
    }

    searchDate(value) {
        this.setState({isLoading: true});
        let search = value.toLowerCase();
        let data = this.state.data;
        let filteredDate = data.filter((item) => {
            return item.date.toLowerCase().match(search);
        });

        if (!search || search === '') {
            this.setState({
                data: this.getRecords()
            });
        } else if (!Array.isArray(filteredDate) && !filteredDate.length) {
            this.setState({
                data: new Array()
            });
        } else if (Array.isArray(filteredDate)) {
            this.setState({
                data: filteredDate
            });
        }

        // Finished loading
        this.setState({
            isLoading: false
        });
    }

    handleMenuAction() {
        this.setState({
            data: this.getRecords()
        });
    }

    render() {
        return (
                <View style={styles.mainContainer}>
                    <Text style={styles.heading}>Driver Log</Text>
                    <Text style={styles.subHeading}>Below is a list of all your recorded drive sessions.
                    </Text>
                    <SearchBar 
                        handleChange={(value) => {this.searchDate(value)}}
                    />
                    <View style={styles.container}>
                        { !this.state.isLoading ?
                        ( !(this.state.data.length == 0) ?
                        <ScrollView 
                            showsVerticalScrollIndicator={false} 
                            showsHorizontalScrollIndicator={false} 
                            style={{height: '70%'}}>
                            <DriverLogView
                                itemList={this.state.data}
                                menuAction={this.handleMenuAction.bind(this)}
                            />
                        </ScrollView> : <Text style={{
                            color: '#f0f0f0',
                            fontSize: 25,
                            alignSelf: 'center',
                            textAlign: 'center',
                            marginTop: 40
                        }}>NO DATA TO SHOW</Text>) :
                        <ActivityIndicator size="large" color='#fff' />
                        }
                    </View>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: device.height,
        position: 'absolute',
        paddingTop: 60,
        bottom: 0,
        backgroundColor: '#263140'
    },
    heading: {
        marginLeft: 20,
        fontSize: 36,
        fontWeight: '500',
        color: 'white'
    },
    subHeading: {
        fontSize: 14,
        marginTop: 5,
        marginLeft: 20,
        color: '#f0f0f0'
    },
    container: {
        marginTop: 20
    }
});

function mapStateToProps(state) {
    return {
        records: state.records.records,
        database: state.database.records
    }
}

export default connect(mapStateToProps)(DriverLog);