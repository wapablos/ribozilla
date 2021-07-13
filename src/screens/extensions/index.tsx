import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '@store/.'
import { servicesActions } from '@store/services'

export default function Extensions() {
  const dispatch = useDispatch()
  const { extensions, success, error } = useSelector<ApplicationState, ApplicationState['githubApi']>((state) => state.githubApi)

  useEffect(() => {
    if (!success) {
      console.log('(Extensions Load) useEffect')
      dispatch(servicesActions.githubLoadRequest())
    }
  }, [success])
  return (
    <div>
      List
    </div>
  )
}
