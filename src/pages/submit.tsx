import { SubmitPage } from "@/modules/submit/page";
import AuthGuard from "@/components/AuthGuard";

const SubmitEventPage = () => {
  return (
    <AuthGuard>
        <SubmitPage />
    </AuthGuard>
  );
};

export default SubmitEventPage;
