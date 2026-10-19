import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../redux/slices/authSlice";
import UserAvatar from "./UserAvatar";
import NotificationPanel from "./NotificationPanel";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // press Enter to search task titles
  const searchHandler = (e) => {
    e.preventDefault();
    navigate(search.trim() ? `/tasks?q=${encodeURIComponent(search.trim())}` : "/tasks");
  };

  return (
    <div className='flex justify-between items-center bg-white px-4 py-3 2xl:py-4 sticky z-10 top-0'>
      <div className='flex gap-4'>
        <button
          onClick={() => dispatch(setOpenSidebar(true))}
          className='text-2xl text-gray-500 block md:hidden'
        >
          ☰
        </button>

        <form
          onSubmit={searchHandler}
          className='w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6]'
        >
          <MdOutlineSearch className='text-gray-500 text-xl' />

          <input
            type='text'
            placeholder='Search tasks...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800'
          />
        </form>
      </div>

      <div className='flex gap-2 items-center'>
        <NotificationPanel />

        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;
