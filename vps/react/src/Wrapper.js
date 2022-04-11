// TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#using-a-bundler
// export default function App() {
//   return (
//     <div>
//       <h1>Bookkeeper!</h1>
//     </div>
//   );
// }

// TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#connect-the-url
// import { Link } from "react-router-dom";

// export default function App() {
//   return (
//     <div>
//       <h1>Bookkeeper</h1>
//       <nav
//         style={{
//           borderBottom: "solid 1px",
//           paddingBottom: "1rem",
//         }}
//       >
//         <Link to="/invoices">Invoices</Link> |{" "}
//         <Link to="/expenses">Expenses</Link>
//       </nav>
//     </div>
//   );
// }

// TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#nested-routes
// import { Outlet, Link } from "react-router-dom";

// export default function App() {
//   return (
//     <div>
//       <h1>Bookkeeper</h1>
//       <nav
//         style={{
//           borderBottom: "solid 1px",
//           paddingBottom: "1rem",
//         }}
//       >
//         <Link to="/invoices">Invoices</Link> |{" "}
//         <Link to="/expenses">Expenses</Link>
//       </nav>
//       <Outlet />
//     </div>
//   );
// }

// ! YOUR CODE STARTS HERE
import { Outlet } from "react-router-dom";

export default function Wrapper() {
  return (
    <div>
      <Outlet />
    </div>
  );
}