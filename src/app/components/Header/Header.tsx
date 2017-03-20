import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { IndexLink, Link } from 'react-router';
import './Header.scss';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { User } from '../User/User';

type TProps = { push: (path: any) => void };
export class HeaderComponent extends React.Component<TProps, { open: boolean }> {
  constructor(props: TProps) {
    super(props);
    this.state = { open: false };
  }

  handleToggle = () => this.setState({ open: !this.state.open });
  handleClose = () => this.setState({ open: false });

  render() {
    return <div>
      <AppBar title='React Redux Starter Kit'
        onTitleTouchTap={this.handleToggle}
        onLeftIconButtonTouchTap={this.handleToggle}
        iconElementRight={<User  />}
      />
      <Drawer open={this.state.open} docked={false}
        width={200}
        onRequestChange={(open) => this.setState({ open })}>
        <MenuItem onTouchTap={this.handleClose} containerElement={<IndexLink to='/' activeClassName='route--active'>Home</IndexLink>}>Home</MenuItem>
        <MenuItem onTouchTap={this.handleClose} containerElement={<Link to='/points' activeClassName='route--active'>Points</Link>}>Points</MenuItem>
        <MenuItem onTouchTap={this.handleClose} containerElement={<Link to='/events' activeClassName='route--active'>Events</Link>}>Events</MenuItem>
      </Drawer>
    </div>;
  }
}

export const Header = connect(() => ({}), { push })(HeaderComponent);
