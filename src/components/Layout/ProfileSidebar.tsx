import React, { useState, useEffect } from 'react';
import { Edit2, Save, X, Calendar, User, Weight, Ruler, Gift } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

// --- Reusable Sub-Component for Stats ---
const StatItem = ({ icon, label, value, unit, isEditing, onChange }) => (
  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 text-center flex flex-col justify-between">
    <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
      {icon}
      <span>{label}</span>
    </div>
    {isEditing ? (
      <input
        type="number"
        value={value}
        onChange={onChange}
        className="text-lg font-bold text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md w-full text-center mt-1 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
    ) : (
      <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">
        {value} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{unit}</span>
      </p>
    )}
  </div>
);

// --- Reusable Sub-Component for Journal Entries ---
const JournalCard = ({ entry }) => (
  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-l-4 border-orange-400 hover:shadow-lg hover:translate-x-1 transition-all duration-200">
    <div className="flex justify-between items-start mb-2">
      <h5 className="font-semibold text-gray-900 dark:text-white">{entry.type}</h5>
      <span className="text-xs text-gray-500 dark:text-gray-400">{entry.time}</span>
    </div>
    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{entry.description}</p>
    {entry.calories && (
      <span className="text-xs font-medium bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300 px-2 py-1 rounded-full">
        {entry.calories} kcal
      </span>
    )}
  </div>
);


const ProfileSidebar = () => {
  const { user, updateUser, journalEntries } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  // Sync state if the user context changes from elsewhere
  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleSave = () => {
    updateUser(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedUser({ ...editedUser, [field]: value });
  };
  
  return (
    <aside className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 z-20 flex flex-col">
      {/* User Profile Section */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-tr from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-7 h-7 text-white" />
            </div>
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={editedUser.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="text-xl font-bold bg-transparent border-b-2 border-orange-300 dark:border-orange-700 text-gray-900 dark:text-white focus:outline-none"
                />
              ) : (
                <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">{user.name}</h3>
              )}
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-400 hover:text-orange-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200"
            >
              <Edit2 className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <StatItem icon={<Weight size={14} />} label="Weight" value={isEditing ? editedUser.weight : user.weight} unit="kg" isEditing={isEditing} onChange={(e) => handleInputChange('weight', Number(e.target.value))} />
          <StatItem icon={<Ruler size={14} />} label="Height" value={isEditing ? editedUser.height : user.height} unit="cm" isEditing={isEditing} onChange={(e) => handleInputChange('height', Number(e.target.value))} />
          <StatItem icon={<Gift size={14} />} label="Age" value={isEditing ? editedUser.age : user.age} unit="yrs" isEditing={isEditing} onChange={(e) => handleInputChange('age', Number(e.target.value))} />
        </div>

        {isEditing && (
          <div className="flex space-x-3 mt-6">
            <button onClick={handleSave} className="flex-1 flex items-center justify-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200">
              <Save size={16} />
              <span>Save</span>
            </button>
            <button onClick={handleCancel} className="flex-1 flex items-center justify-center space-x-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200">
              <X size={16} />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>

      {/* Journals Section */}
      <div className="flex-1 p-6 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white">Journals</h4>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>Today</span>
          </div>
        </div>
        
        <div className="flex-1 space-y-4 overflow-y-auto pr-2 -mr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full">
          {journalEntries.length > 0 ? (
            journalEntries.map((entry) => <JournalCard key={entry.id} entry={entry} />)
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 pt-10">
              <p>No journal entries for today.</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default ProfileSidebar;