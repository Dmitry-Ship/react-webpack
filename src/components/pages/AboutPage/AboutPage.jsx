import React from 'react';

import Heading from '../../basic/Heading';
import { card, logo, page } from './AboutPage.scss';

const AboutPage = () => (
  <div className={page} >
    <div className={card}>
      <Heading>Here is the list of technologies I was using during writing this app</Heading>
      <img className={logo} src="/logos/nodejs-icon.svg" alt="" />
      <img className={logo} src="/logos/react.svg" alt="" />
      <img className={logo} src="/logos/sass-1.svg" alt="" />
      <img className={logo} src="/logos/github-icon-1.svg" alt="" />
      <img className={logo} src="/logos/webpack.svg" alt="" />
      <img className={logo} src="/logos/redux.svg" alt="" />
      <img className={logo} src="/logos/mongodb.svg" alt="" />
      <img className={logo} src="/logos/express-109.svg" alt="" />
      <img className={logo} src="/logos/npm.svg" alt="" />
      <img className={logo} src="/logos/es6.svg" alt="" />
      <img className={logo} src="/logos/babel-10.svg" alt="" />
      <img className={logo} src="/logos/css-modules-logo.png" alt="" />
      <img className={logo} src="/logos/postcss.svg" alt="" />
    </div>
  </div>
);

export default AboutPage;
