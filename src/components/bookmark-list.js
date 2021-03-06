'use_strict';

import $ from 'jquery';
import api from './api';
import store from './store';

import '../style.css';

const generateMainPageLayout = () => {
    return `
  <section class="container">
      <h1 class="site-heading">BOOKMARKit</h1>
      <div class="error-container shadow"></div>
      <div class="even-flex js-add-bookmark-button ">
        <button class='js-add-bookmark shadow'></button>
        <select class='js-filter-rating shadow'>
          <option value="0">Minimum Rating</option>
          <option value="1">1+ stars</option>
          <option value="2">2+ stars</option>
          <option value="3">3+ stars</option>
          <option value="4">4+ stars</option>
          <option value="5">5 stars</option>
        </select>
      </div>
      <div id="js-add-new-bookmark" class="js-add-new-bookmark">
      </div>
    </section>
    <section class="container">
      <ul id="js-bookmark-list" class="bookmark-list">
      </ul>
    </section>
  `;
};

const generateBookmarkAddForm = () => {
    return `
    <form id="js-add-new-bookmark-form" class="js-add-new-bookmark-form">
      <div class="even-flex flex-direction">
        <fieldset class="flex-desktop">
          <legend>TITLE</legend>
          <input type="text" name="title" class="js-bookmark-title-entry" placeholder="e.g., Google" required />
        </fieldset>
        <fieldset class="flex-desktop">
          <legend>URL</legend>
          <input type="text" name="url" class="js-bookmark-url-entry" value="https://" placeholder="e.g., https://google.com" required />
        </fieldset>
      </div>
      <div>
        <fieldset>
          <legend>DESCRIPTION</legend>
          <textarea name="desc" class="js-bookmark-desc-entry textarea-newadd" maxlength="255" required></textarea>
        </fieldset>
      </div>
      <div class="flex-between">
        <div class="rating left-side star-size">
          <label>
            <input type="radio" name="rating" class="js-bookmark-rating-entry" value="1" required/>
            <div class="star-container">
                <span class="icon">★</span>
                </div>
          </label>
          <label>
            <input type="radio" name="rating" class="js-bookmark-rating-entry" value="2" />
            <div class="star-container">
                <span class="icon">★</span>
                <span class="icon">★</span>
            </div>
          </label>
          <label>
            <input type="radio" name="rating" class="js-bookmark-rating-entry" value="3" />
            <div class="star-container">
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
            </div> 
          </label>
          <label>
            <input type="radio" name="rating" class="js-bookmark-rating-entry" value="4" />
            <div class="star-container">
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
            </div>
          </label>
          <label>
            <input type="radio" name="rating" class="js-bookmark-rating-entry" value="5" />
            <div class="star-container">
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
            </div>
          </label>
        </div>
        <button class="right-side add-button" type="submit">Add Bookmark</button>
      </div>
    </form>
  `;
};

const generateBookmarkElement = (bookmark, stars) => {
    return `
    <li class="js-bookmark-item shadow" data-item-id="${bookmark.id}">
      <div class="top-half" tabindex=0>
        <h2 class="bookmark-title">${bookmark.title}</h2>
      </div>
      <div class="bottom-half">
        <div class="rating even-flex">
        <span class="rating-label">Rating</span>
        ${stars}
        </div>
      </div>
      <hr />
    </li>
  `;
};

const generateExpandedBookmarkElement = (bookmark) => {
    return `
    <li class="js-bookmark-item" data-item-id="${bookmark.id}">
      <div class="top-half" tabindex=0>
        <h2>${bookmark.title}</h1>
      </div>
      <div class="flex-details">
        <div class="flex-link">
          <button class="aliceblue flex-button" onclick=" window.open('${bookmark.url}','_blank')">Visit Site</button>
        </div>
          <textarea name="desc" class="js-bookmark-desc-entry flex-desc" maxlength="255" required>${bookmark.desc}</textarea>
      </div>
      <div class="bottom-half flex-between">
        <div class="rating left-side">
          <label>
            <input type="radio" name="rating" class="js-bookmark-rating-entry" value="1" ${bookmark.rating == 1 ? 'checked' : ''} required/>
            <div class="star-container">
                <span class="icon">★</span>
            </div>
          </label>
          <label>
            <input type="radio" name="rating" class="js-bookmark-rating-entry" value="2" ${bookmark.rating == 2 ? 'checked' : ''} />
            <div class="star-container">
                <span class="icon">★</span>
                <span class="icon">★</span>
            </div>
          </label>
          <label>
            <input type="radio" name="rating" class="js-bookmark-rating-entry" value="3" ${bookmark.rating == 3 ? 'checked' : ''} />
            <div class="star-container">
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
            </div>
          </label>
          <label>
            <input type="radio" name="rating" class="js-bookmark-rating-entry" value="4" ${bookmark.rating == 4 ? 'checked' : ''} />
            <div class="star-container">
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
            </div>
          </label>
          <label>
            <input type="radio" name="rating" class="js-bookmark-rating-entry" value="5" ${bookmark.rating == 5 ? 'checked' : ''} />
            <div class="star-container">
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
                <span class="icon">★</span>
            </div>
          </label>
        </div>
        <div class="right-side">
          <button class="js-bookmark-save expand-buttons shadow">Save/Collapse</button>
          <button class="js-bookmark-delete expand-buttons shadow">Delete</button>
        </div>
      </div>
    </li>
  `;
};

