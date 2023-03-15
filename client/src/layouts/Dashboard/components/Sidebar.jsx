import { useState } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Avatar, Box, Divider, IconButton, Typography, useMediaQuery } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaidIcon from '@mui/icons-material/Paid';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import { hexToRgba } from "../../../helpers";
import { useDispatch } from "react-redux";
import { setLogout } from "../../../redux/features/authSlice";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const colors = tokens();
  
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
      rootStyles={{
        position: 'relative',
        backgroundColor: selected === title && colors.white,
        color: selected === title && colors.primary,
        // borderLeft: selected === title && `2conpx solid ${colors.greenAccent}`,
        ...(selected === title && {
          '&::after, &::before': {
            content: '""',
            position: 'absolute',
            top: '-50px',
            right: 0,
            height: '50px',
            width: '20px',
            borderRadius: '0 0 25px 0',
            zIndex: -1,
          },
          '&::before': {
            top: 'auto',
            borderRadius: '0 25px 0 0',
            bottom: '-50px',
            boxShadow: `0 -25px 0 0 ${colors.white}`
          },
          '&::after': {
            boxShadow: `0 25px 0 0 ${colors.white}`
          },
        })
      }}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const colors = tokens();
  const isMobil = useMediaQuery('(max-width:600px)');
  const {pathname} = useLocation();
  const { collapseSidebar, collapsed } = useProSidebar();
  const [selected, setSelected] = useState('Dashboard');

  const menuItemStyles = {
    // root: {
    //   fontSize: '13px',
    //   fontWeight: 400,
    // },
    SubMenuExpandIcon: {
      color: '#b6b7b9',
    },
    subMenuContent: ({ level }) => ({
      // backgroundColor:
      //   level === 0
      //     ? hexToRgba(colors.primary, !collapsed ? 0 : 1)
      //     : 'transparent',
    }),
    button: ({ level, active, disabled }) => (
      {
        color: active && `${colors.primary} !important`,
        backgroundColor: 'transparent',
        '&:hover': {
          color: `${!active && colors.greenAccent} !important`,
          backgroundColor: 'transparent'
        }
      }
    ),
    // label: ({ open }) => ({
    //   fontWeight: open ? 600 : undefined,
    // }),
  };
  const handleLogout = () =>{
    dispatch(setLogout());
    navigate('login');
  }

  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 1000,
      }}
    >
      <ProSidebar
        backgroundColor={hexToRgba(colors.primary, 0.8)}
        image='bg.svg'
        rootStyles={{
          border: 'none',
          color: colors.white,
          position: 'relative'
        }}
      >
        <Menu iconShape="square" menuItemStyles={menuItemStyles}>
          {/* LOGO AND MENU ICON */}
          <MenuItem
            icon={collapsed && (
              <MenuOutlinedIcon 
                onClick={() => collapseSidebar(!collapsed)}
                sx={{cursor: 'pointer'}}
              />
            )}
            style={{
              margin: '15px 0',
              color: colors.white,
              cursor: 'default',
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h3" color={colors.white}>
                  School
                </Typography>
                {!isMobil && (
                  <IconButton 
                    onClick={() => collapseSidebar(!collapsed)}
                    sx={{color: colors.white, cursor: 'pointer'}}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
              </Box>
            )}
          </MenuItem>

          {!collapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Avatar 
                    sx={{ bgcolor: colors.secondary, color: colors.primary }}
                >JM</Avatar>
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colors.white}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Jhon Klein
                </Typography>
                <Typography variant="span" color={colors.secondary}>
                  Student
                </Typography>
              </Box>
            </Box>
          )}

            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Schedule"
              to="/schedule"
              icon={<CalendarMonthIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Courses"
              to="/courses"
              icon={<AutoAwesomeMotionIcon />}
              selected={selected}
              setSelected={setSelected}                
            />
            <Item
              title="Events"
              to="/events"
              icon={<EventIcon />}
              selected={selected}
              setSelected={setSelected}                
            />
            <Item
              title="Transactions"
              to="/transactions"
              icon={<PaidIcon />}
              selected={selected}
              setSelected={setSelected}                
            />
            <Item
              title="Account"
              to="/account"
              icon={<AccountCircleIcon />}
              selected={selected}
              setSelected={setSelected}                
            />
            <Box position='absolute' bottom='0' sx={{ boxShadow: `0 -4px 6px ${colors.primary}`, width: '100%' }}>
              <Divider />
              <MenuItem
                icon={<LogoutIcon />}
                onClick={handleLogout}
              >
                <Typography>Log out</Typography>
              </MenuItem>
            </Box>

            {/* <SubMenu
              label='Courses'
              icon={<AutoAwesomeMotionIcon />}
            >
              <Item
                title="Evaluations"
                to="/projects"
                selected={selected}
                setSelected={setSelected}                
              />
              <Item
                title="Classes"
                to="/projects"
                selected={selected}
                setSelected={setSelected}                
              />
            </SubMenu> */}

            {/* <Typography
              variant="h6"
              color={colors.white}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Users
            </Typography>
            <Item
              title="Clients"
              to="/clients"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;