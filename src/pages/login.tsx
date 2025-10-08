import { getProviders, signIn } from "next-auth/react";
import { GetServerSideProps } from "next";
import { BuiltInProviderType } from "next-auth/providers";

interface Props {
  providers: Record<
    string,
    {
      id: string;
      name: string;
      type: BuiltInProviderType;
      signinUrl: string;
      callbackUrl: string;
    }
  > | null;
}

const LoginPage = ({ providers }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Login to EventNaija</h1>
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              onClick={() => signIn(provider.id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};

export default LoginPage;