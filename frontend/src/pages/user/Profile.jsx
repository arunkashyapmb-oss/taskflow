import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

const Profile = () => {
  const [user, setUser] = useState({});

  const getProfile = async () => {
    try {
      const res = await api.get("/users/profile");
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1">
        <div className="max-w-[1400px] mx-auto">
          <Navbar />

          <main className="p-6 space-y-6">
            {/* Hero Profile Card */}
            <div className="relative overflow-hidden rounded-[32px] bg-white shadow-lg border border-slate-200">
              {/* Cover Banner */}
              <div className="h-56 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 relative">
                <div className="absolute inset-0 bg-black/10" />

                <div className="absolute right-10 top-10 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute left-20 bottom-0 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
              </div>

              {/* Profile Info */}
              <div className="relative px-8 pb-8">
                <div className="-mt-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                  <div className="flex flex-col sm:flex-row sm:items-end gap-5">
                    {/* Avatar */}
                    <div className="h-36 w-36 rounded-full border-[6px] border-white bg-white shadow-xl flex items-center justify-center text-5xl font-bold text-indigo-600">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <div className="pb-2">
                      <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                        {user.name || "Guest User"}
                      </h1>

                      <p className="mt-2 text-slate-500 text-lg">
                        {user.email || "No Email"}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-3">
                        <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700 capitalize">
                          {user.role || "User"}
                        </span>

                        <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>

                  <button className="rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-[28px] bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
                <p className="text-sm text-slate-500">
                  Account Role
                </p>

                <h3 className="mt-3 text-3xl font-bold text-slate-900 capitalize">
                  {user.role || "-"}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Current user role
                </p>
              </div>

              <div className="rounded-[28px] bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
                <p className="text-sm text-slate-500">
                  Status
                </p>

                <h3 className="mt-3 text-3xl font-bold text-emerald-600">
                  Active
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Account is active
                </p>
              </div>

              <div className="rounded-[28px] bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
                <p className="text-sm text-slate-500">
                  Member Since
                </p>

                <h3 className="mt-3 text-3xl font-bold text-slate-900">
                  2026
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Registered account
                </p>
              </div>
            </div>

            {/* Account Information */}
            <div className="rounded-[32px] bg-white border border-slate-200 p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Account Information
                  </h2>

                  <p className="mt-1 text-slate-500">
                    Personal account details and profile information.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div>
                  <p className="text-sm text-slate-500">
                    Full Name
                  </p>

                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {user.name || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Email Address
                  </p>

                  <p className="mt-2 text-lg font-semibold text-slate-900 break-all">
                    {user.email || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    User Role
                  </p>

                  <p className="mt-2 text-lg font-semibold text-slate-900 capitalize">
                    {user.role || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Account Status
                  </p>

                  <p className="mt-2 text-lg font-semibold text-emerald-600">
                    Active
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-[32px] bg-white border border-slate-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">
                Quick Actions
              </h2>

              <div className="mt-6 flex flex-wrap gap-4">
                <button className="rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition">
                  Edit Profile
                </button>

                <button className="rounded-2xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
                  Change Password
                </button>

                <button className="rounded-2xl border border-red-200 px-6 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition">
                  Logout
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;