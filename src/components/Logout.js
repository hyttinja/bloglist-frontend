const Logout = ({ user,handleLogout }) => (
  <div>
    <h2>blogs</h2>
    <p>{user.username} is logged in<button onClick={handleLogout}>Log out</button></p>
  </div>
)
export default Logout