import RegisterFormComponent from "../_components/RegisterFormComponent";


export const metadata = {
  title: "Register | PurelyStore",
  description: "Create an account.",
};

export default function RegisterPage() {
  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-8 shadow-lg shadow-gray-200/60 sm:p-10">
      <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
        Create account
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Create your account to continue.
      </p>

      <RegisterFormComponent />
    </div>
  );
}