export const getOs = () => {
  if (navigator.platform.includes('Win')) { return 'win32' }
  if (navigator.platform.includes('Mac')) { return 'darwin' }
  if (navigator.platform.includes('Linux')) { return 'linux' }

  return 'linux'
}
