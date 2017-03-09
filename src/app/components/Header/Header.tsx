import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { IndexLink, Link } from 'react-router';
import './Header.scss';

export class Header extends React.Component<{}, { open: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = { open: false };
  }

  handleToggle = () => this.setState({ open: !this.state.open });
  handleClose = () => this.setState({ open: false });

  render() {
    return <div>
      <AppBar title='React Redux Starter Kit' onTitleTouchTap={this.handleToggle} onLeftIconButtonTouchTap={this.handleToggle} />
      <Drawer open={this.state.open} docked={false}
        width={200}
        onRequestChange={(open) => this.setState({ open })}>
        <MenuItem onTouchTap={this.handleClose} containerElement={<IndexLink to='/' activeClassName='route--active'>Home</IndexLink>}>Home</MenuItem>
        <MenuItem onTouchTap={this.handleClose} containerElement={<Link to='/counter' activeClassName='route--active'>Counter</Link>}>Counter</MenuItem>
        <MenuItem onTouchTap={this.handleClose} containerElement={<Link to='/points' activeClassName='route--active'>Points</Link>}>Points</MenuItem>
        <MenuItem onTouchTap={this.handleClose} containerElement={<Link to='/event' activeClassName='route--active'>Event</Link>}>Event</MenuItem>
        <MenuItem onTouchTap={this.handleClose} containerElement={<Link to='/events' activeClassName='route--active'>Events</Link>}>Events</MenuItem>
      </Drawer>
    </div>;
  }
}
