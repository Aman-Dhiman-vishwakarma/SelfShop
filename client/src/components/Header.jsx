import { Fragment, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setCurrentUser } from '../redux/authSlice'
import { toast } from 'react-toastify'
import Search from './Search'
import { setvalues } from '../redux/sectionFilterSlice'
import { titleCase } from '../lib/capitalcase'

const navigation = {
  categories: [
  ],
  pages: [
    { name: 'About Us', href: '/aboutus' },
    { name: 'Admin', href: '/admin' },
    { name: 'Collection', href: '/allproducts' },
  ],
}

const Header = () => {
  const [open, setOpen] = useState(false)
  const {currentUser} = useSelector((store)=>store.auth);
  const { cart } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const naviget = useNavigate();
  
  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/auth/signout")
      if (res.data.success) {
        dispatch(setCurrentUser(null))
        naviget("/")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation?.categories?.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-900 data-selected:border-indigo-600 data-selected:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel key={category.name} className="space-y-10 px-4 pt-10 pb-8">
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <img
                            alt={item.imageAlt}
                            src={item.imageSrc}
                            className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                          />
                          <a href={item.href} className="mt-6 block font-medium text-gray-900">
                            <span aria-hidden="true" className="absolute inset-0 z-10" />
                            {item.name}
                          </a>
                          <p aria-hidden="true" className="mt-1">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <a href={item.href} className="-m-2 block p-2 text-gray-500">
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <Link to="/signin" className="-m-2 block p-2 font-medium text-gray-900">
                  Sign in
                </Link>
              </div>
              <div className="flow-root">
                <Link to="/signup" className="-m-2 block p-2 font-medium text-gray-900">
                  Create account
                </Link>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6">
              <a href="https://en.wikipedia.org/wiki/India" className="-m-2 flex items-center p-2">
                <img
                  alt=""
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
                  className="block h-auto w-5 shrink-0"
                />
                <span className="ml-3 block text-base font-medium text-gray-900">IND</span>
                <span className="sr-only">, change currency</span>
              </a>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">

        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex items-center lg:ml-0">
                <Link to="/" className='text-xl font-bold shadow-md border-[1px] border-gray-100 px-3 py-2 rounded-md'>
                  Self<span className='text-red-600 ml-[1px]'>Shop</span>
                </Link>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.pages.map((page) => (
                    <Link
                    onClick={()=>{(page.name === "Collection") && dispatch(setvalues({top:null, second:null, third:null}))}}
                      key={page.name}
                      to={page.href}
                      className={` ${((!currentUser || !currentUser.isAdmin) && page.name === "Admin") ? "hidden" : (currentUser?.isAdmin && page.name === "About Us") ? "hidden" : ""} flex items-center text-sm font-medium text-gray-700 hover:text-gray-800`}
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </PopoverGroup>

               {/* Search */}

              <Search />

              <div className="ml-auto flex items-center">
               {currentUser ? <div className="">
                <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-red-500 shadow-md text-sm">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <div
                    className="size-10 flex text-white justify-center items-center font-semibold text-2xl rounded-full"
                  >{currentUser?.fullname[0].toUpperCase()}</div>
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md p-3 bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <div className="p-1">
                  <h2 className='font-semibold text-lg text-red-700'>{titleCase(currentUser?.fullname)}</h2>
                  <p className='text-xs text-nowrap font-medium mt-1'>To accaess Your SelfShop Account</p>

                </div>
                <MenuItem>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-base hover:bg-red-500 font-semibold cursor-pointer rounded-md hover:text-white text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Your Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-base border-y-[1px] border-gray-300 hover:bg-red-500 curs font-semibold hover:rounded-md hover:text-white text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Your Orders
                  </Link>
                </MenuItem>
                <MenuItem>
                  <li
                    onClick={handleLogout}
                    className="block px-4 py-2 mb-1 text-base cursor-pointer rounded-md font-semibold hover:bg-red-500 hover:text-white text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                   Logout
                  </li>
                </MenuItem>
                
              </MenuItems>
            </Menu>
               </div> : <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <NavLink to="/signin" className={({isActive}) => isActive ? "text-sm font-medium text-red-600" : "text-sm font-medium text-gray-700 hover:text-gray-800"}>
                    Sign in
                  </NavLink>
                  <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                  <NavLink to="/signup" className={({isActive}) => isActive ? "text-sm font-medium text-red-600" : "text-sm font-medium text-gray-700 hover:text-gray-800"}>
                    Create account
                  </NavLink>
                </div>}

                <div className="hidden lg:ml-8 lg:flex">
                  <a href="https://en.wikipedia.org/wiki/India" target='blank' className="flex items-center text-gray-700 hover:text-gray-800">
                    <img
                      alt=""
                      src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
                      className="block h-auto w-5 shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">IND</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>

                {/* Search */}
                {/* <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon aria-hidden="true" className="size-6 text-gray-800" />
                  </a>
                </div> */}

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <NavLink to="/cart"  className={({isActive}) => isActive ? "group -m-2 flex items-center p-2 bg-red-50 rounded-lg" : "group -m-2 flex items-center p-2 rounded-lg"}>
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="size-6 shrink-0 text-gray-800 group-hover:text-gray-900"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cart.length != 0 && cart?.length}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Header;