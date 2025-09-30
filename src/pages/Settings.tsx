import React, { useState, createContext, useContext } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  HelpCircle,
  ChevronRight,
  ArrowLeft,
  Trash2,
} from 'lucide-react';

// --- Mock App Context ---
const AppContext = createContext();
const useApp = () => useContext(AppContext);

// --- Reusable Component for setting items ---
const SettingsItem = ({ icon, color, title, subtitle, onClick, gradient }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center text-left bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
  >
    <div
      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mr-4 sm:mr-6 ${
        gradient
          ? 'bg-gradient-to-tr from-orange-400 to-red-500'
          : `bg-${color}-100 dark:bg-${color}-900/50`
      }`}
    >
      {React.cloneElement(icon, {
        className: `w-6 h-6 sm:w-7 sm:h-7 ${
          gradient ? 'text-white' : `text-${color}-500 dark:text-${color}-400`
        }`,
      })}
    </div>
    <div className="flex-grow">
      <h3 className="text-md sm:text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-200">{subtitle}</p>
    </div>
    <ChevronRight className="w-6 h-6 text-gray-300 dark:text-gray-500" />
  </button>
);

// --- Toggle Switch ---
const ToggleSwitch = ({ label, enabled, setEnabled }) => (
  <label className="flex items-center justify-between cursor-pointer">
    <span className="text-gray-700 dark:text-gray-200">{label}</span>
    <div
      className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
        enabled ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'
      }`}
    >
      <span
        className={`inline-block w-4 h-4 bg-white rounded-full transform transition-transform duration-300 ease-in-out ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
        style={{ top: '4px' }}
      />
    </div>
  </label>
);

// --- Wrapper for Sub Pages ---
const SubPageWrapper = ({ title, icon, onBack, children }) => (
  <div className="max-w-4xl mx-auto animate-fade-in">
    <div className="flex items-center mb-8">
      <button
        onClick={onBack}
        className="p-2 mr-4 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
      </button>
      <div className="flex items-center space-x-3">
        {icon}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
      </div>
    </div>
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8">
      {children}
    </div>
  </div>
);

// --- Main Settings Page ---
const MainSettingsPage = ({ setActivePage }) => (
  <div className="max-w-4xl mx-auto">
    <div className="text-center pt-8 pb-12">
      <div className="inline-block bg-gradient-to-tr from-orange-400 to-red-500 p-4 rounded-full shadow-lg mb-4">
        <SettingsIcon className="w-12 h-12 text-white" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">Settings</h1>
      <p className="text-lg text-gray-600 dark:text-gray-200 mt-2">
        Manage your profile, preferences, and app settings.
      </p>
    </div>

    <div className="space-y-4">
      <SettingsItem
        icon={<User />}
        color="blue"
        title="Profile"
        gradient
        subtitle="Manage your personal and public information"
        onClick={() => setActivePage('profile')}
      />
      <SettingsItem
        icon={<Bell />}
        color="green"
        title="Notifications"
        gradient
        subtitle="Choose how you want to be notified"
        onClick={() => setActivePage('notifications')}
      />
      <SettingsItem
        icon={<Shield />}
        color="purple"
        title="Privacy & Security"
        gradient
        subtitle="Control your data and connected apps"
        onClick={() => setActivePage('privacy')}
      />
      <SettingsItem
        icon={<HelpCircle />}
        color="yellow"
        title="Help & Support"
        gradient
        subtitle="Get help, send feedback, or report issues"
        onClick={() => setActivePage('help')}
      />
    </div>
  </div>
);

// --- Profile Page ---
const ProfilePage = ({ onBack }) => {
  const { user, updateUser } = useApp();
  const [editedUser, setEditedUser] = useState(user);

  const handleSave = () => {
    updateUser(editedUser);
  };

  return (
    <SubPageWrapper title="Profile" icon={<User className="w-7 h-7 text-blue-500" />} onBack={onBack}>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gradient-to-tr from-orange-400 to-red-500 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h3>
            <p className="text-gray-500 dark:text-gray-200">{user.email}</p>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-200">Name</label>
            <input
              type="text"
              value={editedUser.name}
              onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
              className="w-full mt-1 p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-200">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full mt-1 p-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg cursor-not-allowed text-gray-900 dark:text-gray-300"
            />
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            className="bg-orange-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </SubPageWrapper>
  );
};

// --- Notifications Page ---
const NotificationsPage = ({ onBack }) => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [fastingReminders, setFastingReminders] = useState(true);

  return (
    <SubPageWrapper title="Notifications" icon={<Bell className="w-7 h-7 text-green-500" />} onBack={onBack}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Channels</h3>
        <ToggleSwitch label="Push Notifications" enabled={pushEnabled} setEnabled={setPushEnabled} />
        <ToggleSwitch label="Email Notifications" enabled={emailEnabled} setEnabled={setEmailEnabled} />
        <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Reminders</h3>
        <ToggleSwitch label="Fasting Reminders" enabled={fastingReminders} setEnabled={setFastingReminders} />
      </div>
    </SubPageWrapper>
  );
};

// --- Privacy Page ---
const PrivacyPage = ({ onBack }) => (
  <SubPageWrapper title="Privacy & Security" icon={<Shield className="w-7 h-7 text-purple-500" />} onBack={onBack}>
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-white">Two-Factor Authentication</h4>
          <p className="text-sm text-gray-500 dark:text-gray-200">
            Add an extra layer of security to your account.
          </p>
        </div>
        <button className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
          Enable
        </button>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-white">Manage Data</h4>
          <p className="text-sm text-gray-500 dark:text-gray-200">
            Download or delete your account data.
          </p>
        </div>
        <button className="text-red-500 font-semibold py-2 px-4 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center space-x-2">
          <Trash2 size={16} />
          <span>Delete Account</span>
        </button>
      </div>
    </div>
  </SubPageWrapper>
);

// --- Help & Sub Pages ---
const HelpPage = ({ onBack, setActivePage }) => (
  <SubPageWrapper title="Help & Support" icon={<HelpCircle className="w-7 h-7 text-yellow-500" />} onBack={onBack}>
    <div className="space-y-4">
      <button
        onClick={() => setActivePage('faq')}
        className="block w-full text-left p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
      >
        <h4 className="font-semibold text-gray-800 dark:text-white">FAQ</h4>
        <p className="text-sm text-gray-500 dark:text-gray-200">Find answers to frequently asked questions.</p>
      </button>
      <button
        onClick={() => setActivePage('contact')}
        className="block w-full text-left p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
      >
        <h4 className="font-semibold text-gray-800 dark:text-white">Contact Us</h4>
        <p className="text-sm text-gray-500 dark:text-gray-200">Get in touch with our support team.</p>
      </button>
      <button
        onClick={() => setActivePage('terms')}
        className="block w-full text-left p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
      >
        <h4 className="font-semibold text-gray-800 dark:text-white">Terms of Service</h4>
        <p className="text-sm text-gray-500 dark:text-gray-200">Read our terms and conditions.</p>
      </button>
    </div>
  </SubPageWrapper>
);

const FAQPage = ({ onBack }) => (
  <SubPageWrapper title="FAQ" icon={<HelpCircle className="w-7 h-7 text-yellow-500" />} onBack={onBack}>
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white">How do I reset my password?</h4>
        <p className="text-sm text-gray-600 dark:text-gray-200">
          Go to Privacy & Security → Reset Password and follow the instructions.
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white">Can I export my data?</h4>
        <p className="text-sm text-gray-600 dark:text-gray-200">
          Yes, under Privacy & Security you can download all your account data.
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white">How do I contact support?</h4>
        <p className="text-sm text-gray-600 dark:text-gray-200">
          Use the Contact Us page to send us your query.
        </p>
      </div>
    </div>
  </SubPageWrapper>
);

const ContactPage = ({ onBack }) => (
  <SubPageWrapper title="Contact Us" icon={<HelpCircle className="w-7 h-7 text-green-500" />} onBack={onBack}>
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Your Name</label>
        <input type="text" className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
        <input type="email" className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Message</label>
        <textarea rows="4" className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"></textarea>
      </div>
      <button
        type="submit"
        className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
      >
        Send Message
      </button>
    </form>
  </SubPageWrapper>
);

const TermsPage = ({ onBack }) => (
  <SubPageWrapper title="Terms of Service" icon={<HelpCircle className="w-7 h-7 text-red-500" />} onBack={onBack}>
    <div className="space-y-4 text-sm text-gray-600 dark:text-gray-200">
      <p>By using this app, you agree to the following terms and conditions:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>You are responsible for maintaining the confidentiality of your account.</li>
        <li>You may not use this app for any unlawful activities.</li>
        <li>We may update these terms from time to time. Continued use constitutes acceptance.</li>
        <li>We respect your privacy and handle your data responsibly.</li>
      </ul>
    </div>
  </SubPageWrapper>
);

// --- Main Settings Component ---
const Settings = () => {
  const [activePage, setActivePage] = useState('main');

  const renderPage = () => {
    switch (activePage) {
      case 'profile':
        return <ProfilePage onBack={() => setActivePage('main')} />;
      case 'notifications':
        return <NotificationsPage onBack={() => setActivePage('main')} />;
      case 'privacy':
        return <PrivacyPage onBack={() => setActivePage('main')} />;
      case 'help':
        return <HelpPage onBack={() => setActivePage('main')} setActivePage={setActivePage} />;
      case 'faq':
        return <FAQPage onBack={() => setActivePage('help')} />;
      case 'contact':
        return <ContactPage onBack={() => setActivePage('help')} />;
      case 'terms':
        return <TermsPage onBack={() => setActivePage('help')} />;
      default:
        return <MainSettingsPage setActivePage={setActivePage} />;
    }
  };

  return <div className="p-4 sm:p-6 md:p-8">{renderPage()}</div>;
};

// --- Root Component with Context ---
const SettingsPageWithContext = () => {
  const [user, setUser] = useState({
    name: 'Bunny',
    email: 'bunny202410@example.com',
    weight: 50,
    height: 170,
    age: 21,
  });

  const updateUser = (newUserData) => {
    setUser((prevUser) => ({ ...prevUser, ...newUserData }));
  };

  const value = { user, updateUser };

  return (
    <AppContext.Provider value={value}>
      <Settings />
    </AppContext.Provider>
  );
};

export default SettingsPageWithContext;
