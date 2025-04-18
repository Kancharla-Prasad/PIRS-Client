import { useContext, useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "About Us", href: "/about", current: false },
  { name: "Report an issue", href: "/issue-report", current: false },
  { name: "Community", href: "/community", current: false },
  { name: "Dashboard", href: "/dashboard", current: false },
];

const navigation2 = [
  { name: "Issues", href: "/admin/issues", current: true }, // Set Issues as current
  { name: "Users", href: "/admin/users", current: false },
  { name: "Statistics", href: "/admin/statistics", current: false },
];

const departmentAdminNavigation = [
  { name: "Issues", href: "/department/issues", current: true },
  { name: "Statistics", href: "/department/dashboard", current: false },
];


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({token}) {
  const navigate = useNavigate();
  const { role, notifications, setNotifications } = useContext(AppContext);

  const location = useLocation();

//  console.log(notifications);

  const handleViewAll = () => {
    navigate("/notifications");
  };

  const updateNavigation = (navItems) => {
    return navItems.map((item) => ({
      ...item,
      current: location.pathname == item.href,
    }));
  };

  const updatedNavigation = updateNavigation(navigation);
  const updatedAdminNavigation = updateNavigation(navigation2);
  const updatedDepartmentAdminNavigation = updateNavigation(departmentAdminNavigation);

 

  // Filter only unread notifications
  const unreadNotifications = notifications.filter((notif) => !notif.isRead);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile Menu Button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
                  {open ? (
                    <XMarkIcon className="block size-6" />
                  ) : (
                    <Bars3Icon className="block size-6" />
                  )}
                </DisclosureButton>
              </div>

              {/* Logo and Navigation Links */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                <div className="flex shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src="https://images.unsplash.com/phothttps://in.images.search.yahoo.com/images/view;_ylt=AwrKAljqwwFoRhY7DAO9HAx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzIxNmRiOGM2NmQyZTM3MjcxNDQ1NTE5OTc0MjQ4ZTk1BGdwb3MDMTM5BGl0A2Jpbmc-?back=https%3A%2F%2Fin.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dpublic%2Bissue%2Breporting%2Bsystem%2Bimages%26type%3DE210IN826G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26nost%3D1%26tab%3Dorganic%26ri%3D139&w=1400&h=490&imgurl=www.durham.ca%2Fen%2Fliving-here%2Fresources%2FImages%2FReport-An-Issue-B.jpg&rurl=https%3A%2F%2Fwww.durham.ca%2Fen%2Fregional-government%2Freport-an-issue.aspx&size=64KB&p=public+issue+reporting+system+images&oid=216db8c66d2e37271445519974248e95&fr2=piv-web&fr=mcafee&tt=Report+an+Issue+-+Region+of+Durham&b=121&ni=21&no=139&ts=&tab=organic&sigr=9HKPHeb5XMAv&sigb=AKctVGVch.9D&sigi=uZYVFahPo_ZX&sigt=pvZz1UZfH8PF&.crumb=K/VDNuThBot&fr=mcafee&fr2=piv-web&type=E210IN826G0o-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-8 w-auto rounded-full"
                  />
                  <span className="ml-6 text-white text-xl font-semibold">PIRS</span>
                </div>
                <div className="hidden sm:flex justify-center space-x-4">
                  {(role === "citizen" || role=="empty" )&&
                    updatedNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white border-2"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  {role === "admin" &&
                    updatedAdminNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white border-2"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                    {role === "dept" &&
                    updatedDepartmentAdminNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white border-2"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                </div>
              </div>

              {!token ? (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 ml-2"
                >
                  Login
                </button>
              ) : (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Notifications */}
                  <Popover className="relative">
                    {({ close }) => (
                      <>
                        <PopoverButton className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white">
                          <BellIcon className="size-6" />
                          {unreadNotifications.length > 0 && (
                            <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                              {unreadNotifications.length}
                            </span>
                          )}
                        </PopoverButton>

                        <PopoverPanel className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0 z-50 w-64 sm:w-80 bg-white shadow-lg rounded-lg p-4">
                          <div className="relative bg-white p-4 rounded-lg shadow">
                            {/* Small arrow indicator */}
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 sm:left-auto sm:right-6 w-4 h-4 rotate-45 bg-white"></div>

                            <h2 className="text-lg font-semibold">Notifications</h2>
                            <div className="mt-2 max-h-60 overflow-y-auto">
                              {unreadNotifications.length > 0 ? (
                                unreadNotifications.map((notification, index) => (
                                  <div key={index} className="p-2 border-b text-gray-700">
                                    <strong className="text-blue-600">{notification.department}</strong>: {notification.message}
                                    <div className="text-xs text-gray-500">
                                    {/* {notification?.timestamp && new Date(notification.timestamp).toLocaleString()} */}
                                    {new Date(notification.timestamp.toDate()).toLocaleString()}
                                   

</div>

                                  </div>
                                ))
                              ) : (
                                <p className="text-gray-500">No new notifications</p>
                              )}
                            </div>
                            <button
                              onClick={() => {
                                handleViewAll(); // Navigate to the notifications page
                                close(); // Close the popover panel
                              }}
                              className="mt-4 block w-full rounded bg-blue-600 py-2 text-center text-white hover:bg-blue-700"
                            >
                              View All
                            </button>
                          </div>
                        </PopoverPanel>
                      </>
                    )}
                  </Popover>

                  {/* Profile Menu */}
                  <Menu as="div" className="relative ml-3">
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-xl  border border-2 px-4 py-1">
                     {role=='citizen' && <span  className="text-white">C</span>}
                     {role=='admin' && <span className="text-white">A</span>}
                     {role=='dept' && <span className="text-white">D</span>}
                    </MenuButton>
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg">
                      <MenuItem>
                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Your Profile
                        </Link>
                      </MenuItem>
                      
                      <MenuItem>
                        <Link to="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Sign out
                        </Link>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Panel */}
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {(role === "citizen" || role==='empty') &&
                updatedNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white border-2"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              {role === "admin" &&
                updatedAdminNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white border-2"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                 {role === "dept" &&
              updatedDepartmentAdminNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white border-2"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}