import { SubmitPage } from "@/modules/submit/page";
import AuthGuard from "@/components/AuthGuard";
import { SubmitProvider } from "@/modules/submit/context";

const SubmitEventPage = () => {
  return (
    <AuthGuard>
      <SubmitProvider>
        <SubmitPage />
      </SubmitProvider>
    </AuthGuard>
  );
};

export default SubmitEventPage;
