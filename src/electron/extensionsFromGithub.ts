import axios from 'axios'
import jsonpath from 'jsonpath'

export async function fetchExtensions() {
  const rootExtensionsUrl = 'https://api.github.com/repos/wapablos/ribozilla-extensions/contents'

  const githubApi = axios.create({
    baseURL: rootExtensionsUrl,
    timeout: 5000,
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
    .then((res) => {
      console.log('CLI Folder', res)
      return res.data
    })
    .catch((error) => {
      console.error(error)
      return []
    })

  const manifestMeta = extensionsUrlPath.then(async (res: any) => {
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
  })

  const extensionMetadata = manifestMeta.then(async (res: any) => {
    console.log(res)
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
    console.log('Metadata: ', md)
    return md
  })

  return extensionMetadata
}
