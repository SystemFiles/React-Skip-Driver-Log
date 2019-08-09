import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  YellowBox
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

class SpecialInput extends Component {

    componentWillMount() {
        YellowBox.ignoreWarnings(['Warning: Failed prop type: Invalid prop']);
    }

    render (props) {
        return (
            <View style = {specialStyles.componentStyle}>
                <Icon name={this.props.iconName}
                size={30}
                color={'rgba(255,255,255, 0.6)'}><Text style={{fontSize: 17, color: 'rgba(255,255,255, 0.6)'}}>{this.props.iconText}</Text></Icon>
                    <TextInput
                    placeholder = {this.props.placeholder}
                    style={this.props.style}
                    placeholderTextColor={'rgba(255,255,255, 0.6)'}
                    onChange={this.props.onChange} // Passes the nativeEvent as param (REMEMBER!)
                    value={this.props.value}
                    pointerEvents={this.props.pointerEvents}
                    maxLength={this.props.maxLength}
                    keyboardType='numeric'
                    clearButtonMode='always'
                    />
            </View>
        )
    }
}

const specialStyles = StyleSheet.create({
    componentStyle: {
      marginBottom: 15,
      backgroundColor: 'rgba(255,255,255, 0.1)',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
    }
});

export default SpecialInput;