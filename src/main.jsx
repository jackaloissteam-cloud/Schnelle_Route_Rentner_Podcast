import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'

function App() {
  const [startTime, setStartTime] = useState('09:00')
  const [routeText, setRouteText] = useState('Hanau\nFrankfurt\nMainz\nWiesbaden\nMainz')
  const stopMinutes = 15

  const places = routeText
    .split('\n')
    .map(x => x.trim())
    .filter(Boolean)

  function addMinutes(time, mins) {
    const [h, m] = time.split(':').map(Number)
    const date = new Date()
    date.setHours(h, m + mins, 0, 0)
    return date.toTimeString().slice(0, 5)
  }

  let currentTime = startTime
  const schedule = places.map((place, index) => {
    const arrival = currentTime
    const departure = index === places.length - 1 ? '' : addMinutes(arrival, stopMinutes)
    currentTime = departure || arrival

    return {
      place,
      arrival,
      departure,
      stop: index === places.length - 1 ? 0 : stopMinutes,
    }
  })

  const totalStopTime = Math.max(0, places.length - 1) * stopMinutes

  return (
    <div style={{
      minHeight: '100vh',
      padding: '30px',
      fontFamily: 'Arial, sans-serif',
      background: '#f4f6f8',
      color: '#222'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '18px',
        padding: '28px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.12)'
      }}>
        <h1 style={{ color: '#0070f3', marginBottom: 5 }}>
          📍 Route VPT Jedi Drude V5.4
        </h1>

        <h2 style={{ marginTop: 0 }}>
          RentnerPodcast Routenplaner
        </h2>

        <label>
          Startzeit:
          <input
            type="time"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
            style={{
              marginLeft: 10,
              padding: 8,
              fontSize: 16
            }}
          />
        </label>

        <p><b>Zielpunkte:</b> je ein Ort pro Zeile</p>

        <textarea
          value={routeText}
          onChange={e => setRouteText(e.target.value)}
          rows={8}
          style={{
            width: '100%',
            padding: 12,
            fontSize: 16,
            borderRadius: 10,
            border: '1px solid #ccc'
          }}
        />

        <h3>Kurzübersicht</h3>

        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: 15
        }}>
          <thead>
            <tr style={{ background: '#eef3ff' }}>
              <th style={cell}>Nr.</th>
              <th style={cell}>Ort</th>
              <th style={cell}>Ankunft</th>
              <th style={cell}>Aufenthalt</th>
              <th style={cell}>Abfahrt</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((row, i) => (
              <tr key={i}>
                <td style={cell}>{i + 1}</td>
                <td style={cell}>{row.place}</td>
                <td style={cell}>{row.arrival}</td>
                <td style={cell}>{row.stop ? `${row.stop} Min.` : 'Ende'}</td>
                <td style={cell}>{row.departure || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{
          marginTop: 25,
          padding: 18,
          borderRadius: 12,
          background: '#f1f7f1'
        }}>
          <p><b>Anzahl Zielpunkte:</b> {places.length}</p>
          <p><b>Aufenthalte:</b> {Math.max(0, places.length - 1)} × 15 Minuten</p>
          <p><b>Gesamte Aufenthaltszeit:</b> {totalStopTime} Minuten</p>
        </div>

        <p style={{ marginTop: 25, color: '#666' }}>
          Keine Koordinatenanzeige. Keine Hektik. Nur Rentnerlogistik mit Haltung.
        </p>
      </div>
    </div>
  )
}

const cell = {
  border: '1px solid #ddd',
  padding: '10px',
  textAlign: 'left'
}

createRoot(document.getElementById('root')).render(<App />)