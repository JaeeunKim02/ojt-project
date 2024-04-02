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
        <Avatar sx={{ bgcolor: 'rgb(210,210,210)' }}>J</Avatar>
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
        <div className="flex flex-row m-[20px] items-left justify-center gap-[40px]">
          <div>
            <p className="font-bold text-[20px]">{userId}</p>
            <p>{name}</p>
          </div>
          <p className="text-gray-400 text-[15px]">{permission}</p>
        </div>
        <MenuItem onClick={handleClose}>
          <Link href={`/mypage/${userId}`}>My Page</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <form action={logoutHandle}>
            <button type="submit">Log Out</button>
          </form>
        </MenuItem>
      </Menu>
    </div>
  );
}
