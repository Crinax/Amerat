const Server = require("./server");

class Profile {
    constructor() {
        this.avatarURL = '';
        this.following = 0;
        this.followers = 0;
        this.posts = 0;
        this.likes = 0;
        this.comments = 0;
        this.nickname = '';
    }
    async setProfileImage() {
        state.setWaitingState('Loading profile image...');
        user.getProfileImage().then(result => {
            this.avatarURL = result;
            state.setLoadedSuccess();
        }).catch(state.setConnectionError());
    }
    async setFollowing() {
        state.setWaitingState('Loading following...');
        user.getFollowing().then(result => {
            this.following = result;
            state.setLoadedSuccess();
        }).catch(state.setConnectionError());
    }
    async setFollowers() {
        state.setWaitingState('Loading followers...');
        user.getFollowers().then(result => {
            this.followers = result;
            state.setLoadedSuccess();
        }).catch(state.setConnectionError());
    }
    setContent(content) {
        $('#right-sidebar').empty();
        $('#right-sidebar').append(content);
    }
    async loadStatistic() {
        await this.setProfileImage();
        await this.setFollowing();
        await this.setFollowers();
    }
    async showStatistic() {
        await this.loadStatistic().then(() => {
            this.setContent(`
                <div class="stats-wrapper">
                    <header class="stats-header">
                        <div class="wrapper-profile-image">
                            <img class="profile-image" src="${this.avatarURL}" alt="avatar" />
                        </div>
                    </header>
                    <main class="stats-main">
                        <article class="main-stats-header">
                            <h2 class="main-stats-header-text">Your statistic</h2>
                        </article>
                        <article class="following">
                            <h3 class="following-text">Following: ${this.following}</h3>
                        </article>
                        <article class="followers">
                            <h3 class="followers-text">Followers: ${this.followers}</h3>
                        </article>
                        <article class="posts">
                            <h3 class="posts-text">Posts: ${this.posts}</h3>
                        </article>
                        <article class="likes">
                            <h3 class="likes-text">Likes: ${this.likes}</h3>
                        </article>
                        <article class="comments">
                            <h3 class="comments-text">Comments: ${this.comments}</h3>
                        </article>
                    </main>
                </div>
            `);
        });
    }
}
module.exports = Profile;