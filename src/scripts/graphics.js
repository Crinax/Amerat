const { remote } = require('electron');

class Graphics {
    constructor() {
        this.sidebar = true;
    }
    toggleSidebar() {
        if (this.sidebar) {
            $('#left-sidebar').css({
              'width': '0%'
            });
            $('#right-sidebar').css({
                'width': '100%',
            });
            setTimeout(function() {
                $('#right-sidebar').css({
                    'border-color': 'rgba(0, 0, 0, 0)'
                });
            }, 300);
        }
        else {
            $('#right-sidebar').css({
                'border-color': 'rgb(255, 255, 255)'
            });
            $('#left-sidebar').css({
                'width': '35%'
            });
            $('#right-sidebar').css({
                'width': '65%'
            });
        }
        this.sidebar = !this.sidebar;
    }
    closeWin() {
        remote.getCurrentWindow().close();
    }
    minWin() {
        remote.getCurrentWindow().minimize();
    }
}
module.exports.AppWindow = new Graphics();