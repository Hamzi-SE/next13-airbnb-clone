'use client'

import L from 'leaflet'
import { FC } from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
	iconUrl: markerIcon.src,
	iconRetinaUrl: markerIcon2x.src,
	shadowUrl: markerShadow.src,
})

interface MapProps {
	center?: number[]
}

const Map: FC<MapProps> = ({ center }) => {
	return (
		<MapContainer
			center={(center as L.LatLngExpression) || [30.37, 69.34]}
			zoom={center ? 4 : 3}
			scrollWheelZoom={false}
			className='h-[35vh] rounded-lg'>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>

			{center && <Marker position={center as L.LatLngExpression} />}
		</MapContainer>
	)
}

export default Map
