const loginWeb = {
  loginPage: function (error) {
    return `
            <!doctype html>
            <html>
              <head>
                <title>Login</title>
                <link rel="stylesheet" href="/css/login.css" />
              </head>
              <body>
                <div class="login__page">
                  <h1>Words Store System</h1>
                  <p class="login__status">${error}</p>
                  <form action="/login", method="POST">
                      <label>Username: 
                      <input type="text" name="username">
                      </label>
                      <br>
                      <button type="submit" class="loginbtn">Login</button>    
                  </form>
                </div>
              </body>
            </html>
        `;
  },
};

module.exports = loginWeb;
