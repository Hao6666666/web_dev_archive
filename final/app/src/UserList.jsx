const UserList = ({ userList }) => {
  return (
    <div className="user-list">
      <p className="online">Online Users:</p>
      {Object.keys(userList).map((username) => (
        <li className="user-item" key={username}>
          {username}
        </li>
      ))}
    </div>
  );
};

export default UserList;
