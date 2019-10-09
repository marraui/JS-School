import React, { Component } from 'react';
import './App.scss';
import Header from '../header/Header';
import BookDisplay from '../book-display/BookDisplay';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftSideBarOpen: false,
      rightSideBarOpen: false,
      leftItemSelected: 0,
    };

    this.clickLeftSideBarButtonHandler = this.clickLeftSideBarButtonHandler.bind(this);
    this.clickRightSideBarButtonHandler = this.clickRightSideBarButtonHandler.bind(this);
    this.clickLeftSideBarItemHandler = this.clickLeftSideBarItemHandler.bind(this);
    this.onSearch = this.onSearch.bind(this);

    this.bookDisplay = React.createRef();
  }

  onSearch(searchInput) {
    console.log('on Search called');
    const bookGroup = this.bookDisplay.current.bookGroup.current;
    bookGroup.params.title = searchInput;
    bookGroup.fetchBooks();
  }


  clickLeftSideBarItemHandler(event, itemNumber) {
    event.stopPropagation();
    const { leftItemSelected } = this.state;

    const bookGroup = this.bookDisplay.current.bookGroup.current;
    if (itemNumber === leftItemSelected && itemNumber !== 0) {
      this.setState({
        leftItemSelected: 0,
      });
      Object.keys(App.leftItemsParams).forEach((param) => {
        delete bookGroup.params[param];
      });
      bookGroup.fetchBooks();
      return;
    }

    if (itemNumber === leftItemSelected) {
      return;
    }

    this.setState({
      leftItemSelected: itemNumber,
    });

    if (Object.prototype.hasOwnProperty.call(App.leftItemsParams, itemNumber)) {
      console.log('he does have');
      bookGroup.params = {
        ...bookGroup.params,
        ...App.leftItemsParams[itemNumber],
      };
      bookGroup.fetchBooks(...App.leftItemsParams[itemNumber]);
    }
  }

  clickLeftSideBarButtonHandler(event) {
    event.stopPropagation();
    const { leftSideBarOpen } = this.state;
    this.setState({
      leftSideBarOpen: !leftSideBarOpen,
    });
  }

  clickRightSideBarButtonHandler(event) {
    event.stopPropagation();
    const { rightSideBarOpen } = this.state;
    this.setState({
      rightSideBarOpen: !rightSideBarOpen,
    });
  }

  render() {
    const {
      leftSideBarOpen,
      rightSideBarOpen,
      leftItemSelected,
    } = this.state;

    return (
      <div className="grid-container">
        <Header onSearch={this.onSearch} />
        <div
          className="collapsible-button-left-wrapper"
          onClick={this.clickLeftSideBarButtonHandler}
          onKeyDown={this.clickLeftSideBarButtonHandler}
          role="button"
          tabIndex="0"
        >
          <i className="fa fa-bars" />
        </div>
        <div className={`left-sidebar ${leftSideBarOpen ? '' : 'left-sidebar-unchecked'}`}>
          <div className="left-sidebar-top">
            <div className="left-sidebar-title">MAIN</div>

            <div
              className={`left-sidebar-li ${leftItemSelected === 1 ? 'checked' : ''}`}
              onClick={(event) => this.clickLeftSideBarItemHandler(event, 1)}
              onKeyDown={(event) => this.clickLeftSideBarItemHandler(event, 1)}
              role="button"
              tabIndex="0"
            >
              <i className="fa fa-globe fa-fw" />
              Quito
            </div>

            <div
              className={`left-sidebar-li ${leftItemSelected === 2 ? 'checked' : ''}`}
              onClick={(event) => this.clickLeftSideBarItemHandler(event, 2)}
              onKeyDown={(event) => this.clickLeftSideBarItemHandler(event, 2)}
              role="button"
              tabIndex="0"
            >
              <i className="fa fa-globe fa-fw" />
              Cartagena
            </div>

            <div
              className={`left-sidebar-li ${leftItemSelected === 3 ? 'checked' : ''}`}
              onClick={(event) => this.clickLeftSideBarItemHandler(event, 3)}
              onKeyDown={(event) => this.clickLeftSideBarItemHandler(event, 3)}
              role="button"
              tabIndex="0"
            >
              <i className="fa fa-globe fa-fw" />
              Medellín
            </div>
            <div
              className={`left-sidebar-li ${leftItemSelected === 4 ? 'checked' : ''}`}
              onClick={(event) => this.clickLeftSideBarItemHandler(event, 4)}
              onKeyDown={(event) => this.clickLeftSideBarItemHandler(event, 4)}
              role="button"
              tabIndex="0"
            >
              <i className="fa fa-tablet-alt fa-fw" />
              Digital
            </div>

            <div
              className={`left-sidebar-li ${leftItemSelected === 5 ? 'checked' : ''}`}
              onClick={(event) => this.clickLeftSideBarItemHandler(event, 5)}
              onKeyDown={(event) => this.clickLeftSideBarItemHandler(event, 5)}
              role="button"
              tabIndex="0"
            >
              <i className="fa fa-user-tag fa-fw" />
              Personal Loans
            </div>

            <div
              className={`left-sidebar-li ${leftItemSelected === 6 ? 'checked' : ''}`}
              onClick={(event) => this.clickLeftSideBarItemHandler(event, 6)}
              onKeyDown={(event) => this.clickLeftSideBarItemHandler(event, 6)}
              role="button"
              tabIndex="0"
            >
              <i className="fa fa-tags fa-fw" />
              New Releases
            </div>

          </div>
          <div className="left-sidebar-bottom">
            <div className="left-sidebar-title">YOUR BOOKS</div>

            <div className="left-sidebar-li">
              <i className="fa fa-book-open fa-fw" />
              Readings
            </div>

            <div className="left-sidebar-li">
              <i className="fa fa-history fa-fw" />
              History
            </div>

            <div className="left-sidebar-li">
              <i className="fa fa-bookmark fa-fw" />
              Read later
            </div>

            <div className="left-sidebar-li">
              <i className="fa fa-heart fa-fw" />
              Favorites
            </div>

          </div>
        </div>


        <input type="checkbox" id="collapsible-button-right" />
        <div
          className="collapsible-button-right-wrapper"
          onClick={this.clickRightSideBarButtonHandler}
          onKeyDown={this.clickRightSideBarButtonHandler}
          role="button"
          tabIndex="0"
        >
          <i className="fa fa-bars" />
        </div>


        <div className={`right-sidebar ${rightSideBarOpen ? '' : 'right-sidebar-unchecked'}`}>
          <div className="right-sidebar-title">
            MOST READ BOOKS
          </div>
          <div className="right-sidebar-li">
            1. Hooked: How to Build Habit-Forming Products
          </div>
          <div className="right-sidebar-li">
            2. The Inevitable: Understanding the 12 Technological Forces That Will Shape our Future
          </div>
          <div className="right-sidebar-li">
            3. Lean In: Women, Work, and the Will to Lead
          </div>
          <div className="right-sidebar-li">
            4. Building a Business When There Are No Easy Answers
          </div>
          <div className="right-sidebar-li">
            5. How Google Works
          </div>
        </div>

        <BookDisplay ref={this.bookDisplay} />
      </div>
    );
  }
}

App.leftItemsParams = {
  0: {},
  1: {
    city: 'Quito',
  },
  2: {
    city: 'Cartagena',
  },
  3: {
    city: 'Medellin',
  },
  4: {
    format: 'Digital',
  },
};
