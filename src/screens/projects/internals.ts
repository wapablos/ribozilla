function handleInfo<T>(event: React.ChangeEvent<HTMLInputElement>, info: T, dispatch: React.Dispatch<React.SetStateAction<T>>) {
  event.preventDefault()
  const { id, value } = event.target
  dispatch({ ...info, [id]: value })
}

export { handleInfo }
