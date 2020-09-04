const $ = require('jQuery');
const webdriver = require('selenium-webdriver');
const { until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

const Server = require('../scripts/server');
const User = require('../scripts/user');

const { AppWindow } = require('../scripts/graphics');
const ModalWindow = require('../scripts/modal');