var loader = new Loader();
var state = new State();
var profile = new Profile();

state.setConnecting();
state.prevState(state.state());
const checkState = () => {
    if (state.state() != state.prevState()) {
        $(`.message`).attr('class', `message ${state.state().split(':')[0].toLowerCase()}`);
        $('.message').text(state.state());
        state.prevState(state.state());
    }
}
var chS = setTimeout(asd = () => {
    checkState();
    chs = setTimeout(asd, 10);
}, 10);
function uniq(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
         var item = a[i];
         if(seen[item] !== 1) {
               seen[item] = 1;
               out[j++] = item;
         }
    }
    return out;
}

var loginWindow = new ModalWindow();
loginWindow.setContent(`
    <header class="modal-header">Log in</header>
    <main class="modal-main">
        <div class="form-fields">
            <p id="login-text">Login, e-mail or phone number</p>
            <div class="input-container">
                <input type="text" id="login-input" placeholder="Login, e-mail or phone number" disabled/>
            </div>
            <p id="pass-text">Password</p>
            <div class="input-container">
                <input type="password" id="password-input" placeholder="Password" minlength="6" disabled />
            </div>
        </div>
        <div class="form-buttons">
            <button class="form-submit" onclick="">Log in</button>
        </div>
    </main>
`);
loginWindow.setSize(400, 300);
loginWindow.createWindow();

var result;
var user = new User();
user.init();
var dw = setTimeout(dwf = () => {
    if ($('.success').length > 0) {
        $('#login-input').removeAttr('disabled');
        $('#login-input').focus();
        $('#password-input').removeAttr('disabled');
        $('.form-submit').attr('onclick', 'authorize();');
        clearTimeout(dw);
    }
    else {
        dw = setTimeout(dwf, 10);
    }
}, 10);
const authorize = () => {
    inputError = $('.input-error');
    if (inputError.length != 0) {
        inputError.remove();
    }
    let login = $('#login-input').val();
    let password = $('#password-input').val();
    user.auth(login, password);
    dw = setTimeout(dwf = () => {
        if ($('.success').length > 0) {
            loginWindow.destroyWindow();
            clearTimeout(dw);
        }
        else {
            dw = setTimeout(dwf, 10);
        }
    }, 10);
}