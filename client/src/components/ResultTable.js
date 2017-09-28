import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {withStyles} from 'material-ui/styles';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  }
});

const getRowStyle = (row) => {
  if (row.transaction.status === 'Makulerad') {
    return {textDecoration: 'line-through'};
  }
  return {};
};

const ResultTable = ({data, classes}) => (
  <Paper className={classes.paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Report Date</TableCell>
          <TableCell>Transaction Date</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Issuer</TableCell>
          <TableCell>Role</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Volume</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(row => {
          return (
            <TableRow key={row.id} style={getRowStyle(row)}>
              <TableCell>{moment(row.date).format('LL')}</TableCell>
              <TableCell>{moment(row.transaction.date).format('LL')}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.issuer}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.transaction.type}</TableCell>
              <TableCell>{row.transaction.volume}</TableCell>
              <TableCell>{row.transaction.price}</TableCell>
              <TableCell>{row.transaction.status}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </Paper>
);

ResultTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
ResultTable.defaultProps = {};

export default withStyles(styles)(ResultTable);
