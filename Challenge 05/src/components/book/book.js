export class Book {
    constructor (book) {
        this.title = book && book.title || '';
        this.authors = book && book.authors || [];
        this.author = this.authors.length > 0 ? this.authors[0] : 'Not available';
        this.publishedDate = book && book.publishedDate || '';
        this.description = book && book.description || '';
        this.pageCount = book && book.pageCount || 'not available';
        this.averageRating = book && book.averageRating || 0;
        this.roundedAverageRating = Math.round(this.averageRating);
        this.thumbnail = book && book.thumbnail || '';
        this.id = book && book.id || '';
        this.element = document.createElement('div');
        this.element.firstChild
        this.element.classList.add('book-container');

        fetch('./book.html').then((response) => {
            return response.text();
        }).then((template) => {
            const htmlCode = this._fillTempleate(template, this);
            this.element.innerHTML = htmlCode;
            this._initializeEventListeners();
        }).catch(err => console.log(err));
    }

    _buttonSeethroughListener (event) {
        const button = event.currentTarget.querySelector('i');
        if (button.classList.contains('fa')) {
            button.classList.remove('fa');
            button.classList.add('far');
        } else if (button.classList.contains('far')) {
            button.classList.remove('far');
            button.classList.add('fa');
        }
    }

    _userRatingListener (event) {
        let star = event.currentTarget;
        let nextStar = star.nextSibling;
        while (star) {
            if (star.classList.contains('far')) star.classList.remove('far');
            star.classList.add('fa');
            star = star.previousElementSibling;
        }

        while (nextStar) {
            if (nextStar.classList.contains('fa')) nextStar.classList.remove('fa');
            nextStar.classList.add('far');
            nextStar = nextStar.nextElementSibling;
        }
    }

    _initializeEventListeners() {
        const bookMarkButton = this.element.querySelector('.bookmark-button-wrapper');
        bookMarkButton.addEventListener('click', this._buttonSeethroughListener.bind(this));
        bookMarkButton.addEventListener('touchend', this._buttonSeethroughListener.bind(this));
        
        const hearButton = this.element.querySelector('.heart-button-wrapper');
        hearButton.addEventListener('click', this._buttonSeethroughListener.bind(this));
        hearButton.addEventListener('touchend', this._buttonSeethroughListener.bind(this));

        const stars = Array.from(this.element.querySelector('.seethrough-rating').children);
        stars.forEach((star) => {
            star.addEventListener('click', this._userRatingListener.bind(this));
            star.addEventListener('mousened', this._userRatingListener.bind(this));
        });
    }

    _readFile(url) {
        const rawFile = new XMLHttpRequest();
        rawFile.open("GET", url, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    const allText = rawFile.responseText;
                    const htmlCode = this._fillTempleate(allText, this);
                    this.element.innerHTML = htmlCode;
                }
            }
        }.bind(this);
        rawFile.send(null);
    }

    _fillTempleate(template, parameters) {
        const f = new Function("return `" + template + "`;");
        return f.call(parameters);
    }
}