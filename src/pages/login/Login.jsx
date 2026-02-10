// Login.jsx
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";

export const Login = ({  onSuccess, defaultValues }) => {
  const navigate = useNavigate();

  const formik = useFormik({
     enableReinitialize: true,
    initialValues: {
      email: defaultValues?.email || "",
      password: defaultValues?.password || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email required"),
      password: Yup.string().required("Password required"),
    }),
    onSubmit: (values, { setStatus }) => {
      try {
        login(values);     // fake login
        onSuccess();       // 🔥 close modal
        navigate("/home"); // go to Home
      } catch (err) {
        setStatus(err.message);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
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
      {formik.touched.password && formik.errors.password && (
        <p className="text-red-500 text-xs">{formik.errors.password}</p>
      )}

      {formik.status && (
        <p className="text-center text-sm text-red-500">{formik.status}</p>
      )}

      <button
        type="submit"
        className="w-full bg-[#79c142] text-white py-3 rounded"
      >
        Login
      </button>
    </form>
  );
};
