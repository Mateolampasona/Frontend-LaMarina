import PaymentButton from "@/Components/PaymentButton";
import Homee from "../views/Home";
export default function Home() {
  const preferenceId= "2094426158-9d632d96-168b-4ba3-a29c-8d26f7ef7952";
  return (
    <div className="">
      <Homee />
      <PaymentButton preferenceId={preferenceId} />
    </div>
  );
}
