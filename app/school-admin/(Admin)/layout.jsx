import AdminLayout from "../../../components/admin/Adminlayout";

export default function Layout({ children }) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}