import {useRouter} from "next/dist/client/router";
import Pagination from "../../components/Pagination";
import Product from "../../components/Product";

export default function OrderPage() {
  const {query} = useRouter()
  const page = parseInt(query.page);
  //console.log("Hello "  + typeof page)

  return (
    <div>
      <Pagination page={page || 1} />
      <Product page = {page || 1} />
      <Pagination page={page || 1} />
    </div>
  );
}
