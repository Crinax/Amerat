var loginWindow = new ModalWindow();
loginWindow.setContent(`
    <header class="modal-header">Log in</header>
    <main class="modal-main">
        <div class="form-fields">
            <p id="login-text">Login, e-mail or phone number</p>
            <div class="input-container">
                <input type="text" id="login-input" placeholder="Login, e-mail or phone num" />
            </div>
            <p id="pass-text">Password</p>
            <div class="input-container">
                <input type="password" id="password-input" placeholder="Password" />
            </div>
        </div>
        <div class="form-buttons">
            <button class="form-submit" onclick="authorize();">Log in</button>
        </div>
    </main>
`);
loginWindow.setSize(400, 300);
loginWindow.createWindow();

var result;
var user = new User();
user.init();
const authorize = () => {
    inputError = $('.input-error');
    if (inputError.length != 0) {
        inputError.remove();
    }
    let login = $('#login-input').val();
    let password = $('#password-input').val();
    user.auth(login, password).then((result) => {
        if (result != 'Error') {
            console.log(result);
            loginWindow.destroyWindow();
        }
        else {
            $('.modal-main').prepend('<div class="input-error">Неверное имя пользователя или пароль</div>');
        }
    });

}
//TODO: добавить связь с инстой
