import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next');
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev');
    }

    // Other page
    if (curPage < numPages) {
      return (
        this._generateMarkupButton('prev') + this._generateMarkupButton('next')
      );
    }

    // Page 1, and there are no other pages
    return '';
  }

  _generateMarkupButton(btn) {
    const curPage = this._data.page;
    if (btn === 'prev')
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--${btn}">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
    `;

    if (btn === 'next')
      return `
          <button data-goto="${
            curPage + 1
          }" class="btn--inline pagination__btn--${btn}">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
  }
}

export default new PaginationView();
