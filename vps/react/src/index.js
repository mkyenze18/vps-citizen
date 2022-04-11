// TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#using-a-bundler
// import { render } from "react-dom";
// import App from "./App";

// const rootElement = document.getElementById("root");
// render(<App />, rootElement);

// TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#connect-the-url
// import { render } from "react-dom";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";

// const rootElement = document.getElementById("root");
// render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   rootElement
// );

// TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#add-some-routes
// import { render } from "react-dom";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom";
// import App from "./App";
// import Expenses from "./routes/expenses";
// import Invoices from "./routes/invoices";

// const rootElement = document.getElementById("root");
// render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />} />
//       <Route path="expenses" element={<Expenses />} />
//       <Route path="invoices" element={<Invoices />} />
//     </Routes>
//   </BrowserRouter>,
//   rootElement
// );

// // TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#nested-routes
// import { render } from "react-dom";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom";
// import App from "./App";
// import Expenses from "./routes/expenses";
// import Invoices from "./routes/invoices";
// // TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#reading-url-params
// import Invoice from "./routes/invoice";

// const rootElement = document.getElementById("root");
// render(
//   <BrowserRouter>
//     {/* <Routes>
//       <Route path="/" element={<App />}>
//         <Route path="expenses" element={<Expenses />} />
//         <Route path="invoices" element={<Invoices />} />
//       </Route>
//     </Routes> */}
//     {/* + https://reactrouter.com/docs/en/v6/getting-started/tutorial#adding-a-no-match-route */}
//     {/* <Routes>
//       <Route path="/" element={<App />}>
//         <Route path="expenses" element={<Expenses />} />
//         <Route path="invoices" element={<Invoices />} />
//         <Route
//           path="*"
//           element={
//             <main style={{ padding: "1rem" }}>
//               <p>There's nothing here!</p>
//             </main>
//           }
//         />
//       </Route>
//     </Routes> */}
//     {/* + https://reactrouter.com/docs/en/v6/getting-started/tutorial#reading-url-params */}
//     {/* <Routes>
//       <Route path="/" element={<App />}>
//         <Route path="expenses" element={<Expenses />} />
//         <Route path="invoices" element={<Invoices />}>
//           <Route path=":invoiceId" element={<Invoice />} />
//         </Route>
//         <Route
//           path="*"
//           element={
//             <main style={{ padding: "1rem" }}>
//               <p>There's nothing here!</p>
//             </main>
//           }
//         />
//       </Route>
//     </Routes> */}
//     {/* + https://reactrouter.com/docs/en/v6/getting-started/tutorial#index-routes */}
//     <Routes>
//       <Route path="/" element={<App />}>
//         <Route path="expenses" element={<Expenses />} />
//         <Route path="invoices" element={<Invoices />}>
//           <Route
//             index
//             element={
//               <main style={{ padding: "1rem" }}>
//                 <p>Select an invoice</p>
//               </main>
//             }
//           />
//           <Route path=":invoiceId" element={<Invoice />} />
//         </Route>
//         <Route
//           path="*"
//           element={
//             <main style={{ padding: "1rem" }}>
//               <p>There's nothing here!</p>
//             </main>
//           }
//         />
//       </Route>
//     </Routes>
    
//   </BrowserRouter>,
//   rootElement
// );

// ! YOUR CODE STARTS HERE
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Wrapper from "./Wrapper";
import App from "./App";
import Landing from "./Landing";

import Index1 from "./routes/gentellela/index1";
import Form from "./routes/gentellela/form";

import Genders from "./routes/gender/genders";
import Gender from "./routes/gender/gender";

import Countries from "./routes/country/countries";
import Country from "./routes/country/country";

import IPRS_Persons from "./routes/iprs_person";
import IPRS_PersonCollection from "./routes/iprs_person/collection";
import IPRS_PersonResource from "./routes/iprs_person/resource";

import Ranks from "./routes/rank/ranks";
import Rank from "./routes/rank/rank";

// import Invoices from "./routes/invoices";
// import Invoice from "./routes/invoice";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="" element={<Wrapper />}>
          <Route
              index
              element={<Landing />}
            />
          <Route path="vps" element={<App />}>
            <Route path="index1" index element={<Index1 />} />
            <Route path="form" element={<Form />} />
            {/* <Route path="countries" element={<Countries />} /> */}
            <Route path="genders" element={<Genders />}>
              <Route
                index
                element={<Gender />}
              />
              <Route path=":resourceId" element={<Gender />} />
            </Route>
            <Route path="countries" element={<Countries />}>
              {/* <Route
                index
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>Select an invoice</p>
                  </main>
                }
              /> */}
              <Route
                index
                element={<Country />}
              />
              <Route path=":resourceId" element={<Country />} />
            </Route>
            <Route path="iprs-persons" element={<IPRS_Persons />}>
              <Route
                index
                element={<IPRS_PersonCollection />}
              />
              <Route path="add" element={<IPRS_PersonResource />} />
              <Route path=":resourceId" element={<IPRS_PersonResource />} />
            </Route>
            <Route path="ranks" element={<Ranks />}>
              {/* <Route
                index
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>Select an invoice</p>
                  </main>
                }
              /> */}
              <Route
                index
                element={<Rank />}
              />
              <Route path=":resourceId" element={<Rank />} />
            </Route>
            {/* <Route path="invoices" element={<Invoices />}>
              <Route
                index
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>Select an invoice</p>
                  </main>
                }
              />
              <Route path=":invoiceId" element={<Invoice />} />
            </Route> */}
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Route>
      </Route>
    </Routes>
    
  </BrowserRouter>,
  rootElement
);