const Server = require("./server");

class Post {
    constructor(url, imgSrc, likes, comments, index) {
        this.URL = url;
        this.IMAGE_SOURCE = imgSrc;
        this.likes = likes;
        this.comments = comments;
        this.index = index;
    }
    async open(newTab = false) {
        if (newTab) {
            try {
                await user.newTab(this.URL, false);
            }
            catch {
                state.setConnectionError();
            }
        }
        else {
            try {
                await user.to(this.URL, false);
            }
            catch {
                state.setConnectionError();
            }
        }
    }
}
module.exports = Post;