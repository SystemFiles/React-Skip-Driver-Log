
import React, {Component} from 'react';
import { View, ListView, FlatList,
    StyleSheet, Text } from 'react-native';
import SummaryListRow from './DriverLogRow';

    

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default class DriverLogView extends Component {
    render (props) {
        var itemList = this.props.itemList;
        return (
            <View style={styles.container}>
                <FlatList
                        data={itemList}
                        renderItem = {({item}) => (
                            <SummaryListRow 
                                key={item.key}
                                date={item.date}
                                startKM={item.startKM}
                                endKM={item.endKM}
                                curPrice={item.curGasPrice.toFixed(1)}
                                shiftEarn={item.shiftEarn.toFixed(2)}
                                shiftProfit={item.profitCalculated.toFixed(2)}
                                menuAction={this.props.menuAction}
                                />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}