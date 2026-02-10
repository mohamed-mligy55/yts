// Signup.jsx
import { useFormik } from "formik";
import * as Yup from "yup";
import { signup } from "../utils/auth";

export const Signup = ({ onSuccess }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().min(3, "Min 3 chars").required("Username required"),
      email: Yup.string().email("Invalid email").required("Email required"),
      password: Yup.string().min(6, "Min 6 chars").required("Password required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password"),
    }),
   onSubmit: (values) => {
  signup(values);
  onSuccess({
    email: values.email,
    password: values.password,
  });
},
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <input
        name="username"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.username}
        className="w-full border px-4 py-3 rounded"
        placeholder="Username"
      />
      {formik.touched.username && formik.errors.username && (
        <p className="text-red-500 text-xs">{formik.errors.username}</p>
      )}

      <input
        name="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        className="w-full border px-4 py-3 rounded"
        placeholder="E-Mail"
      />
      {formik.touched.email && formik.errors.email && (
        <p className="text-red-500 text-xs">{formik.errors.email}</p>
      )}

      <input
        type="password"
        name="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        className="w-full border px-4 py-3 rounded"
        placeholder="Password"
      />

      <input
        type="password"
        name="confirmPassword"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.confirmPassword}
        className="w-full border px-4 py-3 rounded"
        placeholder="Confirm Password"
      />

      {formik.status && (
        <p className="text-center text-sm text-red-500">{formik.status}</p>
      )}

      <button
        type="submit"
        className="w-full bg-[#79c142] text-white py-3 rounded"
      >
        Register
      </button>
    </form>
  );
};
