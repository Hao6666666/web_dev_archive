const page = {
  loginPage(response) {
    const LoaderEL = document.querySelector(".loader");
    LoaderEL.innerHTML = "";

    const loginEL = document.querySelector(".login-page");
    if (response !== undefined) {
      loginEL.innerHTML = "";
    } else {
      loginEL.innerHTML = `
      <h1>Chat Room</h1>
      <form action="">
          <label>Username: 
              <input type="text" name="username" class="user-input">
          </label>
          <button type="submit" class="login-btn">Login</button>    
      </form>
        `;
    }
  },

  userStatus(response) {
    const currentUserEL = document.querySelector(".login-status");
    if (response) {
      currentUserEL.innerHTML = page.getCurrentUsers(response);
      const chatList = document.querySelector(".messages");
      chatList.scrollTop = chatList.scrollHeight;
    } else {
      currentUserEL.innerHTML = "";
    }
  },

  chatPage(response) {
    const errorEL = document.querySelector(".error-messages");
    errorEL.innerHTML = ":-)";

    const chatPage = document.querySelector(".chat-page");

    if (response !== undefined) {
      chatPage.innerHTML = page.getMessageList(response.storedChat);
    } else {
      chatPage.innerHTML = "";
    }
  },

  chatButton(response) {
    const LoaderEL = document.querySelector(".loader");
    LoaderEL.innerHTML = "";

    const chatButton = document.querySelector(".chat-button");
    if (response !== undefined) {
      chatButton.innerHTML = `
        <h3>Send Message</h3>
        <form action="" class="text-form">
            <label>
                <input type="text" class="text-input" name=${response.username} placeholder="Hi ${response.username}, Enter your message"></input>
            </label>
            <button class='text-btn' type="submit" >Submit</button>
            <button class='logout-btn' type="submit">Logout</button>
        </form>
       `;
    } else {
      chatButton.innerHTML = "";
    }
  },

  getMessageList(content) {
    return (
      `<h3>Chat History</h3><ol class="messages">` +
      content
        .map(
          (chat) => `
              <li>
                <div class="message">
                  <div class="sender-info">
                    <span class="username">${chat.username}</span>
                  </div>
                  <p class="message-text">${chat.text}</p>
                </div>
              </li>
        `
        )
        .join("") +
      `</ol>`
    );
  },

  getCurrentUsers(content) {
    return (
      `<a>Online Users:</a><ul class="current-user">` +
      Object.keys(content)
        .map(
          (user) => `
              <li>${user}</li>
        `
        )
        .join("") +
      `</ul>`
    );
  },

  render(response) {
    page.loginPage(response);
    page.chatButton(response);
  },
};

module.exports = page;
