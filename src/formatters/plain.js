import _ from 'lodash'

const formatValue = (value) => {
  if (_.isPlainObject(value) || _.isArray(value)) {
    return '[complex value]'
  }
  if (_.isString(value)) {
    return `'${value}'`
  }
  if (_.isNull(value)) {
    return 'null'
  }
  return value
}

const buildPlainLines = (diff, path = '') => {
  const lines = diff.flatMap((item) => {
    const currentPath = path ? `${path}.${item.key}` : item.key

    if (item.status === 'nested') {
      return buildPlainLines(item.children, currentPath)
    }
    if (item.status === 'added') {
      return `Property '${currentPath}' was added with value: ${formatValue(item.value)}`
    }
    if (item.status === 'removed') {
      return `Property '${currentPath}' was removed`
    }
    if (item.status === 'updated') {
      return `Property '${currentPath}' was updated. From ${formatValue(item.oldValue)} to ${formatValue(item.value)}`
    }
    return []
  })

  return lines.filter(Boolean)
}

const formatPlain = (diff) => {
  const lines = buildPlainLines(diff)
  return lines.join('\n')
}

export default formatPlain
