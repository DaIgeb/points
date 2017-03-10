import * as React from 'react';
import { browserHistory } from 'react-router';
import { TEventsState } from '../modules/types';
import RaisedButton from 'material-ui/RaisedButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

export class Events extends React.Component<TEventsState, {}> {
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
    return <div style={{ margin: '0 auto' }} >
      <h2>Counter: {props.events.length}</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Date</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Points</TableHeaderColumn>
            <TableHeaderColumn>Distance</TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.events.map(p => <TableRow key={p.id}>
            <TableRowColumn>{p.date.toLocaleString()}</TableRowColumn>
            <TableRowColumn>{p.name}</TableRowColumn>
            <TableRowColumn>{p.points}</TableRowColumn>
            <TableRowColumn>{p.distance}</TableRowColumn>
            <TableRowColumn>{p.participants.length}</TableRowColumn>
            <TableRowColumn><RaisedButton onTouchTap={() => browserHistory.push(`/events/${p.id}`)}>Details</RaisedButton></TableRowColumn>
          </TableRow>)}
          <TableRow selectable={false}>
            <TableRowColumn colSpan={5}></TableRowColumn>
            <TableRowColumn><RaisedButton onTouchTap={() => browserHistory.push(`/events/new`)}>Add</RaisedButton></TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>

      {props.children}
    </div>;
  }
}
