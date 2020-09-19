const Server = require("./server");

SERVER = new Server();

class User {
    constructor() {
        this.driver;
        this.profile = new Profile();
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
    async auth(login, password) {
        SERVER.sendKey({name: 'username'}, login);
        SERVER.sendKey({name: 'password'}, password);
        SERVER.click({css: 'button[disabled]'});
        SERVER.find({css: 'p#slfErrorAlert'}).getText().then(result => {
            state.setErrorState('The username or password you entered is incorrect!');
            SERVER.refresh();
        }).catch(() => {
            
        });
        SERVER.click({css: 'img[data-testid="user-avatar"]'});
        SERVER.click({css: '._7UhW9.xLCgt.MMzan.KV-D4.fDxYl'});
        SERVER.find({css: '._7UhW9.fKFbl.yUEEX.KV-D4.fDxYl'}).then(() => {
            state.setSuccessState('Authorization completed!');
        }).catch(() => {});
        state.setWaitingState('Authorization...');
        
    }
    async toProfile() {
        await SERVER.click({css: '.Fifk5 > ._2dbep.qNELH'});
        await SERVER.click({css: '._7UhW9.xLCgt.MMzan.KV-D4.fDxYl'});
    }
    async getProfileImage() {
        this.profile.avatarURL = await SERVER.find({css: '.Fifk5 > ._2dbep.qNELH > ._6q-tv'}).getAttribute('src');
        return await this.profile.avatarURL;
    }
    async getFollowing() {
        this.profile.following = await SERVER.asyncFind({css: '.g47SY'}, 10000, true);
        return await this.profile.following[2].getText();
    }
    async getFollowers() {
        this.profile.followers = await SERVER.asyncFind({css: '.g47SY'}, 10000, true);
        return await this.profile.followers[1].getText();
    }
    async getPostsCount() {
        this.profile.posts = await SERVER.asyncFind({css: '.g47SY'});
        return await this.profile.posts.getText();
    }
    async newTab(url, stat = false) {
        return await SERVER.newTab(url, stat);
    }
    async to(url, stat = false) {
        return await SERVER.to(url, stat);
    }
    async getPosts() {
        var links = [];
        var images = [];
        var likes = [];
        var comments = [];
        var x = 0;
        var y = 0;
        await this.toProfile();
        await SERVER.scroll(x, y);
        if (this.profile.posts == 0) {
            await this.profile.setPosts();
        }
        if (this.profile.posts == 0) {
            return `You haven't posts!`;
        }
        while (links.length < this.profile.posts) {
            let a = await SERVER.asyncFind({css: '.v1Nh3.kIKUG._bz0w > a'}, 10000, true);
            var j  = 0;
            for (let i = 0; i != a.length; i++) {
                a[i] = await a[i].getAttribute('href');
            }
            links.push(...a);
            links = Array.from(new Set(links));
            let b = await SERVER.asyncFind({css: '.v1Nh3.kIKUG._bz0w > a > .eLAPa > .KL4Bh > img'}, 10000, true);
            for (let i = 0; i != b.length; i++) {
                b[i] = await b[i].getAttribute('src');
            }
            images.push(...b);
            images = Array.from(new Set(images));
            y += 1000;
            await SERVER.scroll(x, y);
        }
        await SERVER.scroll(0, 0);
        for (j; j != links.length; j++) {
            let elem = await SERVER.asyncFind({css: `.v1Nh3.kIKUG._bz0w > a[href*="${links[j].slice(26)}"]`});
            const actions = SERVER.client.actions({async: true});
            await actions.move({origin: elem}).perform();
            let textComm = await SERVER.asyncFind({css: '.Ln-UN > .-V_eO:last-child > span:first-child'});
            textComm = await textComm.getText();
            let check;
            await SERVER.asyncFind({css: '.Ln-UN > .-V_eO:first-child > span[class*="coreSpriteHeartSmall"]'}, 500).then(result => {
                check = result;
            }).catch(() => {});
            if (check != undefined) {
                var textLikes = await SERVER.asyncFind({css: '.Ln-UN > .-V_eO:first-child > span:first-child'});
            }
            else {
                await SERVER.click({css: '._1P1TY.coreSpritePlayIconSmall'});
                await SERVER.click({css: '.vcOH2'});
                var textLikes = await SERVER.asyncFind({css: '.vJRqr > span'});
                await SERVER.click({css: '.QhbhU'});
                await SERVER.click({css: '.Igw0E.IwRSH.eGOV_._4EzTm.BI4qX.qJPeX.fm1AK.TxciK.yiMZG'});
            }
            textLikes = await textLikes.getText();
            likes.push(+textLikes);
            comments.push(+textComm);
        }
        for (let i = 0; i != links.length; i++) {
            this.profile.postsArr.push(new Post(links[i], images[i], likes[i], comments[i]));
        }
        return await this.profile.postsArr;
    }
    done() {
        SERVER.destructor();
    }
}
module.exports = User;