import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/forgot-password", {
        email,
      });

      setMessage(res.data.message);
   
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(resetLink);
      alert("Reset Link Copied Successfully");
    } catch (error) {
      alert("Failed to copy link");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-indigo-600">
            Forgot Password
          </h1>

          <p className="text-gray-500 mt-2">
            Enter your registered email address.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="text-sm font-medium text-gray-600">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Send Reset Link
          </button>

          {message && (
            <p className="text-center text-green-600 font-medium">
              {message}
            </p>
          )}

          

          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full py-3 border rounded-lg hover:bg-gray-100 transition"
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;