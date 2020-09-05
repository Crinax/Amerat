const $ = require('jQuery');
const webdriver = require('selenium-webdriver');
const { until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
//Server
const Server = require('../scripts/server');
const User = require('../scripts/user');
//Graphics
const { AppWindow } = require('../scripts/graphics');
const ModalWindow = require('../scripts/modal');
const Profile = require('../scripts/profile');