class Server {
    constructor() {
        this.client;
        this.URL;
    }
    destructor() {
        this.client.quit();
    }
    async init() {
        //var _options = new chrome.Options();
        //_options.headless();
        this.client = new webdriver.Builder()
            //.setFirefoxOptions(_options)
            //.withCapabilities('chrome')
            .forBrowser('chrome')
            .build();
        this.URL = 'https://instagram.com';
        return await this.changeURL(this.URL);
    }
    async changeURL(newURL) {
        this.URL = newURL || this.client.getCurrentUrl();
        this.client.get(this.URL).then(() => {
            state.setSuccessState(`Successfully connected to ${this.URL}!`);
        }).catch(() => {
            state.setConnectionError();
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
            state.setConnectionError();
        });
    }
    sendKey(object, key, seconds = 100000) {
        this.client.wait(until.elementLocated(object), seconds).sendKeys(key);
    }
    find(object, seconds = 100000, all = false) {
        return all ? this.client.wait(until.elementsLocated(object), seconds) : this.client.wait(until.elementLocated(object), seconds);
    }
    click(object, seconds = 100000) {
        this.client.wait(until.elementLocated(object), seconds).click();
    }
}
module.exports = Server;