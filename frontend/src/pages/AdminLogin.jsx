import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      // Send login request to backend
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      // Check backend response
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Check Administrator role
      if (data.user.role.toLowerCase() !== "administrator") {
        throw new Error(
          "You are not authorized to access the Administrator panel."
        );
      }

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Save admin user information
      localStorage.setItem(
      "user",
      JSON.stringify(data.user)
      );

      // Redirect to Admin Dashboard
      navigate("/admin/dashboard");

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f2f7ff] flex items-center justify-center px-4">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg border border-blue-100">

        {/* Header */}
        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-700">
            <ShieldCheck size={32} />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-[#07132e]">
            Administrator Login
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Login to access the AISC OJT Portal administration panel
          </p>

        </div>


        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          {/* Email */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email Address
            </label>

            <div className="relative">

              <Mail
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter administrator email"
                required
                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />

            </div>

          </div>


          {/* Password */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Password
            </label>

            <div className="relative">

              <LockKeyhole
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter administrator password"
                required
                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-11 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>

            </div>

          </div>


          {/* Error Message */}
          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-center text-sm text-red-600">
              {error}
            </p>
          )}


          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-700 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Logging in..."
              : "Login as Administrator"}
          </button>

        </form>


        {/* Security Message */}
        <div className="mt-6 rounded-lg bg-blue-50 p-3 text-center text-xs text-blue-700">
          Only authorized administrators can access this panel.
        </div>

      </div>

    </div>
  );
}

export default AdminLogin;