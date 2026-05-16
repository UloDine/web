import { redirect } from "next/navigation";
import { CUSTOMER_ROUTES } from "@/routes/RoutePaths";

function Restaurants() {
  return redirect(CUSTOMER_ROUTES.BROWSE);
}

export default Restaurants;
