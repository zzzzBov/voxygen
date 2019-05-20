import { useEffect, useState } from 'react'
import querystring from 'querystring'

const qs = querystring.parse(window.location.search.slice(1))

export const useQueryString = (key: string): [string, React.Dispatch<React.SetStateAction<string>>] => {
  let initialValue = qs[key] || ''
  if (typeof initialValue !== 'string') {
    initialValue = initialValue.slice(-1)[0]
  }

  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    const newQS = querystring.stringify({
      ...qs,
      [key]: value
    })

    window.history.replaceState(null, '', `?${newQS}`)
  }, [key, value])

  return [value, setValue]
}
