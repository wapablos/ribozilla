/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '@store/.'
import { servicesActions } from '@store/services'
import { IExtensionCache, IExtensionList } from '@constants/interfaces'
import { FiDownloadCloud, FiTrash, FiRefreshCw } from 'react-icons/fi'
import { PipelineEvents } from '@constants/events'
import { extensionsActions } from '@store/extensions'
import { Link } from 'react-router-dom'
import { ExtensionsWrapper, ExtensionsStyledListItem, ListWrapper, StyledList } from './styles'

function setMiniButton(title: keyof IExtensionList, filename?: string, download_url?:string) {
  const dispatch = useDispatch()

  const handleDownload = () => {
    window.electron.ipcRenderer.invoke(PipelineEvents.DOWNLOAD_EXTENSION, { download_url, filename }).then((res) => {
      console.log('Download', res)
      if (res === 'finish') {
        dispatch(extensionsActions.loadRequest())
        dispatch(servicesActions.githubLoadRequest())
      }
    })
  }

  const handleDelete = () => {
    window.electron.ipcRenderer.invoke(PipelineEvents.DELETE_EXTENSION, filename).then(async (res) => {
      console.log('Deleted', await res)
      if (res === 'deleted') {
        dispatch(extensionsActions.loadRequest())
        dispatch(servicesActions.githubLoadRequest())
      }
    })
  }

  switch (title) {
    case 'installed':
      return (
        <div className="mini-action installed" onClick={handleDelete}>
          <FiTrash size="1.2em" />
        </div>
      )

    case 'available':
      return (
        <div className="mini-action available" onClick={handleDownload}>
          <FiDownloadCloud size="1.2em" />
        </div>
      )

    default:
      return <></>
  }
}

function getExtensionList(list: Partial<IExtensionCache>[], title: keyof IExtensionList) {
  const dispatch = useDispatch()

  const handleRefresh = () => {
    dispatch(extensionsActions.loadRequest())
    dispatch(servicesActions.githubLoadRequest())
  }

  return (
    <>
      <ExtensionsStyledListItem className="pane-header">
        {title.toUpperCase()}
        <div className="icon refresh" onClick={handleRefresh}>
          <FiRefreshCw size="1.2em" />
        </div>
      </ExtensionsStyledListItem>
      <StyledList>
        {list?.map(({ name, filename, download_url }, index) => (
          <ExtensionsStyledListItem className="software" key={`${title}-${index}`}>
            {name}
            {setMiniButton(title, filename, download_url)}
          </ExtensionsStyledListItem>
        ))}
      </StyledList>
    </>
  )
}

function ExtensionsList() {
  const dispatch = useDispatch()
  const { extensions, success, error, loading } = useSelector<ApplicationState, ApplicationState['githubApi']>((state) => state.githubApi)

  useEffect(() => {
    if (!success || loading) {
      console.log('(Software List) useEffect')
      dispatch(servicesActions.githubLoadRequest())
    }
  }, [success])

  return (
    <ListWrapper>
      {getExtensionList(extensions.installed, 'installed')}
      {getExtensionList(extensions.available, 'available')}
    </ListWrapper>
  )
}

const ExtensionInfo = memo(() => <object data="https://ribozilla-preview.netlify.app/" style={{ width: '100%' }} />)

export default function Extensions() {
  return (
    <ExtensionsWrapper>
      <ExtensionsList />
      <ExtensionInfo />
    </ExtensionsWrapper>
  )
}
