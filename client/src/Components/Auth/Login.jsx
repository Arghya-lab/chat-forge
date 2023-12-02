import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../utils/axios";
import { Button } from "@material-tailwind/react";
import { setAuth } from "../../features/auth/authSlice";

function Login() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password should not exceed 20 characters"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post("/auth/login", values);
        dispatch(setAuth(res.data));
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  return (
    <>
      <h4 className="text-center text-2xl font-semibold text-blue-gray-50 mb-2">
        Welcome back!
      </h4>
      <p className="text-neutral-300 text-center text-sm">
        We&apos;re so exited to see you again!
      </p>
      <form className="mt-5 flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col ">
          <label
            htmlFor="email"
            className="mb-2 text-gray-400 font-semibold text-xs uppercase">
            Email
          </label>
          <input
            className="w-full rounded border-none p-2 h-10 bg-shadow-900 text-neutral-100 text-sm focus:outline-none"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="mt-1 ml-1 text-red-400 text-xs">
              {formik.errors.email}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col ">
          <label
            htmlFor="password"
            className="mb-2 text-gray-400 font-semibold text-xs uppercase">
            password
          </label>
          <input
            className="w-full rounded border-none p-2 h-10 bg-gray-900 text-neutral-100 text-sm focus:outline-none"
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="mt-1 ml-1 text-red-400 text-xs">
              {formik.errors.password}
            </div>
          ) : null}
        </div>
        <Button
          className="mt-5 w-full capitalize text-sm font-medium"
          color="indigo"
          type="submit">
          Continue
        </Button>
      </form>
    </>
  );
}

export default Login;
