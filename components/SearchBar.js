import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput
} from 'react-native';

export default class SearchBar extends Component {
    render() {
        return (
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Search records..."
                    spellCheck={false}
                    style={styles.searchInput}
                    clearButtonMode={'always'}
                    placeholderTextColor={'rgba(255,255,255,0.4)'}
                    onChangeText={this.props.handleChange} />
            </View> 
        )
    }
}

const styles = StyleSheet.create({
    searchContainer: {
        marginTop: 10,
        width: '90%',
        height: 25,
        paddingBottom: 5,
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#fff'
    },
    searchInput: {
        textAlign: 'left',
        fontSize: 22,
        color: '#fff'
    }
});