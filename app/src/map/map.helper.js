export const DEFAULT_MAP_CENTER = { lat: 43.64611323602017, lng: -79.38057947348284 }
export const NORMAL_PIN_ICON = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
export const SELECTED_PIN_ICON = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'

export const getInfoWindowString = (unit) => `
    <div>
    <h1>${unit.property}</h1>
    <div className='unit-marker-info'>
        <div>${unit.city}, ${unit.country}</div>
        <div>$${unit.monthly_rate} for ${unit.lease_term_months} months</div>
        <div>${unit.total_views} views.</div>
    </div>
    </div>`

export const buildMarkers = (map, maps, units, clickHandler) => {
  const markers = []
  const infoWindows = []

  units.forEach((unit) => {
    const marker = new maps.Marker({
      unit: unit,
      icon: NORMAL_PIN_ICON,
      position: {
        lat: +unit.latitude,
        lng: +unit.longitude,
      },
      map,
    })

    markers.push(marker)

    const infoWindow = new maps.InfoWindow({
      content: getInfoWindowString(unit),
      unit: unit
    })

    infoWindow.addListener('closeclick', () => {
      marker.setZIndex(1)
      marker.setIcon(NORMAL_PIN_ICON)
    })

    infoWindows.push(infoWindow)
  })

  markers.forEach((marker, i) => {
    marker.addListener('click', () => {
      infoWindows.forEach((infoWindow) => infoWindow.close())
      infoWindows[i].open(map, marker)

      markers.forEach((otherMarkers) => {
        otherMarkers.setIcon(NORMAL_PIN_ICON)
        otherMarkers.setZIndex(1)
      })

      marker.setIcon(SELECTED_PIN_ICON)
      marker.setZIndex(99999)
      clickHandler(marker)
    })
  })

  return { markers, infoWindows }
}

export const buildHeatMap = (map, maps, units,) => {
  const heatmap = new maps.visualization.HeatmapLayer({
    data: units.map((unit) => ({ location: new maps.LatLng(+unit.latitude, +unit.longitude), weight: +unit.total_views })),
    map: map,
    radius: 50,
  })

  return heatmap
}