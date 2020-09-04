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
const authorize = async () => {
    let login = $('#login-input').val();
    let password = $('#password-input').val();
    result = await user.auth(login, password);
    console.log(result);
}
//TODO: добавить связь с инстой
