import React, { Component } from "react";
import { View, Button, TouchableOpacity, Text } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import DatePicker from './src/date-picker';
import Styles from './Styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


let value = ''

class WheelDateTimePicker extends Component {


    constructor(props) {
        super(props)
        this.state = {
            isVisible: this.props.isVisible,
            selectedValue: '',
            firstDate: new Date(),
            minimumDate: ""
        }
    }

    componentDidMount() {
        // console.log("prevProps =======>", prevProps);
        // console.log("prevState =======>", prevState);
        // // this.RBSheet.open();

    }


    componentDidUpdate(prevProps, prevState) {
        if (this.props.isVisible) {
            this.RBSheet.open();
        }
    }

    submitValue = () => {

        const { onConfirm } = this.props;
        // const { selectedValue } = this.state;
        // console.log("selectedValue ====>", this.state.selectedValue)
        // let val = moment(this.value).format('hh:mm a');
        let date = new Date();
        let hours = "";
        let minutes = "";
        let selectedDateTime = new Date();

        if (this.value) {
            date = new Date(this.value);
        }
        onConfirm(date);
        if (this.props.mode === 'time') {

            hours = date.getHours();
            minutes = date.getMinutes();
            selectedDateTime.setHours(hours);
            selectedDateTime.setMinutes(minutes);
            this.setState({ minimumDate: selectedDateTime });
        }
        if (this.props.mode === 'datetime') {
            this.setState({ minimumDate: date });
        }
        this.RBSheet.close();
    }

    selectedDate = (date) => {
        this.value = date
    }

    render() {

        const { date, isVisible, minimumDate, mode, onConfirm, onCancel, is12Hour } = this.props;

        console.log('onCancel', is12Hour)
        return (
            <View style={{ flex: 1, justifyContent: "center", }}>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={hp('50')}
                    openDuration={250}
                    customStyles={Styles.mainContainer}
                    onClose={() => onCancel()}
                >
                    <View style={{ flex: 1 }}>
                        <View style={{ height: '85%', backgroundColor: 'white', borderRadius: wp(2) }}>
                            <View style={{ width: '100%', height: '15%', alignItems: 'center', justifyContent: 'center' }}>
                                <Text text={mode === 'time' ? 'Pick a time' : 'Pick a date'} style={{ fontSize: hp(2), color: 'grey' }} />
                            </View>
                            <View style={Styles.horizontalRow} />

                            <View style={{ width: '90%', alignSelf: 'center', height: '73%', justifyContent: 'center', alignItems: 'center' }}>
                                <DatePicker
                                    // date={date}
                                    date={this.state.minimumDate ? this.state.minimumDate : this.props.date ? this.props.date : new Date()}
                                    // minimumDate={new Date()}
                                    // minimumDate = {this.state.minimumDate ? this.state.minimumDate : this.props.date ? this.props.date : new Date()}
                                    // date = {new Date()}
                                    mode={mode}
                                    // minimumDate={date}
                                    // maximumDate={new Date('2050-12-31')}
                                    onDateChange={date => this.selectedDate(date)}
                                    // onDateChange={date => console.log("Console.log OnDateChange ======>",date)}
                                    style={{ backgroundColor: '#fffff', height: hp('29%') }}
                                    twelveHours={this.props.is12Hour}
                                // date={this.state.minimumDate}
                                />
                            </View>
                            <View style={Styles.horizontalRow} />
                            <TouchableOpacity onPress={() => this.submitValue()} style={{ width: '100%', height: '10%', justifyContent: 'center', alignItems: 'center', paddingTop: '1%' }}><Text style={Styles.buttonStyle}>Confirm</Text></TouchableOpacity>
                        </View>
                        <View style={{ height: hp(0.4) }} />
                        <TouchableOpacity style={Styles.cancelButton} onPress={() => this.RBSheet.close()}><Text style={[Styles.buttonStyle, { fontWeight: '600' }]}>Cancel</Text></TouchableOpacity>
                    </ View>
                </RBSheet>
            </View>
        );
    }
}

export default WheelDateTimePicker;