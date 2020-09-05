class Server {
    constructor() {
        this.client;
        this.URL;
    }
    destructor() {
        this.client.quit();
    }
    async init() {
        // var _options = new firefox.Options();
        // _options.headless();
        this.client = new webdriver.Builder()
            // .setFirefoxOptions(_options)
            // .withCapabilities('firefox')
            .forBrowser('chrome')
            .build();
        this.URL = 'https://instagram.com';
        return await this.changeURL(this.URL);
    }
    async changeURL(newURL) {
        this.URL = newURL || this.client.getCurrentUrl();
        this.client.get(this.URL).then(() => {
            state = `Success: Successfully connected to ${this.URL}!`;
        }).catch(() => {
            state = 'Error: Check your internet connection!';
        });
        
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
        this.client.navigate().refresh().catch(() => {
            state = 'Error: Check your internet connection!'
        });
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