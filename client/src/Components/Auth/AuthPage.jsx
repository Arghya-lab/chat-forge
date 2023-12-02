import { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";

function AuthPage() {
  const [pageType, setPageType] = useState("login");

  return (
    <div
      className="bg-fixed h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${
          import.meta.env.VITE_IMG_BASE_URL
        }/loginPage_bg.png)`,
      }}>
      <div className="w-[480px] bg-shadow-300 p-8 rounded-md">
        {pageType === "login" ? (
          <>
            <Login />
            <div className="my-2">
              <span className="text-xs text-neutral-400">Need an account?</span>
              &nbsp;
              <span
                className="text-xs text-light-blue-600 hover:underline cursor-pointer"
                onClick={() => setPageType("signup")}>
                Register
              </span>
            </div>
          </>
        ) : (
          <>
            <Signup />
            <p
              className="mt-6 text-xs text-light-blue-600 hover:underline cursor-pointer"
              onClick={() => setPageType("login")}>
              Already have account?
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthPage;
