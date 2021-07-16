import axios from 'axios'
import jsonpath from 'jsonpath'

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
          const json = JSON.parse(data)
          const fetchExtensionsUrl = jsonpath.query(json, '$[*].url')
          return fetchExtensionsUrl
        }
      ]
    })
    .then((res) => res.data /* console.log('CLI Folder', res) */)
    .catch((error) => {
      console.error(error)
      return error
    })

  const manifestMeta = extensionsUrlPath?.then(async (res: any) => {
    const files = await axios
      .all(
        res.map((link: any, index: number) => axios.get(link, {
          transformResponse: [
            (data) => {
              const json = JSON.parse(data)
              const manifestMeta = jsonpath.query(
                json,
                '$[?(/manifest.json/.test(@.name))]'
              )[0]
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
    const manifest = jsonpath.query(files, '$[*].data')
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
    const md = jsonpath.query(metadata, '$[*].data')
    // console.log('Metadata: ', md)
    return md
  }).catch((error) => {
    console.log('Error: No metadata')
    return error
  })

  return extensionMetadata
}
