import UsersTable from "@/components/admin/UsersTable";

export default function AdminUsersPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto w-full pb-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Manage Users</h1>
        <p className="text-sm font-medium text-gray-500 mt-1">Control user roles, verify identities, and manage platform access.</p>
      </div>
      <UsersTable />
    </div>
  );
}
