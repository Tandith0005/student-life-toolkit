import { FcGoogle } from "react-icons/fc"; 
import { CircleLoader } from "react-spinners";

const SocialLogin = ({ loginWithGoogle, loading, setLoading, setError, toast, navigate, location }) => {
  return (
    <div>
      <div className="mt-4">
        <button
          onClick={async () => {
            try {
              const result = await loginWithGoogle();
              toast.success(`Welcome, ${result.user.email}!`);
              navigate(location.state?.from || "/");
            } catch (error) {
              setLoading(false);
              setError(error.message);
            }
          }}
          className="w-full flex items-center justify-center gap-2 border-2 border-gray-300 py-2 rounded hover:bg-gray-100 transition duration-300 cursor-pointer"
        >
          {loading ? (
            <CircleLoader color="#f43f5e" size={20} className="disabled" />
          ) : (
            <>
              <FcGoogle className="w-6 h-6" />
              <span>Login with Google</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
