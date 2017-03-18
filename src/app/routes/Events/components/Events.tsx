import * as React from 'react';
import { TEventsState } from '../modules/types';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

export type TEventsProps = TEventsState & {
  params: any
};
export type TEventsDispatchProps = {
  push: (args: string) => void
};

export class Events extends React.Component<TEventsProps & TEventsDispatchProps, {}> {
  static propTypes = {
    events: React.PropTypes.array.isRequired,
    loadEvents: React.PropTypes.func.isRequired
  };

  render() {
    const props = this.props;
    const load = (props as any).loadEvents;
    if (load) {
      load();
    }
    const navigateToRow = (id: any) => {
      console.log(props.params, id);
      props.push(props.params && parseInt(props.params.id, 10) === id ? `/events` : `/events/${id}`);
    };

    return <div style={{ margin: '0 auto' }} >
      <h2>Events: {props.events.length}</h2>
      <RaisedButton onTouchTap={() => props.push(`/events/new`)}>Add</RaisedButton>

      <Table onCellClick={(row) => navigateToRow(props.events[row]._id)} selectable={true}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Date</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Points</TableHeaderColumn>
            <TableHeaderColumn>Distance</TableHeaderColumn>
            <TableHeaderColumn>Elevation</TableHeaderColumn>
            <TableHeaderColumn>Participants</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.events.map(p => <TableRow key={p._id}>
            <TableRowColumn>{p.date.toLocaleString()}</TableRowColumn>
            <TableRowColumn>{p.name}</TableRowColumn>
            <TableRowColumn>{p.points}</TableRowColumn>
            <TableRowColumn>{p.distance}</TableRowColumn>
            <TableRowColumn>{p.elevation}</TableRowColumn>
            <TableRowColumn>{p.participants.length}</TableRowColumn>
          </TableRow>)}
        </TableBody>
      </Table>

      <Drawer width={600} openSecondary={true} open={props.children ? true : false} overlayStyle={{ paddingTop: '64px' }}>
        {props.children}
      </Drawer>
    </div>;
  }
}
