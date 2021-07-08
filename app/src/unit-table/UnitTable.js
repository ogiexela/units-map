import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { Button } from '@material-ui/core';
import { TextField, MenuItem } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import debounce from 'lodash/debounce'

export function UnitTable(props) {

  const rowClickHandler = (row) => {
    if (!props.rowClickHandler) {
      return
    }

    props.rowClickHandler(row)
  }

  const interestHandler = debounce((id, value) => props.interestHandler(id, value), 500)

  const Pagination = () => <TableRow>
    <TableCell colSpan={7}>
      <Box component='div' className='table-controls'>
        <Button variant='contained' onClick={props.toggleViewHeat}>View heat</Button>
        <TextField
          size='small'
          className='city-filter'
          select
          variant="outlined"
          onChange={(e) => props.cityFilterHandler(e.target.value)} value={props.cityFilter}
          label='City Filter'
        >
          <MenuItem value=''>Any</MenuItem>
          <MenuItem value='Toronto'>Toronto</MenuItem>
          <MenuItem value='Montreal'>Montreal</MenuItem>
        </TextField>
        <TablePagination
          className='pagination-controls'
          rowsPerPageOptions={[5, 10, 20, 100, 200, 1000, 5000]}
          component="div"
          count={props.totalRows || 0}
          rowsPerPage={props.rowsPerPage || 0}
          page={(props.page || 1) - 1}
          onPageChange={props.onPageChange}
          onRowsPerPageChange={props.onRowsPerPageChange}
        />
      </Box>
    </TableCell>
  </TableRow>

  return (
    <Table aria-label="property list">
      <TableHead>
        <Pagination />
        <TableRow>
          <TableCell>Property</TableCell>
          <TableCell align="right">Interests</TableCell>
          <TableCell align="right">City</TableCell>
          <TableCell align="right">Country</TableCell>
          <TableCell align="right">Monthly Rate</TableCell>
          <TableCell align="right">Lease Term</TableCell>
          <TableCell align="right">Views</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.rows.map((row) => (
          <TableRow key={row.id} className='unit-table-row' onClick={() => rowClickHandler(row)}>
            <TableCell component="th" scope="row">
              {row.property}
            </TableCell>
            <TableCell align="right">
              <TextField
                variant="outlined"
                type='number'
                onClick={(e) => e.stopPropagation()}
                defaultValue={row.interest}
                size='small'
                onChange={(e) => interestHandler(row.id, +e.target.value)}
              />
            </TableCell>
            <TableCell align="right">{row.city}</TableCell>
            <TableCell align="right">{row.country}</TableCell>
            <TableCell align="right">{row.monthly_rate}</TableCell>
            <TableCell align="right">{row.lease_term_months}</TableCell>
            <TableCell align="right">{row.total_views}</TableCell>
          </TableRow>
        ))}
        <Pagination />
      </TableBody>
    </Table>
  )
}