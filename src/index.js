import path from 'path'
import fs from 'fs'
import util from 'util'

import loaderUtils from 'loader-utils'
import validateOptions from 'schema-utils'

import schema from './options.json'

const access = util.promisify(fs.access)
const readFile = util.promisify(fs.readFile)

export default function loader(content, map, meta) {
  if (!this.emitFile) {
    throw new Error('Use webp Loader\n\nemitFile is required from module system')
  }

  const options = loaderUtils.getOptions(this) || {}

  validateOptions(schema, options, 'Use webp Loader')

  const context = options.context || this.rootContext || (this.options && this.options.context)

  const url = loaderUtils.interpolateName(this, options.name, {
    context,
    content,
    regExp: options.regExp
  })

  let outputPath = url

  if (options.outputPath) {
    if (typeof options.outputPath === 'function') {
      outputPath = options.outputPath(url)
    } else {
      outputPath = path.posix.join(options.outputPath, url)
    }
  }

  if (options.useRelativePath) {
    const filePath = this.resourcePath

    const issuer = options.context
      ? context
      : this._module && this._module.issuer && this._module.issuer.context

    const relativeUrl = 
      issuer &&
      path
        .relative(issuer, filePath)
        .split(path.sep)
        .join('/')

    const relativePath = relativeUrl && `${path.dirname(relativeUrl)}`
    if (~relativePath.indexOf('../')) {
      outputPath = path.posix.join(outputPath, relativePath, url)
    } else {
      outputPath = path.posix.join(relativePath, url)
    }
  }

  let publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`
  if (options.publicPath) {
    if (typeof options.publicPath === 'function') {
      publicPath = options.publicPath(url)
    } else if (options.publicPath.endsWith('/')) {
      publicPath = options.publicPath + url
    } else {
      publicPath = `${options.publicPath}/${url}`
    }

    publicPath = JSON.stringify(publicPath)
  }


  if (options.emitFile === undefined || options.emitFile) {
    this.emitFile(outputPath, content)
  }

  // 判断用户是否标明了要使用 webp 格式
  const pathData = path.parse(this.resourcePath)
  const isDeclareUseWebp = pathData.name.endsWith('@webp')
    || pathData.name.endsWith('@webp@2x')
    || pathData.name.endsWith('@webp@2.5x')
    || pathData.name.endsWith('@webp@3x')
    || pathData.name.endsWith('@webp@2.5x')
    || pathData.name.endsWith('@webp@4x')
    || pathData.name.endsWith('@webp@5x')
    || pathData.name.endsWith('@webp@6x')

  if (isDeclareUseWebp) {
    const callback = this.async()
    const webpPath = path.resolve(path.dirname(this.resourcePath), `${pathData.name}.webp`)
    access(webpPath, fs.constants.R_OK)
      .then(() => {
        return readFile(webpPath)
      })
      .then(content => {
        const url = loaderUtils.interpolateName({
          resourcePath: webpPath
        }, options.name, {
          content,
          regExp: options.regExp
        })
        this.emitFile(url, content)
        const result = `
        var isSupportWebp = require('is-support-webp')
        if (isSupportWebp()) {
          module.exports = __webpack_public_path__ + ${JSON.stringify(url)}
        } else {
          module.exports = ${publicPath}
        }
        `
        callback(null, result, map, meta)
      })
    return
  }

  return `module.exports = ${publicPath}`
}

export const raw = true
