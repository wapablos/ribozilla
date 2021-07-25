import axios from 'axios'
// import jsonpath from 'jsonpath'
import { JSONPath } from 'jsonpath-plus'

export async function fetchExtensions() {
  const rootExtensionsUrl = 'https://api.github.com/repos/wapablos/ribozilla-extensions/contents'

  const githubApi = axios.create({
    baseURL: rootExtensionsUrl,
    timeout: 1000,
    params: { ref: 'main' }
  })

  const extensionsUrlPath = githubApi.get('/cli',
    {
      transformResponse: [
        (data) => {
          try {
            const json = JSON.parse(data)
            const fetchExtensionsUrl = JSONPath({ json, path: '$[*].url' })
            return fetchExtensionsUrl
          } catch (error) {
            console.log('(ERROR) Irregular response')
            return []
          }
        }
      ]
    })
    .then((res) => {
      console.log('Fetch Success', res)
      return res?.data
    })
    .catch((error) => {
      console.error('§ Fetch Error')
      return []
    })

  const manifestMeta = extensionsUrlPath?.then(async (res: any) => {
    const files = await axios
      .all(
        res.map((link: any, index: number) => axios.get(link, {
          transformResponse: [
            (data) => {
              const json = JSON.parse(data)
              const manifestMeta = JSONPath({ json, path: '$[?(/manifest.json/.test(@.name))]' })[0]
              const manifestRes = {
                name: manifestMeta.name,
                sha: manifestMeta.sha,
                download_url: manifestMeta.download_url
              }
              return manifestRes
            }
          ]
        }))
      )
      .then((res: any) => res)
    const manifest = JSONPath({ json: files, path: '$[*].data' })
    return manifest
  }).catch((error) => {
    console.log('Error: Manifest fetch failed')
    return error
  })

  const extensionMetadata = manifestMeta.then(async (res: any) => {
    const metadata = await axios
      .all(
        res.map((value: any) => axios.get(value.download_url, {
          transformResponse: [
            (data) => {
              const extension = JSON.parse(data)
              const metadataRes = {
                name: extension.name,
                version: extension.version,
                sha: value.sha,
                download_url: value.download_url,
                filename: value.name
              }
              return metadataRes
            }
          ]
        }))
      )
      .then((res) => res)
    const md = JSONPath({ json: metadata, path: '$[*].data' })
    // console.log('Metadata: ', md)
    return md
  }).catch((error) => {
    console.log('Error: No metadata')
    return error
  })

  return extensionMetadata
}
