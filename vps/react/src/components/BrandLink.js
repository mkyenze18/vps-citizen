import {
    Link,
    useSearchParams,
  } from "react-router-dom";

// TODO https://reactrouter.com/docs/en/v6/getting-started/tutorial#custom-behavior

// <Link to="/shoes?brand=nike">Nike</Link>
// <Link to="/shoes?brand=vans">Vans</Link>

function BrandLink({ brand, ...props }) {
    let [params] = useSearchParams();
    let isActive = params.getAll("brand").includes(brand);
    return (
      <Link
        style={{ color: isActive ? "red" : "" }}
        to={`/shoes?brand=${brand}`}
        {...props}
      />
    );
  }

export default BrandLink;