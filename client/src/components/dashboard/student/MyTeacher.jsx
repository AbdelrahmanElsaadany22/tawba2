const MyTeacher = ({ teacher }) => {
  if (!teacher) return (
    <div className="bg-dark-light border border-yellow-500/20 rounded-2xl p-6 font-arabic text-center">
      <p className="text-yellow-400">⏳ سيتم تعيين معلمك قريباً — سنتواصل معك على الواتساب</p>
    </div>
  );

  return (
    <div className="bg-dark-light border border-purple/30 rounded-2xl p-6 font-arabic">
      <h2 className="text-lg font-bold text-white mb-4">معلمي</h2>
      <div className="flex items-center gap-4">
        <img
          src={teacher.avatar_url ?? '/assets/main.png'}
          alt={teacher.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-gold"
        />
        <div>
          <p className="text-white font-bold text-lg">{teacher.name}</p>
          <a
            href={`https://wa.me/${teacher.phone?.replace(/\D/g, '')}`}
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            <i className="fab fa-whatsapp" />
            تواصل مع معلمك
          </a>
        </div>
      </div>
    </div>
  );
};
export default MyTeacher;
