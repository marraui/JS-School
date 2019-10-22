import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Book.scss';
import bookmarkImage from '../../assets/images/bookmark.png';
import userImage from '../../assets/images/user_image.jpg';
import Reservation from '../reservation/Reservation';

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarked: false,
      liked: false,
      userRating: 0,
      openedSeethroughOptions: false,
      openedDetails: false,
      openedLendOptions: false,
      detailsReversed: true,
    };

    this.clickBookmarkHandler = this.clickBookmarkHandler.bind(this);
    this.clickDescriptionHandler = this.clickDescriptionHandler.bind(this);
    this.clickLikeHandler = this.clickLikeHandler.bind(this);
    this.clickRatingHandler = this.clickRatingHandler.bind(this);
    this.clickSeethroughHandler = this.clickSeethroughHandler.bind(this);
    this.mouseEnterSeethroughHandler = this.mouseEnterSeethroughHandler.bind(this);
    this.mouseLeaveSeethroughHanlder = this.mouseLeaveSeethroughHanlder.bind(this);
    this.clickLendButtonHandler = this.clickLendButtonHandler.bind(this);
    this.clickOutsideHandler = this.clickOutsideHandler.bind(this);

    this.bookContainerRef = React.createRef();
  }

  static getDerivedStateFromProps(nextProps) {
    const { selected } = nextProps;
    if (!selected) {
      return {
        bookmarked: false,
        liked: false,
        userRating: 0,
        openedDetails: false,
        openedLendOptions: false,
      };
    }
    return null;
  }

  clickLendButtonHandler(event) {
    event.stopPropagation();
    const { openedLendOptions, openedDetails } = this.state;
    const { id, selectBook } = this.props;
    selectBook(id);
    this.setState({
      openedLendOptions: !openedLendOptions,
      openedDetails: openedLendOptions ? openedDetails : false,
    });
  }

  mouseEnterSeethroughHandler(event) {
    event.stopPropagation();
    const { openedSeethroughOptions } = this.state;
    if (!openedSeethroughOptions) {
      this.setState({
        openedSeethroughOptions: true,
      });
    }
  }

  mouseLeaveSeethroughHanlder(event) {
    event.stopPropagation();
    // event.preventDefault();
    const { openedSeethroughOptions } = this.state;
    if (openedSeethroughOptions) {
      this.setState({
        openedSeethroughOptions: false,
      });
    }
  }

  clickSeethroughHandler(event) {
    event.stopPropagation();
    const { openedSeethroughOptions } = this.state;
    const { id, selectBook } = this.props;
    selectBook(id);
    this.setState({
      openedSeethroughOptions: !openedSeethroughOptions,
    });
  }

  clickBookmarkHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    const { bookmarked } = this.state;
    const { id, selectBook } = this.props;
    selectBook(id);
    this.setState({
      bookmarked: !bookmarked,
    });
  }

  clickLikeHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    const { liked } = this.state;
    const { id, selectBook } = this.props;
    selectBook(id);
    this.setState({
      liked: !liked,
    });
  }

  clickDescriptionHandler(event) {
    event.stopPropagation();
    const { openedDetails, openedLendOptions } = this.state;
    const { id, selectBook } = this.props;

    const { innerWidth } = window;
    // const bookWidth = this.offsetWidth;
    const reversed = event.pageX > (innerWidth / 2);
    selectBook(id);
    this.setState({
      openedDetails: !openedDetails,
      openedLendOptions: openedDetails ? openedLendOptions : false,
      detailsReversed: reversed,
    });
  }

  clickRatingHandler(event, rating) {
    event.stopPropagation();
    const { id, selectBook } = this.props;
    selectBook(id);
    this.setState({
      userRating: rating,
    });
  }

  clickOutsideHandler(event) {
    event.stopPropagation();
    const { selected, unselectBook, id } = this.props;
    if (selected) {
      unselectBook(id);
      this.setState({
        openedSeethroughOptions: false,
      });
    }
  }

  render() {
    const {
      title,
      author,
      publishedDate,
      description,
      pageCount,
      roundedAverageRating,
      thumbnail,
      id,
    } = this.props;

    const {
      bookmarked,
      liked,
      userRating,
      openedDetails,
      openedSeethroughOptions,
      openedLendOptions,
      detailsReversed,
    } = this.state;

    return (
      <div className="book-container" ref={this.bookContainerRef}>
        <div
          className="label-btn"
          onMouseEnter={this.mouseEnterSeethroughHandler}
          onMouseLeave={this.mouseLeaveSeethroughHanlder}
          onTouchEnd={this.clickSeethroughHandler}
          onKeyDown={(event) => (event.keyCode === 32 ? this.clickSeethroughHandler(event) : null)}
          tabIndex="0"
          role="button"
        >
          <div className="book-cover-wrapper">
            <img src={thumbnail} alt="Everything I never told you" className="book-cover" />
            <div className={`${openedSeethroughOptions ? 'book-cover-seethrough-selected' : 'book-cover-seethrough-unselected'}`}>
              <div className="heart-button-cell">
                <div
                  className="heart-button-wrapper"
                  onClick={this.clickLikeHandler}
                  onTouchEnd={this.clickLikeHandler}
                  onKeyDown={(event) => (
                    event.keyCode === 32
                      ? this.clickLikeHandler(event)
                      : null)}
                  role="button"
                  tabIndex="0"
                >
                  <i className={`${liked ? 'fa' : 'far'} fa-heart`} />
                </div>
              </div>
              <div className="bookmark-button-cell">
                <div
                  className="bookmark-button-wrapper"
                  onClick={this.clickBookmarkHandler}
                  onTouchEnd={this.clickBookmarkHandler}
                  onKeyDown={(event) => (
                    event.keyCode === 32
                      ? this.clickBookmarkHandler(event)
                      : null)}
                  role="button"
                  tabIndex="0"
                >
                  <i className={`${bookmarked ? 'fa' : 'far'} fa-bookmark`} />
                </div>
              </div>
              <div className="description-button-cell">
                <div
                  className="description-button-wrapper"
                  onClick={this.clickDescriptionHandler}
                  onKeyDown={(event) => (
                    event.keyCode === 32
                      ? this.clickDescriptionHandler(event)
                      : null)}
                  role="button"
                  tabIndex="0"
                >
                  <i className="fa fa-book-open" />
                </div>
              </div>
              <div className="seethrough-title-rating">
                <div className="seethrough-title">
                    RATE THIS BOOK
                </div>
                <div className="seethrough-rating">
                  <i
                    className={`${userRating >= 1 ? 'fa' : 'far'} fa-star`}
                    onClick={(event) => this.clickRatingHandler(event, 1)}
                    onKeyDown={(event) => (
                      event.keyCode === 32
                        ? this.clickRatingHandler(event, 1)
                        : null
                    )}
                    tabIndex="0"
                    role="button"
                    aria-label="Rate 1 star"
                  />
                  <i
                    className={`${userRating >= 2 ? 'fa' : 'far'} fa-star`}
                    onClick={(event) => this.clickRatingHandler(event, 2)}
                    onKeyDown={(event) => (
                      event.keyCode === 32
                        ? this.clickRatingHandler(event, 2)
                        : null
                    )}
                    tabIndex="0"
                    role="button"
                    aria-label="Rate 2 stars"
                  />
                  <i
                    className={`${userRating >= 3 ? 'fa' : 'far'} fa-star`}
                    onClick={(event) => this.clickRatingHandler(event, 3)}
                    onKeyDown={(event) => (
                      event.keyCode === 32
                        ? this.clickRatingHandler(event, 3)
                        : null
                    )}
                    tabIndex="0"
                    role="button"
                    aria-label="Rate 3 stars"
                  />
                  <i
                    className={`${userRating >= 4 ? 'fa' : 'far'} fa-star`}
                    onClick={(event) => this.clickRatingHandler(event, 4)}
                    onKeyDown={
                      (event) => (
                        event.keyCode === 32
                          ? this.clickRatingHandler(event, 4)
                          : null
                      )
                    }
                    tabIndex="0"
                    role="button"
                    aria-label="Rate 4 stars"
                  />
                  <i
                    className={`${userRating >= 5 ? 'fa' : 'far'} fa-star`}
                    onClick={(event) => this.clickRatingHandler(event, 5)}
                    onKeyDown={(event) => (
                      event.keyCode === 32
                        ? this.clickRatingHandler(event, 5)
                        : null
                    )}
                    tabIndex="0"
                    role="button"
                    aria-label="Rate 5 stars"
                  />
                </div>
              </div>
            </div>
          </div>
          {
            openedDetails
              ? (
                <div
                  className="viewport-container"
                  onClick={this.clickOutsideHandler}
                  onKeyDown={(event) => (
                    event.keyCode === 32
                      ? this.clickOutsideHandler(event)
                      : null
                  )}
                  role="button"
                  tabIndex="0"
                  aria-label="Overlay"
                />
              )
              : null
          }
          <div
            className={`${openedDetails ? 'book-details-selected' : 'book-details-unselected'} ${detailsReversed ? 'reversed' : ''}`}
            onClick={this.clickDescriptionHandler}
            onKeyDown={(event) => (
              event.keyCode === 32
                ? this.clickDescriptionHandler(event)
                : null
            )}
            role="button"
            tabIndex="0"
          >
            <div className="bubble-text-arrow">
              <div className="bubble-text-arrow-top" />
              <div className="bubble-text-arrow-bottom" />
            </div>
            <div className="book-details-head">
              <div className="book-details-title">
                {title}
              </div>
              <div className="book-details-year">
                {publishedDate}
              </div>
              <div className="book-details-author">
                <div className="book-details-novel-by">Novel by</div>
                <div className="book-details-author-name">
                  {` ${author}`}
                </div>
              </div>
              <div className="book-details-pages">
                {`${pageCount} `}
                pages
              </div>
            </div>
            <div className="book-details-summary">
              <div className="book-details-section-title">SUMMARY</div>
              <div className="book-details-summary-body">
                {description}
              </div>
            </div>
            <div className="book-details-rating">
              <div className="book-details-section-title">RATING</div>
              <div className="book-details-rating-stars">
                <i className={`${roundedAverageRating >= 1 ? 'fa' : 'far'} fa-star`} />
                <i className={`${roundedAverageRating >= 2 ? 'fa' : 'far'} fa-star`} />
                <i className={`${roundedAverageRating >= 3 ? 'fa' : 'far'} fa-star`} />
                <i className={`${roundedAverageRating >= 4 ? 'fa' : 'far'} fa-star`} />
                <i className={`${roundedAverageRating >= 5 ? 'fa' : 'far'} fa-star`} />
              </div>
            </div>
            <div className="book-details-recommended">
              <div className="book-details-section-title">RECOMMENDED BY</div>
              <div className="book-details-recommended-body">
                <div className="book-details-recommended-img-wrapper">
                  <img src={userImage} alt="user" className="book-details-recommended-img" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="book-title">
          {title}
        </div>
        <div className="book-author">
          {author}
        </div>
        <div
          className="book-lend-button"
          role="button"
          onClick={this.clickLendButtonHandler}
          onKeyDown={(event) => (event.keyCode === 32 ? this.clickLendButtonHandler(event) : null)}
          tabIndex="0"
        >
          Reserve
        </div>
        <div className="book-rating">
          <i className={`${roundedAverageRating >= 1 ? 'fa' : 'far'} fa-star`} />
          <i className={`${roundedAverageRating >= 2 ? 'fa' : 'far'} fa-star`} />
          <i className={`${roundedAverageRating >= 3 ? 'fa' : 'far'} fa-star`} />
          <i className={`${roundedAverageRating >= 4 ? 'fa' : 'far'} fa-star`} />
          <i className={`${roundedAverageRating >= 5 ? 'fa' : 'far'} fa-star`} />
        </div>

        <img
          src={bookmarkImage}
          alt="bookmark-icon"
          className={bookmarked ? 'bookmark-icon-selected' : 'bookmark-icon-unselected'}
          ref={this.bookmarkIcon}
        />
        {openedLendOptions ? <Reservation bookId={id} closeListener={this.clickLendButtonHandler} /> : ''}
      </div>
    );
  }
}

Book.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  publishedDate: PropTypes.string,
  description: PropTypes.string,
  pageCount: PropTypes.string,
  roundedAverageRating: PropTypes.number,
  thumbnail: PropTypes.string,
  id: PropTypes.string,
  selected: PropTypes.bool,
  selectBook: PropTypes.func,
  unselectBook: PropTypes.func,
};

Book.defaultProps = {
  title: 'No title',
  author: 'No author',
  publishedDate: 'No published date',
  description: 'No description',
  pageCount: 'Not available',
  roundedAverageRating: 0,
  thumbnail: '',
  id: '',
  selected: false,
  selectBook: () => {},
  unselectBook: () => {},
};
