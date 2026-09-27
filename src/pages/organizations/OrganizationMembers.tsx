import { useCurrentOrganization } from "../../hooks/organization/useCurrentOrganization";
import { useOrganizationMembers } from "../../hooks/organization/useOrganizationMembers";
import {
  canManageMembers,
} from "../../utils/permissions/organization.permissions";

const OrganizationMembers =
  () => {
    const {
      organizationId,
      role,
    } =
      useCurrentOrganization();

    const {
      data: members,
      isPending,
      isError,
      refetch,
    } =
      useOrganizationMembers(
        organizationId ?? undefined
      );

    const canManage =
      canManageMembers(role);

    if (!organizationId) {
      return null;
    }

    if (isPending) {
      return (
        <div className="p-6">
          Loading members...
        </div>
      );
    }

    if (isError) {
      return (
        <div className="p-6">
          <div className="rounded-xl border border-red-200 bg-red-50 p-5">
            <p className="text-sm text-red-700">
              Unable to load members.
            </p>

            <button
              onClick={() => refetch()}
              className="mt-3 text-sm font-semibold text-red-700 underline"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return (
      <main className="p-6 lg:p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Members
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage members of your organization.
            </p>
          </div>

          {canManage && (
            <button
              type="button"
              className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Add member
            </button>
          )}
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Member
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Email
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Role
                  </th>

                  {canManage && (
                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {members?.map(
                  (member) => (
                    <tr
                      key={
                        member.userId
                      }
                      className="hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <div className="font-medium text-slate-900">
                          {
                            member.user
                              .name
                          }
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-500">
                        {
                          member.user
                            .email
                        }
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                          {
                            member.role
                          }
                        </span>
                      </td>

                      {canManage && (
                        <td className="px-5 py-4 text-right">
                          <button
                            type="button"
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                          >
                            Manage
                          </button>
                        </td>
                      )}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    );
  };

export default OrganizationMembers;