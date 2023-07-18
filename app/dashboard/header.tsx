import { User } from '@supabase/supabase-js';
import React from 'react';

function Header(props: {user: User}) {
  return (
    <header className="bg-gray-800 text-white dark:bg-gray-900 dark:text-white">
      <nav className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">Workout Planner</h1>
        </div>

        <ul className="flex space-x-4">
          <li>
            <a href="/" className="hover:text-gray-300 dark:hover:text-gray-400">Home</a>
          </li>
          <li>
            <a href="/calendar" className="hover:text-gray-300 dark:hover:text-gray-400">Calendar</a>
          </li>
          <li>
            <a href="/workouts" className="hover:text-gray-300 dark:hover:text-gray-400">Workouts</a>
          </li>
          <li>
            <a href="/settings" className="hover:text-gray-300 dark:hover:text-gray-400">Settings</a>
          </li>
          <li className='inline-flex'>
              <div className="ml-4">
                <img
                  src={""}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
              </div>
              <div className="ml-2">
                <p className="text-sm">{props.user.email}</p>
              </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
