import React, { Component } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import { timer } from 'rxjs';
import bookmarkImage from '../../assets/images/bookmark.png';
import userImage from '../../assets/images/user_image.jpg';
import Reservation from '../reservation/Reservation';
import * as actions from '../../actions/index';
import {
  BookAuthor,
  BookContainer,
  BookCover,
  BookDetails,
  BookRating,
  BookTitle,
  BookmarkButton,
  BookmarkIcon,
  BubbleTextArrow,
  DescriptionButton,
  DetailsHead,
  DetailsRating,
  DetailsRecommended,
  DetailsSummary,
  HeartButton,
  LendButton,
  Overlay,
  Seethrough,
  SeethroughRating,
  SeethroughTitle,
} from './Layout';

function mapDispatchToProps(dispatch) {
  return {
    updateBook: (newBook) => dispatch(actions.updateBook(newBook)),
  };
}
class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarked: false,
      liked: false,
      userRating: 0,
      openedSeethroughOptions: false,
      openedDetails: false,
      openedLendOptions: false,
      detailsReversed: false,
      up: false,
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
    this.onBookUpdated = this.onBookUpdated.bind(this);
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

  componentDidMount() {
    this.socket = io('http://localhost:3001', { forceNew: true });
    const { id } = this.props;
    this.socket.emit('subscribe', id);
    this.socket.on('update-book', this.onBookUpdated);
  }

  componentWillUnmount() {
    if (this.socket) this.socket.close();
  }

  onBookUpdated(book) {
    const { updateBook, title, toastManager } = this.props;
    toastManager.add(`Book "${title}" updated`, {
      appearance: 'info',
      autoDismiss: true,
      autoDismissTimeout: 5000,
    });
    const newBook = {
      title: book.title,
      author: book.author,
      publishedDate: book.publishedDate ? book.publishedDate.split('-')[0] : 'Not available',
      description: book.description,
      roundedAverageRating: book.averageRating ? Math.round(book.averageRating) : 0,
      thumbnail: book.thumbnail,
      id: book.id,
      key: book.id,
      pageCount: `${book.pageCount}`,
      format: book.format,
      available: book.available,
    }
    updateBook(newBook);
    this.setState({
      up: true,
    });
    const source = timer(500);
    source.subscribe(() => {
      this.setState({
        up: false,
      });
    }, (err) => {
      // eslint-disable-next-line no-console
      console.log(`Error: ${err.message}`);
    });
  }

  clickLendButtonHandler(event) {
    event.stopPropagation();
    const { openedLendOptions, openedDetails } = this.state;
    const { id, selectBook } = this.props;

    const { innerWidth } = window;
    // const bookWidth = this.offsetWidth;
    const reversed = event.pageX > (innerWidth / 2);
    selectBook(id);
    this.setState({
      openedLendOptions: !openedLendOptions,
      openedDetails: openedLendOptions ? openedDetails : false,
      ...(openedLendOptions ? {} : { lendReversed: reversed }),
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
    event.preventDefault();
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
    event.preventDefault();
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
      format,
      available,
    } = this.props;

    const {
      bookmarked,
      liked,
      userRating,
      openedDetails,
      openedSeethroughOptions,
      openedLendOptions,
      detailsReversed,
      lendReversed,
      up,
    } = this.state;

    return (
      <BookContainer up={up}>
        <div
          className="label-btn"
          onMouseEnter={this.mouseEnterSeethroughHandler}
          onMouseLeave={this.mouseLeaveSeethroughHanlder}
          onTouchEnd={this.clickSeethroughHandler}
          onKeyDown={(event) => (event.keyCode === 32 ? this.clickSeethroughHandler(event) : null)}
          tabIndex="0"
          role="button"
        >
          <BookCover>
            <img src={thumbnail} alt="Everything I never told you" className="book-cover" />
            <Seethrough selected={openedSeethroughOptions}>
              <div className="heart-button-cell">
                <HeartButton
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
                </HeartButton>
              </div>
              <div className="bookmark-button-cell">
                <BookmarkButton
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
                </BookmarkButton>
              </div>
              <div className="description-button-cell">
                <DescriptionButton
                  className="description-button-wrapper"
                  onClick={this.clickDescriptionHandler}
                  onTouchEnd={this.clickDescriptionHandler}
                  onKeyDown={(event) => (
                    event.keyCode === 32
                      ? this.clickDescriptionHandler(event)
                      : null)}
                  role="button"
                  tabIndex="0"
                >
                  <i className="fa fa-book-open" />
                </DescriptionButton>
              </div>
              <div className="seethrough-title-rating">
                <SeethroughTitle>
                  RATE THIS BOOK
                </SeethroughTitle>
                <SeethroughRating>
                  {[...Array(5).keys()].map((index) => (
                    <i
                      className={`${userRating >= index + 1 ? 'fa' : 'far'} fa-star`}
                      onClick={(event) => this.clickRatingHandler(event, index + 1)}
                      onTouchEnd={(event) => this.clickRatingHandler(event, index + 1)}
                      onKeyDown={(event) => (
                        event.keyCode === 32
                          ? this.clickRatingHandler(event, index + 1)
                          : null
                      )}
                      tabIndex="0"
                      role="button"
                      aria-label={`Rate ${index + 1} star`}
                      key={index}
                    />
                  ))}
                </SeethroughRating>
              </div>
            </Seethrough>
          </BookCover>
          {
            openedDetails
              ? (
                <Overlay
                  onClick={this.clickOutsideHandler}
                  onTouchEnd={this.clickOutsideHandler}
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
          <BookDetails
            reversed={detailsReversed}
            selected={openedDetails}
            onClick={this.clickDescriptionHandler}
            onTouchEnd={this.clickDescriptionHandler}
            onKeyDown={(event) => (
              event.keyCode === 32
                ? this.clickDescriptionHandler(event)
                : null
            )}
            role="button"
            tabIndex="0"
          >
            <BubbleTextArrow reversed={detailsReversed}>
              <div className="bubble-text-arrow-top" />
              <div className="bubble-text-arrow-bottom" />
            </BubbleTextArrow>
            <DetailsHead>
              <div className="book-details-title">
                {title}
              </div>
              <div className="book-details-year">
                {publishedDate}
              </div>
              <div className="book-details-author">
                <div className="book-details-novel-by">Novel by&nbsp;</div>
                <div className="book-details-author-name">
                  {` ${author}`}
                </div>
              </div>
              <div className="book-details-pages">
                {`${pageCount} `}
                pages
              </div>
            </DetailsHead>
            <DetailsSummary>
              <div className="book-details-section-title">SUMMARY</div>
              <div className="book-details-summary-body">
                {description}
              </div>
            </DetailsSummary>
            <DetailsRating>
              <div className="book-details-section-title">RATING</div>
              <div className="book-details-rating-stars">
                {[...Array(5).keys()].map((index) => (
                  <i key={index} className={`${roundedAverageRating >= index + 1 ? 'fa' : 'far'} fa-star`} />
                ))}
              </div>
            </DetailsRating>
            <DetailsRecommended>
              <div className="book-details-section-title">RECOMMENDED BY</div>
              <div className="book-details-recommended-body">
                <div className="book-details-recommended-img-wrapper">
                  <img src={userImage} alt="user" className="book-details-recommended-img" />
                </div>
              </div>
            </DetailsRecommended>
          </BookDetails>
        </div>
        <BookTitle className="book-title">
          {title}
        </BookTitle>
        <BookAuthor className="book-author">
          {author}
        </BookAuthor>
        <LendButton
          role="button"
          available={available}
          onClick={(event) => (available ? this.clickLendButtonHandler(event) : null)}
          onKeyDown={(event) => (event.keyCode === 32 ? this.clickLendButtonHandler(event) : null)}
          tabIndex="0"
        >
          {available ? 'Reserve' : ((format === 'Digital' && format) || 'Unavailable')}
        </LendButton>
        <BookRating className="book-rating">
          {[...Array(5).keys()].map((index) => (
            <i key={index} className={`${roundedAverageRating >= index + 1 ? 'fa' : 'far'} fa-star`} />
          ))}
        </BookRating>

        <BookmarkIcon
          selected={bookmarked}
          src={bookmarkImage}
          alt="bookmark-icon"
          ref={this.bookmarkIcon}
        />

        {openedLendOptions
          ? (
            <>
              <Overlay
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
              <Reservation
                bookId={id}
                closeListener={this.clickLendButtonHandler}
                openLeft={lendReversed}
              />
            </>
          )
          : ''}
      </BookContainer>
    );
  }
}

export default withToastManager(connect(null, mapDispatchToProps)(Book));

Book.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  publishedDate: PropTypes.string,
  description: PropTypes.string,
  pageCount: PropTypes.string,
  roundedAverageRating: PropTypes.number,
  thumbnail: PropTypes.string,
  format: PropTypes.string,
  id: PropTypes.string,
  selected: PropTypes.bool,
  selectBook: PropTypes.func,
  unselectBook: PropTypes.func,
  available: PropTypes.bool,
  updateBook: PropTypes.func.isRequired,
  toastManager: PropTypes.shape({
    add: PropTypes.func,
  }),
};

Book.defaultProps = {
  title: 'No title',
  author: 'No author',
  publishedDate: 'No published date',
  description: 'No description',
  pageCount: 'Not available',
  format: 'Unavailable',
  available: false,
  roundedAverageRating: 0,
  thumbnail: '',
  id: '',
  selected: false,
  selectBook: () => {},
  unselectBook: () => {},
  toastManager: {
    add: () => {},
  },
};
