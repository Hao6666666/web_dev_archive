function Logout({ onLogout }) {
  return (
    <button onClick={onLogout} className="logout-btn">
      Logout
    </button>
  );
}

export default Logout;
