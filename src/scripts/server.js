class Server {
    constructor() {
        this.client;
        this.URL;
        this.activeHandle;
        this.handles = [];
    }
    destructor() {
        this.client.quit();
    }
    async init() {
        var _options = new chrome.Options();
        _options.headless();
        this.client = new webdriver.Builder()
            .setChromeOptions(_options)
            .withCapabilities('chrome')
            .forBrowser('chrome')
            .build();
        this.URL = 'https://instagram.com';
        return await this.changeURL(this.URL);
    }
    async changeURL(newURL, stat = true) {
        this.URL = newURL || this.client.getCurrentUrl();
        this.client.get(this.URL).then(() => {
            this.client.getWindowHandle().then(result => {
                this.activeHandle = result;
                this.handles.push(result);
            });
            if (stat) {
                state.setSuccessState(`Successfully connected to ${this.URL}!`);
            }
        }).catch(() => {
            state.setConnectionError();
        });
    }
    getClient() {
        return this.client;
    }
    async getWindowHandle() {
        return await this.client.getWindowHandle();
    }
    async closeTab() {
        await this.client.close();
        this.handles.pop();
        this.activeHandle = this.handles[this.handles.length - 1];
    }
    back() {
        this.client.navigate().back();
    }
    async newTab(url, stat = false) {
        await this.client.switchTo().newWindow('tab');
        return await this.changeURL(url, stat);
    }
    forward() {
        this.client.navigate().forward();
    }
    async to(url, stat = false) {
        try {
            await this.changeURL(url, stat);
        }
        catch (err) {
            state.setConnectionError();
        }
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
    async scroll(x, y, object = 'window') {
        return await this.client.executeScript(`${object}.scrollTo(${x}, ${y});`);
    }
    async asyncFind(object, seconds = 100000, all = false) {
        return all ? this.client.wait(until.elementsLocated(object), seconds) : this.client.wait(until.elementLocated(object), seconds);
    }
}
module.exports = Server;
/*
var elements = [];
while (true) {
    let i = 20;
    elements.push(SERVER.find({className: 'Nnq7C weEfm'}, 10000, true));
    SERVER.clent.executeScript(`window.scrollTo(0, ${i});`);
    i += 20;
}
function scrolling(per) {
    var elements = [];
    var elemsq, elemsqpast;
    while (true) {
        let i = per;
        SERVER.find({className: 'Nnq7C weEfm'}, 10000, true).then(result => {
            elements.push(result);
        });
        elemsq = Array.from(new Set(elements)).length;
        if (elemsq == elemsqpast) {
            break;
        }
        elemsqpast = elemsq
        SERVER.client.executeScript(`window.scrollTo(0, ${i});`);
        i += per;
    }
    return elements;
}
*/