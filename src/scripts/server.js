class Server {
    constructor() {
        this.client;
        this.URL;
    }
    destructor() {
        this.client.quit();
    }
    init() {
        // var _options = new firefox.Options();
        // _options.headless();
        this.client = new webdriver.Builder()
            // .setFirefoxOptions(_options)
            // .withCapabilities('firefox')
            .forBrowser('chrome')
            .build();
        this.URL = 'https://instagram.com';
        this.changeURL(this.URL);
    }
    changeURL(newURL) {
        this.URL = newURL || this.client.getCurrentUrl();
        this.client.get(this.URL);
        
    }
    getClient() {
        return this.client;
    }
    back() {
        this.client.navigate().back();
    }
    forward() {
        this.client.navigate().forward();
    }
    refresh() {
        this.client.navigate().refresh();
    }
    sendKey(object, key, seconds = 100000) {
        this.client.wait(until.elementLocated(object), seconds).sendKeys(key);
    }
    find(object, seconds = 100000) {
        return this.client.wait(until.elementLocated(object), seconds);
    }
    click(object, seconds = 100000) {
        this.client.wait(until.elementLocated(object), seconds).click();
    }
}
module.exports = Server;