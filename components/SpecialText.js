import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

class SpecialText extends Component {
    render (props) {
        return (
            <View style = {specialStyles.componentStyle}>
                <Icon name='ios-calendar' 
                    size={30}
                    color={'rgba(255,255,255, 0.6)'}></Icon>
                <Text
                style={this.props.style}
                >{this.props.content}</Text>
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
      borderRadius: 10
    }
});

export default SpecialText;