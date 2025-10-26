import React from 'react';
import { NavLink } from 'react-router-dom';
import { Role } from '../../types';
import { SIDEBAR_LINKS } from '../../constants';

const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;
const ChevronLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>;

interface SidebarProps {
  role: Role;
  isCollapsed: boolean;
  setCollapsed: (isCollapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, isCollapsed, setCollapsed }) => {
  const links = SIDEBAR_LINKS[role] || [];

  return (
    <aside className={`flex-shrink-0 bg-secondary transition-all duration-300 ease-in-out hidden md:block ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex flex-col h-full">
        <div className={`h-16 flex items-center border-b border-gray-700 ${isCollapsed ? 'justify-center' : 'justify-between px-4'}`}>
          {!isCollapsed && <h1 className="text-xl font-bold text-primary whitespace-nowrap">Vidhyathri Tantra</h1>}
          <button onClick={() => setCollapsed(!isCollapsed)} className="p-2 rounded-md hover:bg-gray-700">
            {isCollapsed ? <MenuIcon /> : <ChevronLeftIcon />}
          </button>
        </div>
        <nav className="flex-1 p-2 space-y-2">
          {links.map((link) => (
            <li key={link.name} className="list-none">
              <NavLink
                to={link.path}
                end
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-colors duration-200 group relative ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:bg-gray-700 hover:text-text-primary'
                  } ${isCollapsed ? 'justify-center' : ''}`
                }
              >
                <span className="text-2xl">{link.icon}</span>
                {!isCollapsed && <span className="ml-4 font-medium">{link.name}</span>}
                {isCollapsed && (
                   <span className="absolute left-full ml-4 w-auto p-2 min-w-max rounded-md shadow-md text-white bg-gray-800 text-xs font-bold transition-all duration-100 scale-0 group-hover:scale-100 origin-left">
                    {link.name}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;