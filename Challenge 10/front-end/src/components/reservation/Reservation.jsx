import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import { from } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import {
  FormInput,
  ReservationContainer,
  SubmitButton,
  BubbleTextArrow,
} from './Layout';

export default class Reservation extends Component {
  constructor(props) {
    super(props);
    const currentDateEnd = new Date();
    currentDateEnd.setHours(23, 59, 59, 999);
    this.state = {
      returnDate: currentDateEnd,
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  submitHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    const {
      returnDate,
    } = this.state;

    const reservationDate = new Date();
    reservationDate.setHours(0, 0, 0, 0);
    const reservationTime = reservationDate.getTime();

    returnDate.setHours(23, 59, 59, 999);
    const returnTime = returnDate.getTime();


    const token = sessionStorage.getItem('token');
    const headers = new Headers();
    headers.set('Authorization', `JWT ${token}`);

    const { bookId, closeListener } = this.props;
    const url = new URL(`http://localhost:3001/api/book/lend/${bookId}`);

    url.searchParams.append('reservationTime', reservationTime);
    url.searchParams.append('returnTime', returnTime);

    from(fetch(url, {
      headers,
    })).pipe(
      flatMap((response) => {
        if (response.status === 204) throw new Error('Book is already lent to another user during that time');
        if (!response) throw new Error('No response from the server');
        return response.json();
      }),
      map((jsonResponse) => {
        if (jsonResponse && jsonResponse.message) throw new Error(jsonResponse.message);
        return jsonResponse;
      }),
    ).subscribe(() => {
      Swal.fire('Success!', 'Reservation done successfully', 'success');
      closeListener(event);
    }, (err) => {
      Swal.fire('Error', `Error while trying to make reservation, error: ${err.message}`, 'error');
    });
  }

  changeHandler(date) {
    const auxDate = date;
    auxDate.setHours(23, 59, 59, 999);
    this.setState({
      returnDate: auxDate,
    });
  }

  render() {
    const {
      returnDate,
    } = this.state;
    const {
      openLeft,
      closeListener,
    } = this.props;
    return (
      <ReservationContainer
        onSubmit={this.submitHandler}
        onClick={closeListener}
        reversed={openLeft}
        role="button"
        tabIndex="0"
      >
        <BubbleTextArrow reversed={openLeft}>
          <div className="bubble-text-arrow-top" />
          <div className="bubble-text-arrow-bottom" />
        </BubbleTextArrow>
        <form>
          <FormInput
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
            htmlFor="reservation-picker"
          >
            Return Date
            <DatePicker
              id="reservation-picker"
              selected={returnDate}
              onChange={(date) => this.changeHandler(date, true)}
              dayClassName={(date) => {
                const auxDate = new Date();
                auxDate.setHours(0, 0, 0, 0);
                if (date.getTime() < auxDate.getTime()) return 'disabled-date';
                const diff = date - auxDate;
                const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
                if (diffDays > 15) return 'disabled-date';
                return undefined;
              }}
            />
          </FormInput>
          <SubmitButton
            onClick={(event) => {
              event.stopPropagation();
            }}
            type="submit"
          />
        </form>
      </ReservationContainer>
    );
  }
}

Reservation.propTypes = {
  bookId: PropTypes.string,
  closeListener: PropTypes.func,
  openLeft: PropTypes.bool,
};

Reservation.defaultProps = {
  bookId: '',
  closeListener: () => {},
  openLeft: false,
};
