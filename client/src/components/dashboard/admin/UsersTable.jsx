import { useState } from 'react';
import { useAllUsers } from '../../../hooks/useAllUsers';
import LoadingSpinner from '../../common/LoadingSpinner';

const roleLabel = { student: 'طالب', teacher: 'معلم', admin: 'مدير' };
const roles = ['student', 'teacher', 'admin'];

const UsersTable = () => {
  const [roleFilter, setRoleFilter] = useState(null);
  const { users, loading, updateRole } = useAllUsers(roleFilter);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-dark-light border border-purple/30 rounded-2xl p-6 font-arabic">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">المستخدمون ({users.length})</h2>
        <select
          value={roleFilter ?? ''}
          onChange={e => setRoleFilter(e.target.value || null)}
          className="bg-dark border border-purple/40 text-white px-3 py-2 rounded-lg text-sm"
        >
          <option value="">الكل</option>
          {roles.map(r => <option key={r} value={r}>{roleLabel[r]}</option>)}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right">
          <thead>
            <tr className="text-gray-400 border-b border-purple/20">
              <th className="pb-3">الاسم</th>
              <th className="pb-3">الدور</th>
              <th className="pb-3">الدولة</th>
              <th className="pb-3">تاريخ التسجيل</th>
              <th className="pb-3">تغيير الدور</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-b border-purple/10 hover:bg-dark/50">
                <td className="py-3 text-white">{u.name}</td>
                <td className="py-3">
                  <span className="bg-purple/20 text-purple-light px-2 py-0.5 rounded-full text-xs">
                    {roleLabel[u.role]}
                  </span>
                </td>
                <td className="py-3 text-gray-400">{u.country ?? '—'}</td>
                <td className="py-3 text-gray-400 text-xs">
                  {new Date(u.created_at).toLocaleDateString('ar-SA')}
                </td>
                <td className="py-3">
                  <select
                    value={u.role}
                    onChange={e => updateRole(u.id, e.target.value)}
                    className="bg-dark border border-purple/30 text-white text-xs px-2 py-1 rounded-lg"
                  >
                    {roles.map(r => <option key={r} value={r}>{roleLabel[r]}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UsersTable;
