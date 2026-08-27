function Header({ title, user }) {

  return (
    <header>

      <div>
        <h2>{title}</h2>
        <p>Welcome, {user.name}</p>
      </div>

    </header>
  );
}

export default Header;