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
import Page_403 from "./Page_403";

import Home from "./routes/home";

import Index1 from "./routes/gentellela/index1";
import Form from "./routes/gentellela/form";

import Genders from "./routes/gender/genders";
import Gender from "./routes/gender/gender";

import Countries from "./routes/country/countries";
import Country from "./routes/country/country";

import IPRS_Persons from "./routes/iprs_person";
import IPRS_PersonCollection from "./routes/iprs_person/collection";
import IPRS_PersonResource from "./routes/iprs_person/resource";

import Police_Stations from "./routes/police_station/police_stations";
import Police_Station from "./routes/police_station/police_station";

import Police_Officers from "./routes/police_officer";
import Police_OfficerCollection from "./routes/police_officer/collection";
import Police_OfficerResource from "./routes/police_officer/resource";

import Occurrences from "./routes/occurrence";
import OccurrenceCollection from "./routes/occurrence/collection";
import OccurrenceResource from "./routes/occurrence/resource";

import OccurrenceBooks from "./routes/occurrence_book";
import OccurrenceBookCollection from "./routes/occurrence_book/collection";
import OccurrenceBookResource from "./routes/occurrence_book/resource";

import OccurrenceCategories from "./routes/occurrence_category";
import OccurrenceCategoryCollection from "./routes/occurrence_category/collection";
import OccurrenceCategoryResource from "./routes/occurrence_category/resource";

import Evidence_Categories from "./routes/evidence_category/evidence_categories";
import Evidence_Category from "./routes/evidence_category/evidence_category";

import Evidences from "./routes/evidence";
import EvidenceCollection from "./routes/evidence/collection";
import EvidenceResource from "./routes/evidence/resource";

import Evidence_Item_Categories from "./routes/evidence_item_category/evidence_item_categories";
import Evidence_Item_Category from "./routes/evidence_item_category/evidence_item_category";

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
            <Route index element={<Home />} />
            <Route path="index1" element={<Index1 />} />
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
            <Route path="police-stations" element={<Police_Stations />}>
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
                element={<Police_Station />}
              />
              <Route path=":resourceId" element={<Police_Station />} />
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
            <Route path="police-officers" element={<Police_Officers />}>
              <Route
                index
                element={<Police_OfficerCollection />}
              />
              <Route path="add" element={<Police_OfficerResource />} />
              <Route path=":resourceId" element={<Police_OfficerResource />} />
            </Route>
            <Route path="occurrences" element={<Occurrences />}>
              <Route
                index
                element={<OccurrenceCollection />}
              />
              {/* <Route path="add" element={<OccurrenceResource />} /> */}
              <Route path=":resourceId" element={<OccurrenceResource />} />
            </Route>
            {/* Occurrence Book Module */}
            <Route path="occurrence-book" element={<OccurrenceBooks />}>
              <Route
                index
                element={<OccurrenceBookCollection />}
              />
              <Route path="add" element={<OccurrenceBookResource />} />
              <Route path=":resourceId" element={<OccurrenceBookResource />} />
            </Route>
            <Route path="occurrence-categories" element={<OccurrenceCategories />}>
              <Route
                index
                element={<OccurrenceCategoryCollection />}
              />
              <Route path="add" element={<OccurrenceCategoryResource />} />
              <Route path=":resourceId" element={<OccurrenceCategoryResource />} />
            </Route>
            {/* Evidence Module */}
            <Route path="evidence-categories" element={<Evidence_Categories />}>
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
                element={<Evidence_Category />}
              />
              <Route path=":resourceId" element={<Evidence_Category />} />
            </Route>
            <Route path="evidences" element={<Evidences />}>
              <Route
                index
                element={<EvidenceCollection />}
              />
              <Route path="add" element={<EvidenceResource />} />
              <Route path=":resourceId" element={<EvidenceResource />} />
            </Route>
            <Route path="evidence-item-categories" element={<Evidence_Item_Categories />}>
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
                element={<Evidence_Item_Category />}
              />
              <Route path=":resourceId" element={<Evidence_Item_Category />} />
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
          <Route path="403" element={<Page_403 />}></Route>
      </Route>
    </Routes>
    
  </BrowserRouter>,
  rootElement
);