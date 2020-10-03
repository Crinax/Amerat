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
        // var _options = new chrome.Options();
        // _options.headless();
        this.client = new webdriver.Builder()
            // .setChromeOptions(_options)
            // .withCapabilities('chrome')
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
function searchElements() {
    var a = []
    a.push(...document.querySelectorAll('.v1Nh3.kIKUG._bz0w.mtz-vlc-cgmpmfilbdlmohglaobhngamnglfkgeb > a'));
    a = Array.prototype.slice.call(a);
    var list = [];
    var likes = [];
    var x = 0;
    var y = 0;
    var comments = [];
    window.scroll(x, y);
    for (let i = 0; i < a.length; i++) {
        if (i == a.length - 2) {
            y += 2500;
            window.scroll(x, y);
            a.push(...document.querySelectorAll('.v1Nh3.kIKUG._bz0w.mtz-vlc-cgmpmfilbdlmohglaobhngamnglfkgeb > a'));
            a = Array.from(new Set(a));
        }
        try { a[i].dispatchEvent(new Event('focus')); }
        catch (err) {
            console.error(err);
            return {list: a, index: i, error: err};
        }
        console.log({list: a, index: i});
        list.push(a[i].getAttribute('href'));
        comments.push(document.querySelector('.Ln-UN > .-V_eO:last-child > span:first-child').textContent);
        likes.push(document.querySelector('.Ln-UN > .-V_eO:first-child > span:first-child').textContent);
        a[i].dispatchEvent(new Event('blur'));
    }
    return {
        array: a,
        links: list,
        likes: likes,
        comments: comments
    }
}
*/