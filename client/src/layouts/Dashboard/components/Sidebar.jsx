import { useState } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Avatar, Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
// import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import { hexToRgba } from "../../../helpers";

const colors = tokens();

const Item = ({ title, to, icon, selected, setSelected, ...props }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
      {...props}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};



const Sidebar = () => {
  const [selected, setSelected] = useState("Dashboard");
  const { collapseSidebar, collapsed } = useProSidebar();
  const isMobil = useMediaQuery('(max-width:600px)');

  const menuItemStyles = {
    // root: {
    //   fontSize: '13px',
    //   fontWeight: 400,
    // },
    SubMenuExpandIcon: {
      color: '#b6b7b9',
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(colors.primary, !collapsed ? 0 : 1)
          : 'transparent',
    }),
    button: ({ level, active, disabled }) => (
      {
        color: active && `${colors.secondary} !important`,
        backgroundColor: 'transparent',
        '&:hover': {
          color: `${colors.secondary} !important`,
          backgroundColor: 'transparent'
        }
      }
    ),
    // label: ({ open }) => ({
    //   fontWeight: open ? 600 : undefined,
    // }),
  };

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
          color: colors.white
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
                title="Evaluations"
                to="/evaluations"
                icon={<ContentPasteSearchIcon />}
                selected={selected}
                setSelected={setSelected}                
              />
            <Item
              title="Classes"
              to="/classes"
              icon={<AutoAwesomeMotionIcon />}
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