import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const res = await api.post(
        `/auth/reset-password/${token}`,
        {
          password: formData.password,
        }
      );

      alert(res.data.message);

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50">

      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-indigo-600">
            Reset Password
          </h1>

          <p className="text-gray-500 mt-2">
            Enter your new password.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="text-sm font-medium text-gray-600">
              New Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter New Password"
              required
              className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Reset Password
          </button>

        </form>
      </div>
    </div>
  );
};

export default ResetPassword;