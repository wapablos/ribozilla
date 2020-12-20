import React, { useState, useEffect } from 'react'

import { ISystemInfo } from '@constants/interfaces'
import { SystemInfoEvents } from '@constants/events'
import getSystemInfo from './internals'

export default function SystemInfo() {
  const [sysinfo, setSysInfo] = useState({} as ISystemInfo)

  useEffect(() => {
    const fetchSysInfo = async () => {
      window.electron.send(SystemInfoEvents.REQUEST)
      const res = await getSystemInfo()
      setSysInfo(res)
    }

    fetchSysInfo()
  }, [])

  return (
    <>
      {Object.entries(sysinfo).map(([key, value]) => (
        <div key={key.toString()}>
          {key.replace(/^./, key.charAt(0).toUpperCase())}
          {': '}
          {value}
        </div>
      ))}
    </>
  )
}
/**
 * Deve verificar as variaveis no render,
 * pois ele só é feito depois que todas
 * as rotinas são concluídas
 */
