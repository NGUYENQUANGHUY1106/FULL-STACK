function Account() {
  return (
    <div>
      <p>Trang Account</p>

      <label>Username: </label>
      <input type="text" id="username" name="username" />

      <label>Email: </label>
      <input type="email" id="email" name="email" />

      <label>Phone: </label>
      <input type="text" id="phone" name="phone" />

      <label>Address: </label>
      <input type="text" id="address" name="address" />

      <button>Update</button>
    </div>
  );
}
export default Account;
