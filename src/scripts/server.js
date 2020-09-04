class Server {
    constructor() {
        
    }
    async __init__() {
        var _option = new firefox.Options();
        _option.headless();
        this.client = await new webdriver.Builder()
          .withCapabilities('firefox')
          .setFirefoxOptions(_option)
          .forBrowser('firefox')
          .build();
        this.URL = 'https://www.instagram.com/';
        await this.changeURL();
    }
    async getDriver() {
        return await this.client;
    }
    async changeURL(newURL = 'https://www.instagram.com/') {
        this.URL = newURL;
        await this.client.get(this.URL);
    }
    async getURL() {
        return await this.client.getCurrentUrl();
    }
    async back() {
        await this.client.navigate().back();
    }
    async forward() {
        await this.client.navigate().forward();
    }
    async refresh() {
        await this.client.navigate().refresh();
    }
    async sendKey(object, key) {
        await this.client.findElement(object).sendKeys(key);
    }
    async checkExist(object) {
        return await typeof this.client.findElement(object) == 'object';
    }
    async find(object) {
        return await this.client.findElement(object);
    }
    async click(object) {
        await this.client.findElement(object).click();
    }
    destructor() {
        this.client.quit();
    }
}
module.exports = Server;