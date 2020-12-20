import { SystemInfoEvents } from '@constants/events'
import { ISystemInfo } from '@constants/interfaces'

export default async function getSystemInfo(): Promise<ISystemInfo> {
  return new Promise((resolve, reject) => {
    window.electron.once(SystemInfoEvents.RESPONSE, (event, sysinfo) => {
      window.electron.removeAllListeners(SystemInfoEvents.RESPONSE)
      return resolve(sysinfo)
    })
  })
}
