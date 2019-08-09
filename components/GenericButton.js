import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native';

class GenericButton extends Component {
    render (props) { 
        return (
            <TouchableOpacity onPress={this.props.onPress} style={this.props.style}>
                <Text style={{color: this.props.textColor, fontSize: 22, fontWeight: this.props.fontWeight, textAlign: 'center'}} >{this.props.placeholder}</Text>
            </TouchableOpacity>
        )
    }
}

export default GenericButton;