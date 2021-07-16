/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '@store/.'
import { servicesActions } from '@store/services'
import { IExtensionCache, IExtensionList } from '@constants/interfaces'
import { FiDownloadCloud, FiTrash } from 'react-icons/fi'
import { PipelineEvents } from '@constants/events'
import { ExtensionsWrapper, ExtensionsStyledListItem, ListWrapper, StyledList } from './styles'

function setMiniButton(title: keyof IExtensionList, filename?: string, download_url?:string) {
  const handleDownload = () => {
    window.electron.ipcRenderer.invoke(PipelineEvents.DOWNLOAD_EXTENSION, download_url).then((res) => {
      console.log(res)
    })
  }

  const handleDelete = () => {
    window.electron.ipcRenderer.invoke(PipelineEvents.DELETE_EXTENSION, filename).then((res) => {
      console.log(res)
    })
  }

  switch (title) {
    case 'installed':
      return (
        <div className="mini-action installed" onClick={handleDelete}>
          <FiTrash size="1.6em" />
        </div>
      )

    case 'available':
      return (
        <div className="mini-action available" onClick={handleDownload}>
          <FiDownloadCloud size="1.6em" />
        </div>
      )

    default:
      return <></>
  }
}

function getExtensionList(list: Partial<IExtensionCache>[], title: keyof IExtensionList) {
  return (
    <>
      <ExtensionsStyledListItem>{title.toUpperCase()}</ExtensionsStyledListItem>
      <StyledList>
        {list.map(({ name, filename, download_url }, index) => (
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
  const { extensions, success, error } = useSelector<ApplicationState, ApplicationState['githubApi']>((state) => state.githubApi)

  useEffect(() => {
    if (!success || error) {
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

function ExtensionInfo() {
  return (
    <>
      Info
    </>
  )
}

export default function Extensions() {
  return (
    <ExtensionsWrapper>
      <ExtensionsList />
      <ExtensionInfo />
    </ExtensionsWrapper>
  )
}
