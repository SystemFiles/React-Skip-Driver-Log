import React, { Component } from "react";
import {TouchableOpacity} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

import SpecialInput from './SpecialInput';
 
export default class DateTimePickerTester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: this.props.visiblity
    };
  }
 
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
 
  render() {
    return (
      <>
        <TouchableOpacity onPress={this.props.showDateTimePicker}>
            <SpecialInput
                placeholder = {"Date"}
                style={this.props.styles}
                value = {this.props.value}
                placeholderTextColor={'rgba(255,255,255, 0.6)'}
                pointerEvents="none"
            />
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.props.visiblity}
          onConfirm={this.props.onDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </>
    );
  }
}