import * as React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { userManager } from '../../globals';

type TLocalUser = { profile: { name: string }, expired: boolean };
type TProps = { user: TLocalUser | undefined };
class UserComponent extends React.Component<TProps, { open: boolean }> {
  constructor(props: TProps) {
    super(props);
    this.state = { open: false };
  }

  handleToggle = () => this.setState({ open: !this.state.open });
  handleClose = () => this.setState({ open: false });

  render() {
    const { user } = this.props;
    if (user && !user.expired) {

      return <FlatButton label={'Logout ' + this.props.user.profile.name}
        onTouchTap={(event) => {
          event.preventDefault();
          userManager.removeUser();
        }} />;
    }

    return <FlatButton label='Login'
      onTouchTap={(event) => {
        event.preventDefault();
        userManager.signinRedirect();
      }} />;
  }
}

export const User = connect((state) => ({ user: state.oidc.user }), {})(UserComponent);
