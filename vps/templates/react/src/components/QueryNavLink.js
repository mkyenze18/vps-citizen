// TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#custom-behavior
import { useLocation, NavLink } from "react-router-dom";

function QueryNavLink({ to, ...props }) {
  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}

// ? useLocation
// {
//   pathname: "/invoices",
//   search: "?filter=sa",
//   hash: "",
//   state: null,
//   key: "ae4cz2j"
// }

export default QueryNavLink;