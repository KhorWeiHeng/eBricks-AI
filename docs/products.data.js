import { createContentLoader } from 'vitepress'

const inferSetCodeFromUrl = (url) => {
  if (typeof url !== 'string') return ''
  const match = url.match(/\/products\/(eb\d{3})\//i)
  if (!match) return ''
  const digits = match[1].slice(2)
  return `eB${digits}`
}

export default createContentLoader('products/**/*.md', {
  includeSrc: false,
  render: false,
  excerpt: false,
  transform(rawData) {
    return rawData
      .map(({ url, frontmatter }) => ({
        ...frontmatter,
        setCode:
          typeof frontmatter?.setCode === 'string' && frontmatter.setCode.trim()
            ? frontmatter.setCode.trim()
            : inferSetCodeFromUrl(url),
        url
      }))
      .sort((a, b) => (a.id || '').localeCompare(b.id || ''))
  }
})
