import roleConfig from "../../config/roleConfig";

function Navbar({ role, user }) {

  const config = roleConfig[role];

  return (
    <header>

      <div>
        <h1>{config.title}</h1>
      </div>

      <div>
        <span>{user.name}</span>
        <span>{user.role}</span>
      </div>

    </header>
  );
}

export default Navbar;