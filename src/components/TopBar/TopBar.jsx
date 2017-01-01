import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { topBar, logo } from './TopBar.styl';

import Row from '../basic/Row';
import NavBar from '../basic/NavBar';
import Heading from '../basic/Heading';

const TopBar = ({ appName, navBarItems }) => (
  <Row align={'space-between'} className={topBar} >
    <Heading size={2}>
      <Link className={logo} to="/" >{appName}</Link>
    </Heading>

    <NavBar items={navBarItems}>
      {/* <SideMenuContainer  />
      <ProfileContainer /> */}
    </NavBar>
  </Row>
);

export default TopBar;

TopBar.propTypes = {
  appName: PropTypes.string.isRequired,
  navBarItems: PropTypes.arrayOf(PropTypes.object),

};