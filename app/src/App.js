import { useEffect, useState } from 'react';
import './App.css';
import { Map } from './map/Map'
import { UnitTable } from './unit-table/UnitTable';
import { CircularProgress } from '@material-ui/core';
import { UnitsService } from './services/units.service';

function App() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)
  const [pagination, setPagination] = useState({ data: [] })
  const [loading, setLoading] = useState(true)
  const [mapCenter, setMapCenter] = useState()
  const [viewHeat, setViewHeat] = useState(false)
  const [cityFilter, setCityFilter] = useState()

  useEffect(() => {
    setLoading(true)

    const filter = cityFilter? `city||$eq||${cityFilter}`: undefined

    UnitsService
      .fetchUnits(page, limit, filter)
      .then((unitsPagination) => {
        setPagination(unitsPagination)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => setLoading(false))
  }, [page, limit, cityFilter])

  const unitRowClickHandler = (row) => {
    window.scrollTo({top: 0, behavior: 'smooth'})

    setMapCenter({ lat: +row.latitude, lng: +row.longitude, id: row.id })
  }

  const updatePropertyInterest = (id, value) => {
    UnitsService
      .updatePropertyInterest(id, value)
      .then((updatedProperty) => {
        const oldProperty = pagination.data.find(property => property.id === id)
        oldProperty.interest = updatedProperty.interest
        setPagination({...pagination})
        console.log('new property', updatedProperty)
      })
      .catch((error) => {
        console.error(error)
      })
      
  }

  return (
    <div className="App">
      <div className='map-container'>
        <Map key={pagination} units={pagination.data} center={mapCenter} viewHeat={viewHeat} />
      </div>
      <div className='units-container'>
        {loading && <CircularProgress />}
        {!loading && <UnitTable
          toggleViewHeat={() => setViewHeat((currentValue) => !currentValue)}
          rows={pagination.data}
          rowClickHandler={unitRowClickHandler}
          rowsPerPage={limit}
          page={page}
          totalRows={pagination.total}
          onPageChange={(_, newPage) => setPage(newPage + 1)}
          onRowsPerPageChange={(event) => setLimit(+event.target.value)}
          cityFilterHandler={(value) => setCityFilter(value)}
          cityFilter={cityFilter}
          interestHandler={(id, value) => updatePropertyInterest(id, value)}
        />}
      </div>
    </div>
  );
}

export default App;