const generateStarRating = (number) => {
    let stars = '';
    for (let i = 0; i < number; i++) {
        stars += '★';
    }
    return `<span class="icon colored-stars">${stars}</span>`;
};

const generateBookmarkListString = (bookmarkList) => {
    const bookmarks = bookmarkList
        .filter((bookmark) => {
            return bookmark.rating >= store.rating;
        }).map((bookmark) => (!bookmark.expand) ? generateBookmarkElement(bookmark, generateStarRating(bookmark.rating)) : generateExpandedBookmarkElement(bookmark));
    return bookmarks.join('');
};

const render = () => {
    renderError();
    $('main').html(generateMainPageLayout);
    if (store.addNewBookmark) {
        $('.js-add-new-bookmark').html(generateBookmarkAddForm());
    } else {
        $('.js-add-new-bookmark').empty();
    }
    let bookmarks = [...store.bookmarks];
    // render the shopping list in the DOM
    const bookmarkListString = generateBookmarkListString(bookmarks);
    // insert that HTML into the DOM
    $('.js-add-bookmark').html(!store.addNewBookmark ? '+NEW' : 'Cancel');
    $('#js-bookmark-list').html(bookmarkListString);
};

const generateError = (message) => {
    return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
};

const renderError = () => {
    if (store.error) {
        const el = generateError(store.error);
        $('.error-container').html(el);
    } else {
        $('.error-container').empty();
    }
};

const handleCloseError = () => {
    $('.error-container').on('click', '#cancel-error', () => {
        store.setError(null);
        renderError();
    });
};

const getItemIdFromElement = function (item) {
    return $(item)
        .closest('.js-bookmark-item')
        .data('item-id');
};

const handleAddNewBookmarkClick = () => {
    $('main').on('click', '.js-add-bookmark', event => {
        store.toggleAddNewBookmark();
        render();
    });
};

const handleSubmitNewBookmark = () => {
    $('main').on('submit', '.js-add-new-bookmark-form', event => {
        event.preventDefault();
        const newBookmarkData = $(event.target).serializeJson();
        api.createBookmark(newBookmarkData)
            .then((newBookmark) => {
                store.addBookmark(newBookmark);
                store.toggleAddNewBookmark();
                render();
            })
            .catch((error) => {
                store.setError(error.message);
                renderError();
            });
    });
};

const handleClickToExpandBookmark = () => {
    $('main').on('click', '.top-half', event => {
        const bookmarkId = getItemIdFromElement(event.currentTarget);
        const bookmark = store.findById(bookmarkId);
        store.findAndUpdate(bookmarkId, { expand: !bookmark.expand });
        render();
        store.bookmarks.forEach(bookmark => bookmark.expand = false);
    });
};

const handleKeyPressToExpandBookmark = () => {
    $('main').on('keydown', '.top-half', event => {
        if (event.key === 'Enter') {
            const bookmarkId = getItemIdFromElement(event.currentTarget);
            const bookmark = store.findById(bookmarkId);
            store.findAndUpdate(bookmarkId, { expand: !bookmark.expand });
            render();
            store.bookmarks.forEach(bookmark => bookmark.expand = false);
        }
    });
};

const handleDeleteBookmark = () => {
    $('main').on('click', '.js-bookmark-delete', event => {
        const bookmarkId = getItemIdFromElement(event.currentTarget);
        api.deleteBookmark(bookmarkId)
            .then(() => {
                store.findAndDelete(bookmarkId);
                render();
            })
            .catch((error) => {
                store.setError(error.message);
                renderError();
            });
    });
};

const handleRatingFilterChange = () => {
    $('main').on('change', '.js-filter-rating', event => {
        store.rating = $(event.target).val();
        render();
    });
};

const handleBookmarkSaveClick = () => {
    $('main').on('click', '.js-bookmark-save', event => {
        const bookmarkId = getItemIdFromElement(event.currentTarget);
        const newDesc = $('.js-bookmark-desc-entry').val();
        const newRating = $('input[name="rating"]:checked').val();
        const newData = JSON.stringify({ desc: newDesc, rating: newRating });
        const parsedNewData = JSON.parse(newData);
        api.updateBookmark(bookmarkId, newData)
            .then(() => {
                store.findAndUpdate(bookmarkId, parsedNewData);
                render();
            })
            .catch((error) => {
                store.setError(error.message);
                renderError();
            });
    });
};

$.fn.extend({
    serializeJson: function () {
        const formData = new FormData(this[0]);
        const o = {};
        formData.forEach((val, name) => o[name] = val);
        return JSON.stringify(o);
    }
});

const bindEventListeners = () => {
    handleCloseError();
    handleAddNewBookmarkClick();
    handleSubmitNewBookmark();
    handleClickToExpandBookmark();
    handleDeleteBookmark();
    handleRatingFilterChange();
    handleBookmarkSaveClick();
    handleKeyPressToExpandBookmark();
};

export default {
    bindEventListeners,
    render
};