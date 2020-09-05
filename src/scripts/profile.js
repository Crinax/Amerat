const Server = require("./server");

class Profile {
    constructor() {
        this.avatarURL;
    }
    getProfileImage() {
        SERVER.find({className: '_6q-tv'}).getAttribute('src').then(result => {
            this.avatarURL = result;
        }).catch(() => {
            state = 'Error: Check your internet connection!';
        });
    }
    showStatistic() {
        this.getProfileImage();
    }
}
module.exports = Profile;