import React from 'react';
import styles from './ConsultantNumber.scss';
import PropTypes from 'prop-types';

const employeeNumber = {
  Amanda: 'Amanda, 678.243.8455',
  Tobias: 'Tobias, 278.443.6443',
  Helena: 'Helena, 167.280.3970',
};

class ConsultantNumber extends React.Component {
  constructor(){
    super();
    setInterval( () => {this.forceUpdate();}, 1000);
  }
  render () {
    let {number} = this.props;
    const currentTime = new Date();
    const currentHour = currentTime.getUTCHours();

    if( currentHour >= 8 && currentHour < 12){
      number = employeeNumber.Amanda;
    } else if ( currentHour >= 12 && currentHour < 16){
      number = employeeNumber.Tobias;
    } else if ( currentHour >= 16 && currentHour < 22){
      number = employeeNumber.Helena;
    }

    return (
      <p className={styles.employeeNumber}>{number}</p>
    );
  }
}

ConsultantNumber.propTypes = {
  number: PropTypes.string,
};

export default ConsultantNumber;
