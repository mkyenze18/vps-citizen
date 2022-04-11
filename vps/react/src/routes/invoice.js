// TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#reading-url-params
// export default function Invoice() {
//     return <h2>Invoice #???</h2>;
//   }

// TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#reading-url-params
// import { useParams } from "react-router-dom";

// export default function Invoice() {
//   let params = useParams();
//   return <h2>Invoice: {params.invoiceId}</h2>;
// }

// TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#reading-url-params
// import { useParams } from "react-router-dom";
// import { getInvoice } from "../data";

// export default function Invoice() {
//   let params = useParams();
//   let invoice = getInvoice(parseInt(params.invoiceId, 10));
//   return (
//     <main style={{ padding: "1rem" }}>
//       <h2>Total Due: {invoice.amount}</h2>
//       <p>
//         {invoice.name}: {invoice.number}
//       </p>
//       <p>Due Date: {invoice.due}</p>
//     </main>
//   );
// }

// TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#navigating-programmatically
import {
    useParams,
    useNavigate,
    useLocation,
  } from "react-router-dom";
  import { getInvoice, deleteInvoice } from "../data";
  
  export default function Invoice() {
    let navigate = useNavigate();
    let location = useLocation();
    let params = useParams();
    let invoice = getInvoice(parseInt(params.invoiceId, 10));
  
    return (
      <main style={{ padding: "1rem" }}>
        <h2>Total Due: {invoice.amount}</h2>
        <p>
          {invoice.name}: {invoice.number}
        </p>
        <p>Due Date: {invoice.due}</p>
        <p>
          <button
            onClick={() => {
              deleteInvoice(invoice.number);
              navigate("/invoices" + location.search);
            }}
          >
            Delete
          </button>
        </p>
      </main>
    );
  }