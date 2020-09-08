class Loader {
    constructor() {}
    showLoader() {
        $('#right-sidebar').empty();
        $('#right-sidebar').append(`
            <div class="loader-wrapper">
                <div class="loader-image">
                    <div class="loader">
                        <div class="loader-into"></div>
                    </div>
                </div>
            </div>
        `);
    }
    hideLoader() {
        $('#right-sidebar').empty();
    }
}
module.exports = Loader;