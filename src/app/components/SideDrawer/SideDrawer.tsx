'use client';

import { useState, useEffect } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

const SideDrawer = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  interface Item {
    label: string
    icon?: unknown
    route?: string 
  }

  interface MenuItemProps {
    title: string
    items: Item[]
  }

  const menuItems: MenuItemProps[] = [
    {
      title: "Menü",
      items: [
        { label: "Főoldal", icon: "🏠", route: "/" },
        { label: "Felfedezés", icon: "🔍" },
        { label: "Naptár", icon: "📅" },
        { label: "Piactér", icon: "🛒" },
        { label: "Értesítések", icon: "🔔" },
        { label: "Wiki", icon: "🔔", route: "wiki" },
      ],
    },
    {
      title: "Könyvtár",
      items: [
        { label: "Képregényeim", icon: "📚" },
        { label: "Kívánságlista", icon: "📝" },
        { label: "Eladó képregényeim", icon: "📤" },
        { label: "Képregény feltöltése", icon: "📥", route: "comics/new" },
      ],
    },
    {
      title: "Beállítások",
      items: [
        { label: "Fiókom", icon: "👤" },
        { label: "Feltöltéseim", icon: "📂" },
        { label: "Kijelentkezés", icon: "🚪" },
      ],
    },
  ];

  return (
    <>
      <div
        className={`top-0 left-0 h-full ${
          isOpen ? 'w-64' : 'w-32'
        } bg-[#393b6f] transition-all duration-300`}
      >
        <button
          onClick={toggleDrawer}
          className="text-white p-2"
          aria-label="Toggle Drawer"
        >
          {isOpen ? '❌' : '☰'}
        </button>
        <nav className="mt-4 text-[#d0d0dc]">
          {menuItems.map((menu) => (
            <div key={menu.title} className="mb-6">
              <h2 className="text-lg font-bold pl-4">{menu.title}</h2>
              <ul className="mt-2 space-y-2">
                {menu.items.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center p-2 hover:bg-[#625dee] transition-colors rounded-md cursor-pointer"
                  >
                    <Link href={`/${item.route}`} className="flex items-center p-2 bg-[#625dee] rounded-md">
                      <span className="text-xl pl-4">{item.icon}</span>
                      <span
                        className={`ml-4 flex-1 ${
                          isOpen ? 'block' : 'hidden'
                        }`}
                      >
                        {item.label}
                      </span>
                      {isOpen && (
                        <ChevronRightIcon className="h-5 w-5 text-[#d0d0dc]" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
