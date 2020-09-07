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
        this.setProfileImage();
        this.setFollowing();
        this.setFollowers();
    }
    showStatistic() {
        this.loadStatistic().then(() => {
            setTimeout(() => {
                this.setContent(`
                    <div class="stats-wrapper">
                        <header class="stats-header">
                            <div class="wrapper-profile-image">
                                <img class="profile-image" src="${this.avatarURL}" alt="avatar" />
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
                                    <h3 class="likes-text">Likes: ${this.likes}</h3>
                                </div>
                                <div class="field comments">
                                    <h3 class="comments-text">Comments: ${this.comments}</h3>
                                </div>
                            </div>
                        </main>
                    </div>
                `);
            }, 250);
        });
    }
}
module.exports = Profile;