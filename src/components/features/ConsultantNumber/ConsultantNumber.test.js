import React from 'react';
import {shallow} from 'enzyme';
import ConsultantNumber from './ConsultantNumber';

const select = {
  number: '.employeeNumber',
};

const mockProps = {
  number:'The office opens at 8:00 UTC',
};

describe ('Component ConsultantNumber', () => {
  it('should render without crashing', () => {
    const component = shallow(<ConsultantNumber />);
    expect(component).toBeTruthy();
  });

  it('should contains consultant number', () => {
    const component = shallow(<ConsultantNumber />);
    expect(component.exists(select.number)).toEqual(true);
  });
});

const trueDate = Date;
const mockDate = customDate =>
  class extends Date {
    constructor(...args) {
      if(args.length){
        super(...args);
      } else {
        super(customDate);
      }
      return this;
    }
    static now(){
      return (new Date(customDate)).getTime();
    }
  };

const checkNumberAtTime = (time, expectedNumber) => {
  it('should show correct phone number at ${time}`', () => {
    global.Date = mockDate(`2019-05-14T${time}.135Z`);
    console.log(new Date());

    const component = shallow(<ConsultantNumber {...mockProps} />);
    const renderedNumber = component.find(select.number).text();
    expect(renderedNumber).toEqual(expectedNumber);

    global.Date = trueDate;
  });
};

describe('Component ConsultantNumber during Amanda`s time', () => {
  checkNumberAtTime('08:00:00', 'Amanda, 678.243.8455');
  checkNumberAtTime('10:20:00', 'Amanda, 678.243.8455');
  checkNumberAtTime('11:59:59', 'Amanda, 678.243.8455');
});

describe('Component ConsultantNumber during Tobias`s time', () => {
  checkNumberAtTime('12:00:00', 'Tobias, 278.443.6443');
  checkNumberAtTime('14:20:00', 'Tobias, 278.443.6443');
  checkNumberAtTime('15:59:59', 'Tobias, 278.443.6443');
});

describe('Component ConsultantNumber during Helena`s time', () => {
  checkNumberAtTime('16:00:01', 'Helena, 167.280.3970');
  checkNumberAtTime('19:20:00', 'Helena, 167.280.3970');
  checkNumberAtTime('21:59:59', 'Helena, 167.280.3970');
});

describe('Component ConsultantNumber when closed office', () => {
  checkNumberAtTime('22:00:00', 'The office opens at 8:00 UTC');
  checkNumberAtTime('05:20:00', 'The office opens at 8:00 UTC');
  checkNumberAtTime('07:59:59', 'The office opens at 8:00 UTC');
});

const checkNumberAfterTime = (time, delaySeconds, expectedNumber) => {
  it('should show correct number ${delaySeconds} seconds alter ${time}`', () => {
    jest.useFakeTimers();
    global.Date = mockDate(`2019-05-14T${time}.135Z`);

    const component = shallow(<ConsultantNumber {...mockProps} />);

    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + delaySeconds);
    global.Date = mockDate(newTime.getTime());

    jest.advanceTimersByTime(delaySeconds * 1000);

    const renderedNumber = component.find(select.number).text();
    expect(renderedNumber).toEqual(expectedNumber);

    global.Date = trueDate;

    jest.useRealTimers();
  });
};

describe('Component ConsultantNumber with correct phone number and delay', () => {
  checkNumberAfterTime('07:59:58', 2, 'Amanda, 678.243.8455');
  checkNumberAfterTime('11:59:58', 2, 'Tobias, 278.443.6443');
  checkNumberAfterTime('15:59:58', 2, 'Helena, 167.280.3970');
  checkNumberAfterTime('21:59:58', 2, 'The office opens at 8:00 UTC');
});
