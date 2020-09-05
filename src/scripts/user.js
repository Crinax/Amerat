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
            state = 'Error: The username or password you entered is incorrect!';
            SERVER.refresh();
        });
        SERVER.click({css: 'img[data-testid="user-avatar"]'});
        SERVER.click({className: '_7UhW9   xLCgt      MMzan  KV-D4              fDxYl     '});
        SERVER.find({className: '_7UhW9       fKFbl yUEEX   KV-D4              fDxYl     '}).then(() => {
            state = 'Success: Authorization completed!';
        });
        state = 'Waiting: Authorization...';
        
    }
    done() {
        SERVER.destructor();
    }
}
module.exports = User;