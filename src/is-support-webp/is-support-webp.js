module.exports = function isSupportWebp() {
  if (isSupportWebp.result !== undefined) {
    return isSupportWebp.result
  }

  var elem = document.createElement('canvas')
  if (
    !!(elem.getContext && elem.getContext('2d'))
  ) {
     isSupportWebp.result = elem.toDataURL('image/webp').indexOf('data:image/webp') == 0

     return isSupportWebp.result
  }

  return false
}
