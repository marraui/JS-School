import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bookmarkImage from '../../assets/images/bookmark.png';
import userImage from '../../assets/images/user_image.jpg';
import Reservation from '../reservation/Reservation';
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
      detailsReversed: false,
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
    } = this.state;

    return (
      <BookContainer ref={this.bookContainerRef}>
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
                  <i
                    className={`${userRating >= 1 ? 'fa' : 'far'} fa-star`}
                    onClick={(event) => this.clickRatingHandler(event, 1)}
                    onTouchEnd={(event) => this.clickRatingHandler(event, 1)}
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
                    onTouchEnd={(event) => this.clickRatingHandler(event, 2)}
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
                    onTouchEnd={(event) => this.clickRatingHandler(event, 3)}
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
                    onTouchEnd={(event) => this.clickRatingHandler(event, 4)}
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
                    onTouchEnd={(event) => this.clickRatingHandler(event, 5)}
                    onKeyDown={(event) => (
                      event.keyCode === 32
                        ? this.clickRatingHandler(event, 5)
                        : null
                    )}
                    tabIndex="0"
                    role="button"
                    aria-label="Rate 5 stars"
                  />
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
            <BubbleTextArrow>
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
                <div className="book-details-novel-by">Novel by</div>
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
                <i className={`${roundedAverageRating >= 1 ? 'fa' : 'far'} fa-star`} />
                <i className={`${roundedAverageRating >= 2 ? 'fa' : 'far'} fa-star`} />
                <i className={`${roundedAverageRating >= 3 ? 'fa' : 'far'} fa-star`} />
                <i className={`${roundedAverageRating >= 4 ? 'fa' : 'far'} fa-star`} />
                <i className={`${roundedAverageRating >= 5 ? 'fa' : 'far'} fa-star`} />
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
          available={format === 'Physical'}
          onClick={(event) => (format === 'Physical' ? this.clickLendButtonHandler(event) : null)}
          onKeyDown={(event) => (event.keyCode === 32 ? this.clickLendButtonHandler(event) : null)}
          tabIndex="0"
        >
          {format === 'Physical' ? 'Reserve' : format}
        </LendButton>
        <BookRating className="book-rating">
          <i className={`${roundedAverageRating >= 1 ? 'fa' : 'far'} fa-star`} />
          <i className={`${roundedAverageRating >= 2 ? 'fa' : 'far'} fa-star`} />
          <i className={`${roundedAverageRating >= 3 ? 'fa' : 'far'} fa-star`} />
          <i className={`${roundedAverageRating >= 4 ? 'fa' : 'far'} fa-star`} />
          <i className={`${roundedAverageRating >= 5 ? 'fa' : 'far'} fa-star`} />
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
};

Book.defaultProps = {
  title: 'No title',
  author: 'No author',
  publishedDate: 'No published date',
  description: 'No description',
  pageCount: 'Not available',
  format: 'Unavailable',
  roundedAverageRating: 0,
  thumbnail: '',
  id: '',
  selected: false,
  selectBook: () => {},
  unselectBook: () => {},
};
