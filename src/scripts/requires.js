const $ = require('jQuery');
const webdriver = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const phantomjs = require('phantomjs');

const Server = require('../scripts/server');
const User = require('../scripts/user');

const { AppWindow } = require('../scripts/graphics');
const ModalWindow = require('../scripts/modal');