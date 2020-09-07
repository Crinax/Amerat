const Server = require("./server");

SERVER = new Server();

class User {
    constructor() {
        this.driver;
    }
    init() {
        var error = false;
        SERVER.init().then((result) => {
            this.driver = SERVER.client;
        }).catch(() => {
            error = true;
        });
        return !error;
    }
    auth(login, password) {
        SERVER.sendKey({name: 'username'}, login);
        SERVER.sendKey({name: 'password'}, password);
        SERVER.click({css: 'button[disabled]'});
        SERVER.find({css: 'p#slfErrorAlert'}).getText().then(result => {
            state.setErrorState('The username or password you entered is incorrect!');
            SERVER.refresh();
        });
        SERVER.click({css: 'img[data-testid="user-avatar"]'});
        SERVER.click({className: '_7UhW9   xLCgt      MMzan  KV-D4              fDxYl     '});
        SERVER.find({className: '_7UhW9       fKFbl yUEEX   KV-D4              fDxYl     '}).then(() => {
            state.setSuccessState('Authorization completed!');
        }).catch(() => {});
        state.setWaitingState('Authorization...');
        
    }
    async toProfile() {
        await SERVER.click({css: 'img[data-testid="user-avatar"]'});
        await SERVER.click({className: '_7UhW9   xLCgt      MMzan  KV-D4              fDxYl     '});
    }
    async getProfileImage() {
        return await SERVER.find({className: '_6q-tv'}).getAttribute('src');
    }
    async getFollowing() {
        var elems;
        await SERVER.find({className: 'g47SY '}, 10000, true).then(result => {
            elems = result
        });
        return await elems[1].getText();
    }
    async getFollowers() {
        var elems;
        await SERVER.find({className: 'g47SY '}, 10000, true).then(result => {
            elems = result;
        });
        return await elems[2].getText();
    }
    done() {
        SERVER.destructor();
    }
}
module.exports = User;