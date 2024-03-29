import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import './Reservation.scss';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';

export default class Reservation extends Component {
  constructor(props) {
    super(props);
    const currentDateStart = new Date();
    currentDateStart.setHours(0, 0, 0, 0);
    const currentDateEnd = new Date();
    currentDateEnd.setHours(23, 59, 59, 999);
    this.state = {
      reservationDate: currentDateStart,
      returnDate: currentDateEnd,
      reservationTime: currentDateStart.getTime(),
      returnTime: currentDateEnd.getTime(),
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  submitHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    const {
      reservationTime,
      returnTime,
    } = this.state;

    const token = sessionStorage.getItem('token');
    const headers = new Headers();
    headers.set('Authorization', `JWT ${token}`);

    const { bookId, closeListener } = this.props;
    const url = new URL(`http://localhost:3001/api/book/lend/${bookId}`);

    url.searchParams.append('reservationTime', reservationTime);
    url.searchParams.append('returnTime', returnTime);
    fetch(url, {
      headers,
    }).then((response) => {
      if (response.status === 204) throw new Error('Book is already lent to another user during that time');
      if (!response) throw new Error('No response from the server');
      return response.json();
    }).then((jsonResponse) => {
      if (jsonResponse.message) throw new Error(jsonResponse.message);
      Swal.fire('Success!', 'Reservation done successfully', 'success');
      closeListener();
    }).catch((err) => {
      Swal.fire('Error', `Error while trying to make reservation, error: ${err.message}`, 'error');
    });
  }

  changeHandler(date, isReservation) {
    let change;
    if (isReservation) {
      const auxDate = date;
      auxDate.setHours(0, 0, 0, 0);
      change = {
        reservationDate: date,
        reservationTime: (date && date.getTime && date.getTime()) || null,
      };
    } else {
      const auxDate = date;
      auxDate.setHours(23, 59, 59, 999);
      change = {
        returnDate: date,
        returnTime: (date && date.getTime && date.getTime()) || null,
      };
    }
    this.setState(change);
  }

  render() {
    const {
      reservationDate,
      returnDate,
    } = this.state;
    const {
      closeListener,
    } = this.props;
    return (
      <div
        onClick={closeListener}
        onSubmit={this.submitHandler}
        className="reservation-container"
        onKeyDown={this.submitHandler}
        role="button"
        tabIndex="0"
      >
        <form>
          <label onClick={(event) => event.stopPropagation()} htmlFor="reservation-picker" className="form-input">
            Lend Date
            <DatePicker
              id="reservation-picker"
              selected={reservationDate}
              onChange={(date) => this.changeHandler(date, true)}
            />
          </label>
          <label onClick={(event) => event.stopPropagation()} htmlFor="return-picker" className="form-input">
            Return Date
            <DatePicker
              id="return-picker"
              selected={returnDate}
              onChange={(date) => this.changeHandler(date, false)}
            />
          </label>
          <input onClick={(event) => event.stopPropagation()} className="submit-button" type="submit" />
        </form>
      </div>
    );
  }
}

Reservation.propTypes = {
  bookId: PropTypes.string,
  closeListener: PropTypes.func,
};

Reservation.defaultProps = {
  bookId: '',
  closeListener: () => {},
};
