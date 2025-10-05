import SubmitPage from "@/modules/submit/page";
import { SubmitProvider } from "@/modules/submit/context";

// The event submission page.
// We wrap it with the SubmitProvider to give the form and its children
// access to the submission state and functions.
const SubmitEventPage = () => {
  return (
    <SubmitProvider>
      <SubmitPage />
    </SubmitProvider>
  );
};

export default SubmitEventPage;