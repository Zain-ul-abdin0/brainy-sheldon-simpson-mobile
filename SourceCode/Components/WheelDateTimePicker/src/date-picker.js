import React, { PureComponent } from 'react';
import { ColorPropType, StyleSheet, View, ViewPropTypes as RNViewPropTypes, Text, Platform } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import Picker from './picker';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


const ViewPropTypes = RNViewPropTypes || View.propTypes;
const twelveHours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const twentyFourHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

const styles = StyleSheet.create({
  picker: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
});

const stylesFromProps = props => ({
  itemSpace: props.itemSpace,
  textColor: props.textColor,
  textSize: props.textSize,
  style: props.style,
});

let currentDate = moment().format('DD');
let currentDay = moment().format('dddd');
let currentMonth = moment().format('MMMM');
let currentYear = moment().format('YYYY');

export default class DatePicker extends PureComponent {
  static propTypes = {
    labelUnit: PropTypes.shape({
      year: PropTypes.string,
      month: PropTypes.string,
      date: PropTypes.string,
    }),
    order: PropTypes.string,
    date: PropTypes.instanceOf(Date).isRequired,
    TimePickerDate: PropTypes.instanceOf(Date).isRequired,
    maximumDate: PropTypes.instanceOf(Date),
    minimumDate: PropTypes.instanceOf(Date),
    mode: PropTypes.oneOf(['date', 'time', 'datetime']),
    onDateChange: PropTypes.func.isRequired,
    style: ViewPropTypes.style,
    textColor: ColorPropType,
    textSize: PropTypes.number,
    itemSpace: PropTypes.number,
    twelveHours: PropTypes.bool
  };

  static defaultProps = {
    labelUnit: { year: '', month: '', date: '' },
    order: 'D-M-Y',
    mode: 'date',
    maximumDate: moment().add(10, 'years').toDate(),
    minimumDate: moment().add(-10, 'years').toDate(),
    date: new Date(),
    style: null,
    TimePickerDate: new Date(),
    textColor: '#333',
    textSize: hp('2.8'),
    itemSpace: 20,
    twelveHours: false
  };

  constructor(props) {

    super(props);

    const { date, minimumDate, maximumDate, labelUnit } = props;

    this.state = { date, monthRange: [], yearRange: [], timeStamp: '', TimePickerDate: date };

    this.newValue = {};

    this.parseDate(date);

    const mdate = moment(date);

    const dayNum = mdate.daysInMonth();

    this.state.dayRange = this.genDateRange(dayNum);

    const minYear = minimumDate.getFullYear();
    const maxYear = maximumDate.getFullYear();

    currentDate = moment().format('DD');
    currentDay = moment().format('dddd');
    currentMonth = moment().format('MMMM');
    currentYear = moment().format('YYYY');

    let monthRangeArray = []

    for (let i = 100; i >= 1; i--) {

      let date = moment().subtract(i, 'days');

      let month = date.format('MMMM');

      let day = date.format('dddd');

      let dateNum = date.format('DD');

      let year = date.format('YYYY')

      monthRangeArray.push({ value: day + ' ' + month + ' ' + dateNum + ' ' + year, label: day + ' ' + month + ' ' + dateNum })

    }

    monthRangeArray.push({ value: currentDay + ' ' + currentMonth + ' ' + currentDate + ' ' + currentYear, label: 'Today' })

    for (let i = 1; i <= 100; i++) {

      let date = moment().add(i, 'days');

      let month = date.format('MMMM');

      let day = date.format('dddd');

      let dateNum = date.format('DD');

      let year = date.format('YYYY')

      monthRangeArray.push({ value: day + ' ' + month + ' ' + dateNum + ' ' + year, label: day + ' ' + month + ' ' + dateNum })

    }

    this.state.monthRange = monthRangeArray

    this.state.yearRange.push({ value: minYear, label: `${minYear}${labelUnit.year}` });

    for (let i = minYear + 1; i <= maxYear; i += 1) {
      this.state.yearRange.push({ value: i, label: `${i}${labelUnit.year}` });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.date !== nextProps.date) {
      this.parseDate(nextProps.date);

      this.setState({ date: nextProps.date });
    }
  }

