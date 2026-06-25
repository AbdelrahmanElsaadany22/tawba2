const PlanTabs = ({ tabs, activeTab, onTabChange }) => (
  <div className="flex justify-center gap-4 mb-10">
    {tabs.map(tab => (
      <button
        key={tab.value}
        onClick={() => onTabChange(tab.value)}
        className={`px-4 py-2 rounded-lg font-arabic transition-colors ${
          activeTab === tab.value
            ? 'bg-purple text-white'
            : 'border border-purple text-purple hover:bg-purple/10'
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export default PlanTabs;
