class Server {
    constructor() {
        var _phantomjs = webdriver.Capabilities.phantomjs();
        _phantomjs.set("phantomjs.binary.path", require('phantomjs-prebuilt').path);
        this.driver = new webdriver.Builder()
          .withCapabilities(_phantomjs)
          .build();
        this.URL = 'https://www.instagram.com/';
        this.isLoaded = false;
        this.changeURL();
    }
    getDriver() {
        return this.driver;
    }
    changeURL(newURL = 'https://www.instagram.com/') {
        this.URL = newURL;
        this.isLoaded = false;
        this.driver.get(this.URL).then(() => {
            this.isLoaded = true;
        });
    }
    
    sendKey(xpath, key) {
        
    }
}
module.exports = Server;