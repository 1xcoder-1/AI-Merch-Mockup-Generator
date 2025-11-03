
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm p-4 border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto flex items-center gap-4">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-indigo-400">
            <path d="M12 2.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 12 2.25ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.061 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM21.75 12a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.06-1.061a.75.75 0 0 0-1.06 1.06l1.06 1.06ZM12 21.75a.75.75 0 0 1-.75-.75v-1.5a.75.75 0 0 1 1.5 0v1.5a.75.75 0 0 1-.75.75ZM5.106 17.834a.75.75 0 0 0 1.06 1.06l1.06-1.06a.75.75 0 1 0-1.06-1.06l-1.06 1.06ZM4.5 12a.75.75 0 0 1-.75.75H2.25a.75.75 0 0 1 0-1.5H3.75a.75.75 0 0 1 .75.75ZM6.166 5.106a.75.75 0 0 0-1.06 1.06l1.06 1.06a.75.75 0 0 0 1.06-1.06l-1.06-1.06Z" />
        </svg>
        <h1 className="text-xl font-bold text-white">AI Merch Mockup Generator</h1>
      </div>
    </header>
  );
};

export default Header;
