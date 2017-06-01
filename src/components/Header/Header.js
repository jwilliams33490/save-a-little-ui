/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.scss';
import Link from '../Link';
import Navigation from '../Navigation';
import EditorAttachMoney from 'material-ui/svg-icons/editor/attach-money';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

function Header() {
  const muiTheme= getMuiTheme();
  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div className={s.root}>
      <div className={s.container}>
        <Navigation className={s.nav} />
        <Link className={s.brand} to="/">
        <EditorAttachMoney style={{width:"30px", height:"30px", marginTop:"-6px"}} color={muiTheme.palette.accent1Color} />
          <span className={s.brandTxt}>Williams Enterprises</span>
        </Link>
        <div className={s.banner}>
          <h1 className={s.bannerTitle}>Save A Little</h1>
          <p className={s.bannerDesc}>money and mobile mindfulness</p>
        </div>
      </div>
    </div>
    </MuiThemeProvider>
  );
}
//<i class="material-icons">attach_money</i>
//<img src={require('./logo-small.png')} alt="React" />
export default withStyles(Header, s);
