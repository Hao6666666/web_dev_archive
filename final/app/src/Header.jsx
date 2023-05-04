import Logout from "./Logout";
function Header({ onLogout }) {
  return (
    <div className="header">
      <h1>MyBlog</h1>
      <Logout onLogout={onLogout} />
    </div>
  );
}

export default Header;
