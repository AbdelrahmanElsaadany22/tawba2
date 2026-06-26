const PlanCategoryBtn = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-lg font-arabic font-bold transition-colors ${
      active ? 'bg-gold text-dark' : 'border border-gold text-gold hover:bg-gold/10'
    }`}
  >
    {label}
  </button>
);

export default PlanCategoryBtn;
