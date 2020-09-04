const Server = require("./server");

SERVER = new Server();
SERVER.init();

class User {
    constructor() {
        this.driver;
    }
    init() {
        this.driver = SERVER.client;
    }
    async auth(login, password) {
        await SERVER.sendKey({name: 'username'}, login);
        await SERVER.sendKey({name: 'password'}, password);
        await SERVER.click({css: 'button[disabled]'});
        await SERVER.click({css: 'img[data-testid="user-avatar"]'});
        await SERVER.click({className: '_7UhW9   xLCgt      MMzan  KV-D4              fDxYl     '});
        return await SERVER.getClient().getTitle();
        
    }
    done() {
        SERVER.destructor();
    }
}
module.exports = User;