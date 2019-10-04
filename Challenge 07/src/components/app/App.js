import React from 'react';
import './App.scss';
import logo from '../../assets/images/logo2.svg';
import logoText from '../../assets/images/logo-jobsity-text.svg';
import userImage from '../../assets/images/user_image.jpg';

function App() {
  return (
    <div className="grid-container">
      <div className="search">
        <div className="bookshelf-title">Bookshelf</div>
        <div className="searchbox">
          <div className="input-wrapper">
            <label for="searchbox-input" className="fa fa-search"></label>
            <input id="searchbox-input" type="text" placeholder="Search..." />
          </div>
        </div>
      </div>


      <div className="logo">
        <img src={logo} alt="Jobsity logo" className="jobsity-logo" />
        <img src={logoText} alt="Jobsity text logo" className="jobsity-text-logo" />
      </div>


      <div className="user">
        <div className="user-border-wrapper">
          <div className="user-name-dropdown">
            <div className="user-name-text">Jakob Treml</div>
            <i className="fa fa-angle-down"></i>
          </div>
          <div className="user-image-cell">
            <div className="circular-image-wrapper">
              <img src={userImage} alt="user" className="user-image" />
            </div>
          </div>
        </div>
      </div>



      <input type="checkbox" id="collapsible-button-left" />
      <label for="collapsible-button-left" className="collapsible-button-left-wrapper">
        <i className="fa fa-bars"></i>
      </label>


      <div className="left-sidebar">
        <div className="left-sidebar-top">
          <div className="left-sidebar-title">MAIN</div>

          <div className="left-sidebar-li">
            <i className="fa fa-globe fa-fw"></i>Quito
          </div>

          <div className="left-sidebar-li">
            <i className="fa fa-globe fa-fw"></i>Cartagena
          </div>

          <div className="left-sidebar-li">
            <i className="fa fa-globe fa-fw"></i>Medellín
          </div>
          <div className="left-sidebar-li">
            <i className="fa fa-tablet-alt fa-fw"></i>Digital
          </div>

          <div className="left-sidebar-li">
            <i className="fa fa-user-tag fa-fw"></i>Personal Loans
          </div>

          <div className="left-sidebar-li">
            <i className="fa fa-tags fa-fw"></i>New Releases
          </div>

        </div>
        <div className="left-sidebar-bottom">
          <div className="left-sidebar-title">YOUR BOOKS</div>

          <div className="left-sidebar-li">
            <i className="fa fa-book-open fa-fw"></i>Readings
          </div>

          <div className="left-sidebar-li">
            <i className="fa fa-history fa-fw"></i>History
          </div>

          <div className="left-sidebar-li">
            <i className="fa fa-bookmark fa-fw"></i>Read later
          </div>

          <div className="left-sidebar-li">
            <i className="fa fa-heart fa-fw"></i>Favorites
          </div>

        </div>
      </div>



      <input type="checkbox" id="collapsible-button-right"/>
        <label for="collapsible-button-right" className="collapsible-button-right-wrapper">
          <i className="fa fa-bars"></i>
        </label>


        <div className="right-sidebar">
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


        <div className="main">
          <div className="main-header">
            <div className="main-title">
              New Releases
                </div>
            <div className="sort-by">
              <div className="release-date">Release Date</div>
              <div className="popularity">Popularity</div>
            </div>
            <div className="view-style">
              <i className="fa fa-th-large"></i>
              <i className="fa fa-th-list"></i>
            </div>
          </div>
          <div id="book-view" className="book-view">
          </div>
        </div>
    </div>
  );
}

export default App;
