const { AppWindow } = require("./graphics");
const ModalWindow = require("./modal");
const Server = require("./server");

class Profile {
    constructor() {
        this.avatarURL = '';
        this.following = 0;
        this.followers = 0;
        this.posts = 0;
        this.totalLikes = 0;
        this.totalComments = 0;
        this.nickname = '';
        this.postsArr = [];
        this.imageModal = new ModalWindow();
        this.imageModal.setClasses('modal-fog', 'image-window', 'image-content');
        this.imageModal.setSize(450, 450);
        this.statsUpdated = false;
        this.statsTimer = false;
        this.nextSort = 'likes';
    }
    async timer() {
        this.statsTimer = true;
        var c = 0;
        var p = new Promise(function ads(resolve, reject) {
            setTimeout(() => {
                this.statsUpdated = false;
                p = new Promise(ads);
            }, 600000);
        });
    }
    async setProfileImage() {
        state.setWaitingState('Loading profile image...');
        try {
            this.avatarURL = await user.getProfileImage();
        }
        catch (err) {
            state.setConnectionError();
        }
    }
    async setFollowing() {
        state.setWaitingState('Loading following...');
        try {
            this.following = +(await user.getFollowing());
        }
        catch (err) {
            state.setConnectionError();
        }
    }
    async setFollowers() {
        state.setWaitingState('Loading followers...');
        try {
            this.followers = +(await user.getFollowers());
        }
        catch (err) {
            state.setConnectionError();
        }
    }
    async setPostsCount() {
        state.setWaitingState('Loading posts quantity...');
        try {
            this.posts = +(await user.getPostsCount());
        }
        catch (err) {
            state.setConnectionError();
        }
    }
    async setPosts(quantity) {
        state.setWaitingState('Loading posts...');
        this.postsArr = [];
        if (!AppWindow.allIsBlocked) { AppWindow.changeBlockAll(); }
        try {
            this.postsArr = await user.getPosts(quantity);
        }
        catch (err) {
            state.setConnectionError();
            console.log(err);
        }
        if (AppWindow.allIsBlocked) { AppWindow.changeBlockAll(); }
    }
    async getTotalLikes() {
        if (typeof this.posts == 'string') {
            return this.posts;
        }
        var likes = 0;
        for (let i = 0; i < this.postsArr.length; i++) {
            state.setWaitingState(`Loading likes (posts checked ${i+1}/${this.posts})...`);
            likes += this.postsArr[i].likes;
        }
        return likes;
    }
    async getTotalComments() {
        if (typeof this.posts == 'string') {
            return this.posts;
        }
        var comments = 0;
        for (let i = 0; i < this.postsArr.length; i++) {
            state.setWaitingState(`Loading comments (posts checked ${i+1}/${this.posts})...`);
            comments += this.postsArr[i].comments;
        }
        return comments;
    }
    setContent(content) {
        $('#right-sidebar').empty();
        $('#right-sidebar').append(content);
    }
    async loadStatistic() {
        if(!this.statsUpdated) {
            AppWindow.changeBlockAll();
            this.statsUpdated = !this.statsUpdated;
            if (!this.statsTimer) { this.timer(); }
            $('body').addClass('progress');
            await user.toProfile();
            await this.setProfileImage();
            await this.setFollowing();
            await this.setFollowers();
            await this.setPostsCount();
            await this.setPosts(5);
            if (!AppWindow.allIsBlocked) { AppWindow.changeBlockAll(); }
            if (this.posts == this.postsArr.length) {
                this.totalLikes = await this.getTotalLikes();
                this.totalComments = await this.getTotalComments();
            }
            $('body').removeClass('progress');
            AppWindow.changeBlockAll();
        }
    }
    addToContent(selector, content) {
        $(selector).append(content);
    }
    refreshContent(selector, content) {
        $(selector).remove();
        this.addToContent('.posts-list', content);
    }
    sortByLikes(posts) {
        if (!Array.isArray(posts)) {
            state.setErrorState(`Argument isn't array. Please send this on icfewnin@gmail.com. Error code: sBL@113`);
            throw 'Argument condition error';
        }
        posts.sort((a, b) => {
            if (a.likes > b.likes) { return -1; }
            if (a.likes < b.likes) { return 1; }
            if (a.likes = b.likes) {
                if (a.comments > b.comments) { return -1; }
                if (a.comments < b.comments) { return 1; }
                return 0;
            }
        });
        return posts;
    }
    sortByComments(posts) {
        if (!Array.isArray(posts)) {
            state.setErrorState(`Argument isn't array. Please send this on icfewnin@gmail.com. Error code: sBL@113`);
            throw 'Argument condition error';
        }
        posts.sort((a, b) => {
            if (a.comments > b.comments) { return -1; }
            if (a.comments < b.comments) { return 1; }
            if (a.comments = b.comments) {
                if (a.likes > b.likes) { return -1; }
                if (a.likes < b.likes) { return 1; }
                return 0;
            }
        });
        return posts;
    }
    sortByTime(posts) {
        if (!Array.isArray(posts)) {
            state.setErrorState(`Argument isn't array. Please send this on icfewnin@gmail.com. Error code: sBL@113`);
            throw 'Argument condition error';
        }
        posts.sort((a, b) => {
            if (a.index > b.index) { return 1; }
            if (a.index < b.index) { return -1; }
            if (a.index = b.index) { return 0; }
        });
        return posts;
    }
    changeSort(typeSort) {
        switch (typeSort.toLowerCase()) {
            case 'likes':
                $('.posts-list').remove();
                this.nextSort = 'comments';
                $('.main-stats-change-sort').text('by likes');
                this.addPostsList(this.sortByLikes(this.postsArr));
                break;
            case 'comments':
                $('.posts-list').remove();
                this.nextSort = 'time';
                $('.main-stats-change-sort').text('by comments');
                this.addPostsList(this.sortByComments(this.postsArr));
                break;
            case 'time':
                $('.posts-list').remove();
                this.nextSort = 'likes';
                $('.main-stats-change-sort').text('by time');
                this.addPostsList(this.sortByTime(this.postsArr));
                break;
        }
    }
    addPostsList(posts) {
        this.addToContent('.stats-main', `
            <div class="posts-list">
                <div class="best-post-wrapper">
                    <div class="best-post-header">
                        <h3 class="best-post-header-text">Top #1</h3>
                    </div>
                    <div class="best-post-border">
                        <div class="best-post">
                            <div class="best-post-image-wrapper">
                                <img class="best-post-image" src="${posts[0].IMAGE_SOURCE}" onclick="user.profile.maxImage(this);" />
                            </div>
                            <div class="best-post-stat">
                                <span class="best-post-likes">
                                    Likes: 
                                    <span class="best-post-likes-value">${posts[0].likes}</span>
                                </span>
                                <span class="best-post-comments">
                                    Comments: 
                                    <span class="best-post-comments-value">${posts[0].comments}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="default-posts"></div>
                <div class="button-show-all">
                    <button class="button-show-all-text" onclick="user.profile.showAll(true, 0);">
                        <div class="arrow">»</div>
                        <span id="button-show-text">Show all</span>
                        <div class="arrow">»</div>
                    </button>
                </div>
            </div>
        `);
        for (let i = 2; i <= posts.length; i++) {
            this.addToContent('.default-posts', `
                <div class="post">
                    <div class="post-header">
                        <h3 class="post-header-text">#${i}</h3>
                    </div>
                    <div class="post-body">
                        <div class="post-image-wrapper">
                            <img class="post-image" src="${posts[i-1].IMAGE_SOURCE}" onclick="user.profile.maxImage(this);"/>
                        </div>
                        <div class="post-stat">
                            <span class="post-likes">
                                Likes:
                                <span class="post-likes-value">${posts[i-1].likes}</span>
                            </span>
                            <span class="post-comments">
                                Comments:
                                <span class="post-comments-value">${posts[i-1].comments}</span>
                            </span>
                        </div>
                    </div>
                </div>
            `);
        }
    }
    async showStatistic() {
        loader.showLoader();
        await this.loadStatistic().then(() => {
            state.setLoadedSuccess();
            this.setContent(`
                <div class="stats-wrapper">
                    <header class="stats-header">
                        <div class="wrapper-profile-image">
                            <img class="profile-image" src="${this.avatarURL}" alt="avatar" onclick="user.profile.maxImage(this);" />
                        </div>
                    </header>
                    <main class="stats-main">
                        <div class="main-stats-header">
                            <h2 class="main-stats-header-text">Your statistic</h2>
                        </div>
                        <div class="statistic">
                            <div class="field following">
                                <h3 class="following-text">Following: ${this.following}</h3>
                            </div>
                            <div class="field followers">
                                <h3 class="followers-text">Followers: ${this.followers}</h3>
                            </div>
                            <div class="field posts">
                                <h3 class="posts-text">Posts: ${this.posts}</h3>
                            </div>
                            <div class="field likes">
                                <h3 class="likes-text">Total likes: ${this.totalLikes}</h3>
                            </div>
                            <div class="field comments">
                                <h3 class="comments-text">Total comments: ${this.totalComments}</h3>
                            </div>
                        </div>
                        <div class="main-stats-header">
                            <h2 class="main-stats-header-text">Top posts <button onclick="user.profile.changeSort(user.profile.nextSort)" class="main-stats-change-sort" title="Click to change">by time</button></h2>
                        </div>
                    </main>
                </div>
            `);
            this.addPostsList(this.postsArr);
        });
    }
    async showAll(param, id) {
        if (param) {
            $('body').addClass('progress');
            if (this.postsArr.length != this.posts) {
                await this.setPosts(this.posts);
                await this.showStatistic();
            }
            $('body').removeClass('progress');
            $('.arrow').css({
                'transform': 'rotate(-90deg)'
            });
            $('#button-show-text').text('Hide');
            $('.default-posts').css({
                'max-height': `calc((56px + 20px)*${this.posts})`
            });
        }
        else {
            $('.arrow').css({
                'transform': 'rotate(90deg)'
            });
            $('#button-show-text').text('Show all');
            $('.default-posts').css({
                'max-height': `calc((56px)*5)`
            });
        }
        $('.button-show-all-text').attr('onclick', `user.profile.showAll(${!param}, ${id});`);
    }
    maxImage(el) {
        this.imageModal.setContent(`
            <img class="maximize-image" draggable="false" src="${el.src}" alt="${el.src}" onclcik="user.profile.imageModal.destroyWindow();" />
        `);
        this.imageModal.createWindow();
        setTimeout(() => {
            $('.modal-fog').on('click', () => { this.imageModal.destroyWindow(); });
        }, 300)
    }
}
/*

*/
module.exports = Profile;