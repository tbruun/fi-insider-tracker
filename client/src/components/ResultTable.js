import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
});

const ResultTable = ({data, classes}) => (
  <Paper className={classes.paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Issuer</TableCell>
          <TableCell>Role</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Volume</TableCell>
          <TableCell>Price</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(row => {
          return (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.issuer}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.transaction.type}</TableCell>
              <TableCell>{row.transaction.volume}</TableCell>
              <TableCell>{row.transaction.price}</TableCell>
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