  parseDate = (date) => {
    const mdate = moment(date);
    ['year', 'month', 'date', 'hour', 'minute'].forEach((s) => { this.newValue[s] = mdate.get(s); });
  }

  onYearChange = (year) => {
    const oldYear = this.newValue.year;
    this.newValue.year = year;
    this.checkDate(oldYear, this.newValue.month);
    this.props.onDateChange(this.getValue());
  };

  onMonthChange = (month) => {

    let monthValue = month.split(' ');
    let newMonth = monthValue[1];
    newMonth = moment().month(newMonth).format("M") - 1;
    let newDate = monthValue[2];
    let newYear = monthValue[3]
    this.newValue.year = newYear;
    this.newValue.month = newMonth;
    this.newValue.date = newDate
    this.props.onDateChange(this.getValue());
  };

  onDateChange = (date) => {
    this.newValue.date = date;
    this.checkDate(this.newValue.year, this.newValue.month);
    this.props.onDateChange(this.getValue());
  };

  timeStampChange = (timeStamp) => {
    this.newValue.timeStamp = timeStamp;
    this.props.onDateChange(this.getValue())
  }

  onHourChange = (hour) => {
    this.newValue.hour = hour;
    this.props.onDateChange(this.getValue());
  };

  onMinuteChange = (minute) => {
    this.newValue.minute = minute;
    this.props.onDateChange(this.getValue());
  };

  genDateRange(dayNum) {
    const days = [];
    for (let i = 1; i <= dayNum; i += 1) {
      days.push({ value: i, label: `${i}${this.props.labelUnit.date}` });
    }
    return days;
  }

  render() {
    return (
      <View style={styles.row}>
        {['date', 'datetime'].includes(this.props.mode) && this.datePicker}
        {['time', 'datetime'].includes(this.props.mode) && this.timePicker}
      </View>
    );
  }

  get datePicker() {
    const propsStyles = stylesFromProps(this.props);
    const { order } = this.props;
    if (!order.includes('D') && !order.includes('M') && !order.includes('Y')) {
      throw new Error(`WheelDatePicker: you are using order prop wrong, default value is 'D-M-Y'`);
    }

    let { TimePickerDate } = this.state;
    currentDay = moment(TimePickerDate).format('dddd');
    currentMonth = moment(TimePickerDate).format('MMMM');
    currentDate = moment(TimePickerDate).format('DD');
    currentYear = moment(currentYear).format('YYYY')


    return this.props.order.split('-').map((key) => {
      switch (key) {

        case 'M': return (
          <View key='month' style={{ width: Platform.OS === 'ios' ? hp('26%') : hp('30%') }}>
            <Picker
              {...propsStyles}
              style={[this.props.style,]}
              ref={(month) => { this.monthComponent = month; }}
              selectedValue={currentDay + ' ' + currentMonth + ' ' + currentDate + ' ' + currentYear}
              pickerData={this.state.monthRange}
              onValueChange={this.onMonthChange}
            />
          </View>
        );
        default: return null;
      }
    })
  }

