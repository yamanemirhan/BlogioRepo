import { formatDateTime } from "@/utils/dateUtils";
import { useUser } from "@clerk/nextjs";
import React from "react";

const UserInfo = () => {
  const { user, isLoaded } = useUser();
  if (!user) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                User Information
              </h2>
              <div className="space-y-3">
                <div>
                  <span className="block text-sm font-medium text-gray-700">
                    Username:
                  </span>
                  <span className="text-gray-900">
                    {user.username || "Not specified"}
                  </span>
                </div>
                <div>
                  <span className="block text-sm font-medium text-gray-700">
                    Full Name:
                  </span>
                  <span className="text-gray-900">
                    {user.fullName || "Not specified"}
                  </span>
                </div>
                <div>
                  <span className="block text-sm font-medium text-gray-700">
                    Email:
                  </span>
                  <span className="text-gray-900">
                    {user.primaryEmailAddress?.emailAddress || "Not specified"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Roles and Permissions
              </h2>
              <div className="space-y-3">
                <div>
                  <span className="block text-sm font-medium text-gray-700">
                    Roles:
                  </span>
                  <div className="mt-1">
                    {user.organizationMemberships &&
                    user.organizationMemberships.length > 0 ? (
                      user.organizationMemberships.map((membership, index) => (
                        <span
                          key={index}
                          className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2"
                        >
                          {membership.role}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">
                        No roles assigned yet
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <span className="block text-sm font-medium text-gray-700">
                    Account Status:
                  </span>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      user.emailAddresses[0]?.verification?.status ===
                      "verified"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {user.emailAddresses[0]?.verification?.status === "verified"
                      ? "Verified"
                      : "Unverified"}
                  </span>
                </div>
                <div>
                  <span className="block text-sm font-medium text-gray-700">
                    Registration Date:
                  </span>
                  <span className="text-gray-900">
                    {user.createdAt
                      ? formatDateTime(user.createdAt.toISOString())
                      : "Not specified"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="mt-8 bg-blue-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Account Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {user.emailAddresses.length}
                </div>
                <div className="text-sm text-gray-600">Email Addresses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {user.phoneNumbers?.length || 0}
                </div>
                <div className="text-sm text-gray-600">Phone Numbers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {user.lastSignInAt
                    ? Math.floor(
                        (Date.now() - new Date(user.lastSignInAt).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )
                    : 0}
                </div>
                <div className="text-sm text-gray-600">
                  Days Since Last Sign In
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
