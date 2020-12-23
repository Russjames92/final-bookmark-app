'use_strict';

import $ from 'jquery';

import 'normalize.css';
import './style.css';

import api from './components/api';
import bookmarkList from './components/bookmark-list';
import store from './components/store';

const main = function () {
    api.getBookmarks()
        .then((bookmarks) => {
            bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
            bookmarkList.render();
        });
    bookmarkList.bindEventListeners();
};

$(main);