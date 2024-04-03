'use client';
import Avatar from '@mui/material/Avatar';
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { logoutHandle } from '../action';
import Link from 'next/link';

export default function BasicMenu({
  userId,
  name,
  permission,
}: {
  userId: string;
  name: string;
  permission: string;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <button
        id="basic-button"
        // aria-controls={open ? 'basic-menu' : undefined}
        // aria-haspopup="true"
        // aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar sx={{ bgcolor: 'rgb(210,210,210)' }}>B</Avatar>
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl} //popover 위치
        open={open}
        onClose={handleClose}
        // MenuListProps={{
        //   'aria-labelledby': 'basic-button',
        // }}
      >
        <div className="flex font-sans flex-row rounded-md border-gray-400 border-2 ml-[5px] mr-[5px] gap-[40px] p-[5px]">
          <div className="w-[180px]">
            <p className="font-bold text-[20px]">{userId}</p>
            <p className="text-gray-500 ml-[6px]">{name}</p>
          </div>
          <span className="text-gray-400 text-center text-[15px] self-center p-[5px] rounded-full bg-gray-200">
            {permission}
          </span>
        </div>
        <MenuItem onClick={handleClose}>
          <Link href={`/mypage/${userId}`}>my page</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <form action={logoutHandle}>
            <button type="submit">log out</button>
          </form>
        </MenuItem>
      </Menu>
    </div>
  );
}
