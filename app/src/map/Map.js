import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { buildHeatMap, buildMarkers, DEFAULT_MAP_CENTER, NORMAL_PIN_ICON, SELECTED_PIN_ICON } from './map.helper'

const API_KEY = 'PRIVATE_GOOGLE_MAPS_API_KEY'

export function Map(props) {
  const [mapCenter, setMapCenter] = useState(props.center || DEFAULT_MAP_CENTER)
  const [markers, setMarkers] = useState([])
  const [infoWindows, setInfoWindows] = useState([])
  const [map, setMap] = useState()
  const [maps, setMaps] = useState()
  const [heatMap, setHeatMap] = useState()

  const markerClickHandler = (marker) => {
    setMapCenter({ lat: +marker.unit.latitude, lng: +marker.unit.longitude })
  }

  useEffect(() => {
    if( !props.viewHeat || !map || !maps) {
      return
    }

    const newHeatMap = buildHeatMap(map, maps, props.units)

    setHeatMap(newHeatMap)
    return () => newHeatMap && newHeatMap.setMap(null)
  }, [props.viewHeat, props.units])

  useEffect(() => {
    if (!map || !maps) return

    const { markers: newMarkers, infoWindows: newInfoWindows } = buildMarkers(map, maps, props.units, markerClickHandler)

    setMarkers(newMarkers)
    setInfoWindows(newInfoWindows)

    return () => {
      newMarkers.forEach((marker) => {
        marker.setMap(null)
        marker.visible = false
      })
    }
  }, [props.units])

  useEffect(() => {
    if (!props.center) {
      return
    }

    setMapCenter(props.center)

    markers.forEach((marker) => {
      marker.setIcon(NORMAL_PIN_ICON)
      marker.setZIndex(1)
    })

    const markerIndex = markers.findIndex(marker => marker.unit.id === props.center.id)

    if (markerIndex === -1) {
      return
    }

    markers[markerIndex].setIcon(SELECTED_PIN_ICON)
    markers[markerIndex].setZIndex(9999)

    infoWindows.forEach(info => info.close())
    infoWindows[markerIndex].open(map, markers[markerIndex])
  }, [props.center])

  return (
    <GoogleMapReact
      defaultZoom={14}
      defaultCenter={DEFAULT_MAP_CENTER}
      center={mapCenter}
      bootstrapURLKeys={{ key: API_KEY, libraries: ['visualization'] }}
      onGoogleApiLoaded={({ map, maps }) => {
        setMap(map)
        setMaps(maps)
      }}
      heatmapLibrary={props.viewHeat}
      heatmap={props.viewHeat ? heatMap : {}}
      shouldUnregisterMapOnUnmount={true}
    >
    </GoogleMapReact>
  )
}
