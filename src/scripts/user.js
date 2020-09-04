const Server = require("./server");

var SERVER = new Server();
SERVER.__init__();
class User {
    constructor() {
        this.driver = SERVER.client;
    }
    async checkIsLoginPage() {
        var login = await SERVER.checkExist({name: 'login'});
        var pass = await SERVER.checkExist({name: 'password'});
        if (login.size > 0 && pass.size > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    async auth(login, password) {
        var loginBut = await SERVER.find({css: 'button[disabled]'});
        await SERVER.sendKey({name: 'login'}, login);
        await SERVER.sendKey({name: 'password'}, password);
        await loginBut.click();
        var title = await SERVER.getDriver().getTitle();
        return await title;
    }
}
module.exports = User;