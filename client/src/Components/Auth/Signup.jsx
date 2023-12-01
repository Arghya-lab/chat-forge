import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../utils/axios";
import { Button } from "@material-tailwind/react";
import { setAuth } from "../../features/auth/authSlice";

function Signup() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      displayName: "",
      userName: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      displayName: Yup.string()
        .required("Display name is required")
        .min(5, "Display name must be at least 6 characters")
        .max(10, "Display name should not exceed 20 characters"),
      userName: Yup.string()
        .required("User name is required")
        .min(8, "User name must be at least 6 characters")
        .max(16, "User name should not exceed 20 characters"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password should not exceed 20 characters"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post("/auth/signup", values);
        dispatch(setAuth(res.data))
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  return (
    <>
      <h4 className="text-center text-2xl font-semibold text-blue-gray-50">
        Create an account
      </h4>
      <form className="mt-5 flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col ">
          <label
            htmlFor="email"
            className="mb-2 text-gray-400 font-semibold text-xs uppercase">
            Email
          </label>
          <input
            className="w-full rounded border-none p-2 h-10 bg-gray-900 text-neutral-100 text-sm focus:outline-none"
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
            htmlFor="displayName"
            className="mb-2 text-gray-400 font-semibold text-xs uppercase">
            Display Name
          </label>
          <input
            className="w-full rounded border-none p-2 h-10 bg-gray-900 text-neutral-100 text-sm focus:outline-none"
            id="displayName"
            name="displayName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.displayName}
            {...formik.getFieldProps("displayName")}
          />
          {formik.touched.displayName && formik.errors.displayName ? (
            <div className="mt-1 ml-1 text-red-400 text-xs">
              {formik.errors.displayName}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col ">
          <label
            htmlFor="userName"
            className="mb-2 text-gray-400 font-semibold text-xs uppercase">
            User Name
          </label>
          <input
            className="w-full rounded border-none p-2 h-10 bg-gray-900 text-neutral-100 text-sm focus:outline-none"
            id="userName"
            name="userName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.userName}
            {...formik.getFieldProps("userName")}
          />
          {formik.touched.userName && formik.errors.userName ? (
            <div className="mt-1 ml-1 text-red-400 text-xs">
              {formik.errors.userName}
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

export default Signup;
