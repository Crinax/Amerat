class ModalWindow {
    constructor(r) {
        this.content = '';
        this.width = 'auto';
        this.height = 'auto';
        this.classes = [
            'modal-fog',
            'modal-window',
            'modal-content'
        ]; //fog-style, window-style, content-style
        this.r = r; //random number for multiple windows
    }
    setContent(content = '') {
        this.content = content;
    }
    setSize(width = 'auto', height = 'auto') {
        this.width = width <= 800 ? width : 'auto' || 'auto';
        this.height = height <= 600 ? height : 'auto' || 'auto';
    }
    setClasses(...classes) {
        for (let i = 0; i < classes.length; i++) {
            this.classes[i] = classes[i];
        }
    }
    changeContent(content) {
        $(`.${this.classes[2]}.r-${this.r}`)
            .empty()
            .append(content);
    }
    createWindow() {
        this.r = this.r || Math.random().toString(36).slice(2);
        $('body').append(`
            <div class="${this.classes[0]} r-${this.r}"></div>
        `);
        for (let i = 1; i < this.classes.length; i++) {
            $(`.${this.classes[i-1]}.r-${this.r}`).append(`
                <div class="${this.classes[i]} r-${this.r}"></div>
            `)
        }
        $(`.${this.classes[0]}.r-${this.r}`).animate({
            'opacity': '1'
        }, 300);
        $(`.${this.classes[1]}.r-${this.r}`).animate({
            'width': this.width,
            'height': this.height
        }, 300);
        this.changeContent(this.content);
    }
    destroyWindow() {
        $(`.${this.classes[0]}.r-${this.r}`).animate({
            'opacity': '0'
        }, 300);
        $(`.${this.classes[1]}.r-${this.r}`).animate({
            'width': '0px',
            'height': '0px'
        }, 300);
        setTimeout(() => {
            $(`.${this.classes[0]}.r-${this.r}`).remove();
            this.r = Math.random().toString(36).slice(2);
        }, 300);
        
    }
    getR() {
        return this.r;
    }
}
module.exports = ModalWindow;