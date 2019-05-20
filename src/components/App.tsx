import React from 'react'
import { useQueryString } from '../hooks'

export const App: React.SFC = () => {
  const [radius, setRadius] = useQueryString('radius')

  const r = isNaN(+radius) || +radius < 1
    ? 1
    : +radius

  const r2 = r**2

  const boxes = []
  for (let i = 0; i < r + 1; i++) {
    for (let j = 0; j < r + 1; j++) {
      boxes.push({
        x: i,
        y: j,
        active: ((i)**2 + (j)**2) <= r2
      })
    }
  }

  return (
    <div className='App'>
      <form
        method='GET'
        onSubmit={(e) => {
          e.preventDefault()
        }}
        >
        <label>
          <span>Radius</span>
          <input
            min='0'
            name='radius'
            onChange={(e) => setRadius(e.currentTarget.value)}
            type='number'
            value={radius}
            />
        </label>
      </form>

      <svg
        height='90vmin'
        viewBox={`0 0 ${r + 1} ${r + 1}`}
        width='90vmin'>
        {boxes.map(({x, y, active}) => (
          <rect
            fill={active ? 'blue' : 'transparent'}
            height='1'
            stroke='black'
            strokeWidth='0.01'
            width='1'
            x={x}
            y={y}
            />
        ))}
      </svg>
    </div>
  )
}
