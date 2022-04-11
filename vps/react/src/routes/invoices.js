// TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#add-some-routes
// export default function Invoices() {
//     return (
//       <main style={{ padding: "1rem 0" }}>
//         <h2>Invoices</h2>
//       </main>
//     );
//   }

// TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#listing-the-invoices
// import { Link } from "react-router-dom";
// import { getInvoices } from "../data";

// export default function Invoices() {
// let invoices = getInvoices();
// return (
//     <div style={{ display: "flex" }}>
//         <nav
//             style={{
//             borderRight: "solid 1px",
//             padding: "1rem",
//             }}
//         >
//             {invoices.map((invoice) => (
//             <Link
//                 style={{ display: "block", margin: "1rem 0" }}
//                 to={`/invoices/${invoice.number}`}
//                 key={invoice.number}
//             >
//                 {invoice.name}
//             </Link>
//             ))}
//         </nav>
//     </div>
// );
// }

// TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#reading-url-params
// import { Link, Outlet } from "react-router-dom";
// import { getInvoices } from "../data";

// export default function Invoices() {
//   let invoices = getInvoices();
//   return (
//     <div style={{ display: "flex" }}>
//       <nav
//         style={{
//           borderRight: "solid 1px",
//           padding: "1rem",
//         }}
//       >
//         {invoices.map((invoice) => (
//           <Link
//             style={{ display: "block", margin: "1rem 0" }}
//             to={`/invoices/${invoice.number}`}
//             key={invoice.number}
//           >
//             {invoice.name}
//           </Link>
//         ))}
//       </nav>
//       <Outlet />
//     </div>
//   );
// }

// TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#active-links
// import { NavLink, Outlet } from "react-router-dom";
// import { getInvoices } from "../data";

// export default function Invoices() {
//   let invoices = getInvoices();
//   return (
//     <div style={{ display: "flex" }}>
//       <nav
//         style={{
//           borderRight: "solid 1px",
//           padding: "1rem",
//         }}
//       >
//         {invoices.map((invoice) => (
//           <NavLink
//             style={({ isActive }) => {
//               return {
//                 display: "block",
//                 margin: "1rem 0",
//                 color: isActive ? "red" : "",
//               };
//             }}
//             to={`/invoices/${invoice.number}`}
//             key={invoice.number}
//           >
//             {invoice.name}
//           </NavLink>
//         ))}
//       </nav>
//       <Outlet />
//     </div>
//   );
// }

// ? normal string
// <NavLink className="red" />

// ? function
// <NavLink className={({ isActive }) => isActive ? "red" : "blue"} />

// TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#search-params
// import {
//     NavLink,
//     Outlet,
//     useSearchParams,
//   } from "react-router-dom";
//   import { getInvoices } from "../data";
  
//   export default function Invoices() {
//     let invoices = getInvoices();
//     let [searchParams, setSearchParams] = useSearchParams();
  
//     return (
//       <div style={{ display: "flex" }}>
//         <nav
//           style={{
//             borderRight: "solid 1px",
//             padding: "1rem",
//           }}
//         >
//           <input
//             value={searchParams.get("filter") || ""}
//             onChange={(event) => {
//               let filter = event.target.value;
//               if (filter) {
//                 setSearchParams({ filter });
//               } else {
//                 setSearchParams({});
//               }
//             }}
//           />
//           {invoices
//             .filter((invoice) => {
//               let filter = searchParams.get("filter");
//               if (!filter) return true;
//               let name = invoice.name.toLowerCase();
//               return name.startsWith(filter.toLowerCase());
//             })
//             .map((invoice) => (
//               <NavLink
//                 style={({ isActive }) => ({
//                   display: "block",
//                   margin: "1rem 0",
//                   color: isActive ? "red" : "",
//                 })}
//                 to={`/invoices/${invoice.number}`}
//                 key={invoice.number}
//               >
//                 {invoice.name}
//               </NavLink>
//             ))}
//         </nav>
//         <Outlet />
//       </div>
//     );
//   }

// TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#custom-behavior
import {
    NavLink,
    Outlet,
    useSearchParams,
  } from "react-router-dom";
  import { getInvoices } from "../data";
import QueryNavLink from "../components/QueryNavLink";
  
  export default function Invoices() {
    let invoices = getInvoices();
    let [searchParams, setSearchParams] = useSearchParams();
  
    return (
      <div style={{ display: "flex" }}>
        <nav
          style={{
            borderRight: "solid 1px",
            padding: "1rem",
          }}
        >
          <input
            value={searchParams.get("filter") || ""}
            onChange={(event) => {
              let filter = event.target.value;
              if (filter) {
                setSearchParams({ filter });
              } else {
                setSearchParams({});
              }
            }}
          />
          {invoices
            .filter((invoice) => {
              let filter = searchParams.get("filter");
              if (!filter) return true;
              let name = invoice.name.toLowerCase();
              return name.startsWith(filter.toLowerCase());
            })
            .map((invoice) => (
              <QueryNavLink
                style={({ isActive }) => ({
                  display: "block",
                  margin: "1rem 0",
                  color: isActive ? "red" : "",
                })}
                to={`/invoices/${invoice.number}`}
                key={invoice.number}
              >
                {invoice.name}
              </QueryNavLink>
            ))}
        </nav>
        <Outlet />
      </div>
    );
  }