import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import PropTypes from 'prop-types';
import OrderOption from '../OrderOption/OrderOption';
import pricing from '../../../data/pricing.json';
import Button from '../../common/Button/Button';
import settings from '../../../data/settings';
import { formatPrice } from '../../../utils/formatPrice';
import { calculateTotal } from '../../../utils/calculateTotal';

const sendOrder = (options, tripCost, tripName, tripId, countryCode) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...options,
    totalCost,
    tripName,
    tripId,
    countryCode,
  };

  const url = `${settings.db.url}/${settings.db.endpoint.orders}`;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse){
      console.log('parsedResponse', parsedResponse);
    });
};

const OrderForm = ({ tripCost, options, setOrderOption, tripName, tripId, countryCode }) => {

  return (
    <Row>
      {pricing.map(option => {
        return (
          <Col key={option.id} md={4}>
            <OrderOption
              currentValue={options[option.id]}
              setOrderOption={setOrderOption}
              tripCost={tripCost}
              {...option}
            />
          </Col>
        );
      })}
      <Col xs={12}>
        <OrderSummary tripCost={tripCost} options={options} />
      </Col>
      <Button
        disabled={options.name == '' || options.contact == ''}
        onClick={() => sendOrder(options, tripCost, tripName, tripId, countryCode)}>
        Order now!
      </Button>
    </Row>
  );
};

OrderForm.propTypes = {
  tripCost: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  setOrderOption: PropTypes.func.isRequired,
  tripName: PropTypes.string.isRequired,
  tripId: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
};

export default OrderForm;