  get timePicker() {

    const propsStyles = stylesFromProps(this.props);

    let [hours, minutes] = [[], []];

    hours = this.props.twelveHours ? twelveHours.concat() : twentyFourHours;

    let selectedhours = this.state.TimePickerDate.getHours();

    if (selectedhours > 12) {
      this.newValue.timeStamp = 'PM';
      selectedhours = selectedhours - 12;
    }
    else if (selectedhours === 12) {

      this.newValue.timeStamp = 'PM';
    }
    else if (selectedhours === 24) {

    }
    else {
      this.newValue.timeStamp = 'AM';
    }

    const timeStamp = ['AM', 'PM']

    for (let i = 0; i <= 59; i += 1) {
      minutes.push(i);
    }

    return [

      <View key='hour' style={styles.picker}>
        <Picker
          ref={(hour) => { this.hourComponent = hour; }}
          {...propsStyles}
          selectedValue={selectedhours}
          pickerData={hours}
          onValueChange={this.onHourChange}
        />
      </View>,
      <View key='minute' style={styles.picker}>
        <Picker
          ref={(minute) => { this.minuteComponent = minute; }}
          {...propsStyles}
          selectedValue={this.state.TimePickerDate.getMinutes()}
          pickerData={minutes}
          onValueChange={this.onMinuteChange}
        />
      </View>,

      <View key='timeStamp' style={[this.props.twelveHours ? styles.picker : '']}>
        {
          this.props.twelveHours &&
          <Picker
            ref={(timeStamp) => { this.timeStampComponent = timeStamp; }}
            {...propsStyles}
            selectedValue={this.newValue.timeStamp}
            pickerData={timeStamp}
            onValueChange={this.timeStampChange}
          />
        }
      </View>
    ];
  }

  checkDate(oldYear, oldMonth) {
    const currentMonth = this.newValue.month;
    const currentYear = this.newValue.year;
    const currentDay = this.newValue.date;

    let dayRange = this.state.dayRange;
    let dayNum = dayRange.length;

    if (oldMonth !== currentMonth || oldYear !== currentYear) {
      dayNum = moment(`${currentYear}-${currentMonth + 1}`, 'YYYY-MM').daysInMonth();
    }

    if (dayNum !== dayRange.length) {
      dayRange = this.genDateRange(dayNum);

      if (currentDay > dayNum) {
        this.newValue.date = dayNum;
        this.dateComponent.setState({ selectedValue: dayNum });
      }
      this.setState({ dayRange });
    }

    const unit = this.props.mode === 'date' ? 'day' : undefined;
    const current = Object.assign({}, this.newValue, { date: this.newValue.date });
    let currentTime = moment(current);
    const min = moment(this.props.minimumDate);
    const max = moment(this.props.maximumDate);
    let isCurrentTimeChanged = false;

    if (currentTime.isBefore(min, unit)) {
      [currentTime, isCurrentTimeChanged] = [min, true];
    } else if (currentTime.isAfter(max, unit)) {
      [currentTime, isCurrentTimeChanged] = [max, true];
    }

    if (isCurrentTimeChanged) {
      if (this.monthComponent) {
        this.monthComponent.setState({ selectedValue: currentTime.get('month') + 1 });
      }

      ['year', 'date', 'hour', 'minute'].forEach((segment) => {
        const ref = this[`${segment}Component`];
        return ref && ref.setState({ selectedValue: currentTime.get(segment) });
      });
    }
  }

  getValue() {

    // debugger

    let { year, month, date, hour, minute, timeStamp } = this.newValue;

    // console.log("TimeStamp ======>", timeStamp)
    console.log("date ======>", date)
    // console.log("date Hours ======>", hour)
    if (timeStamp == 'PM' && hour < 12) {
      // console.log("here ===>")
      hour = hour + 12;
    }
    // else if (timeStamp == 'PM' && hour === 12) {
    //   console.log("here ===> equalls 12" ,  hour)
    //   hour = hour + 12
    // }
    else if (timeStamp === 'AM' && hour === 12) {
      hour = hour - 12
      // console.log("Hours IN AM Case ===>", hour  + ' && Time Stamp Val =====>', timeStamp)
    }

    // console.log("nextDate hours =====>", hour)
    const nextDate = new Date(year, month, date, hour, minute);
    console.log("nextDate =====>", nextDate);
    // debugger
    return nextDate;
    // debugger
    // if (nextDate < this.props.minimumDate) {
    //   return this.props.minimumDate;
    // }

    // return nextDate > this.props.maximumDate ? this.props.maximumDate : nextDate;
  }
}
