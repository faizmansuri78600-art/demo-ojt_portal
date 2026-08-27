import { NavLink } from "react-router-dom";
import roleConfig from "../../config/roleConfig";

function Sidebar({ role }) {

  const config = roleConfig[role];

  return (
    <aside>

      <h2>
        {config.title}
      </h2>

      <nav>

        {config.menuItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
          >
            {item.name}
          </NavLink>

        ))}

      </nav>

    </aside>
  );
}

export default Sidebar;