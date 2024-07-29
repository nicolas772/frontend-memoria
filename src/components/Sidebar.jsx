import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent
} from 'react-pro-sidebar';
import {
  FaUser,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaTachometerAlt,
  FaGem,
  FaList,
  FaRegLaughWink,
  FaHeart,
  FaHome,
  FaSignOutAlt,
  FaBell,
} from 'react-icons/fa';
import { IoCreateSharp } from "react-icons/io5";
import AuthService from '../services/auth.service';
import sidebarBg from '../assets/bg1.jpg';
import sidebarBgTester from '../assets/bg3.jpg'
import sidebarBgUser from '../assets/bg5.jpg'
import '../css/styles.scss'
import LogoutModal from './LogoutModal';
import { useDemoUser } from '../hooks/useDemoUser';

const Sidebar = ({ collapsed, toggled, handleToggleSidebar, handleCollapsedChange, user }) => {
  const [showTesterBoard, setShowTesterBoard] = useState(false);
  const [showUserBoard, setShowUserBoard] = useState(false);
  const {clearDemoUser} = useDemoUser()
  let navigate = useNavigate()
  let username = user.username

  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const handleShowLogoutModal = () => setShowLogoutModal(true)
  const handleCloseLogoutModal = () => setShowLogoutModal(false)


  const logOut = () => {
    setShowLogoutModal(false);
    AuthService.logout();
    clearDemoUser()
    navigate("/login")
  };

  useEffect(() => {
    setShowUserBoard(user.roles.includes("ROLE_USER"));
    setShowTesterBoard(user.roles.includes("ROLE_TESTER"));
  }, []);

  return (
    <>
      <ProSidebar
        image={sidebarBgTester}
        collapsed={collapsed}
        toggled={toggled}
        onToggle={handleToggleSidebar}
        breakPoint="md"
      >
        {/* Header */}
        <SidebarHeader>
          <Menu iconShape="circle">
            {collapsed ? (
              <MenuItem
                icon={<FaAngleDoubleRight />}
                onClick={handleCollapsedChange}
              ></MenuItem>
            ) : (
              <MenuItem
                suffix={<FaAngleDoubleLeft />}
                onClick={handleCollapsedChange}
              >
                <div
                  style={{
                    padding: '9px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    fontSize: 18,
                    letterSpacing: '1px'
                  }}
                >
                  Feel UX
                </div>
                {showTesterBoard && (
                  <div
                    style={{
                      textTransform: 'uppercase',
                      paddingLeft: '9px',
                      fontSize: 10,
                      letterSpacing: '1px'
                    }}
                  >
                    Tester
                  </div>
                )}
                {showUserBoard && (
                  <div
                    style={{
                      textTransform: 'uppercase',
                      paddingLeft: '9px',
                      fontSize: 10,
                      letterSpacing: '1px'
                    }}
                  >
                    User
                  </div>
                )}
              </MenuItem>
            )}
          </Menu>
        </SidebarHeader>
        {/* Content */}
        <SidebarContent>
          {showTesterBoard && (
            <Menu iconShape="circle">
              <MenuItem icon={<FaHome />}>
                Home Tester<Link to="/homeTester" />
              </MenuItem>
              <SubMenu
                title={'Crear'}
                icon={<IoCreateSharp />}
              >
                <MenuItem>Nuevo Estudio <Link to="/create-study" /></MenuItem>
                <MenuItem>Nueva Iteración <Link to="/create-iteration" /></MenuItem>
                <MenuItem>Nueva Tarea <Link to="/create-task" /></MenuItem>
              </SubMenu>
              {/* <MenuItem icon={<FaGem />}>Components </MenuItem> */}
              <MenuItem icon={<FaList />}>
                Mis Estudios <Link to="/studies" />
              </MenuItem>
              <MenuItem icon={<FaSignOutAlt />} onClick={handleShowLogoutModal}>
                Cerrar Sesión
              </MenuItem>
            </Menu>
          )}
          {showUserBoard && (
            <Menu iconShape="circle">
              <MenuItem icon={<FaHome />}>
                Home User <Link to="/homeUser" />
              </MenuItem>
              <SubMenu
                title={'Estudios'}
                icon={<FaList />}
              >
                <MenuItem>Activos</MenuItem>
                <MenuItem>Finalizados</MenuItem>
              </SubMenu>
              <MenuItem
                icon={<FaBell />}
                prefix={<span className="badge yellow">3</span>}
              >
                Invitaciones
                <NavLink to="/boardUser" />
              </MenuItem>
              <MenuItem icon={<FaSignOutAlt />} onClick={handleShowLogoutModal}>
                Cerrar Sesión
              </MenuItem>
            </Menu>
          )}
        </SidebarContent>
        {/* Footer */}
        <SidebarFooter style={{ textAlign: 'center' }}>
          <div className="sidebar-btn-wrapper" style={{ padding: '16px' }}>
            <Link
              className="sidebar-btn"
              style={{ cursor: 'pointer' }}
              to="/profile"
            >
              <FaUser />
              <span>@{username}</span>
            </Link>
          </div>
        </SidebarFooter>
      </ProSidebar>
      <LogoutModal
        show={showLogoutModal}
        handleClose={handleCloseLogoutModal}
        handleLogout={logOut}
      />
    </>
  );
};

export default Sidebar;
