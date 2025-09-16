import _ from 'lodash'

const formatValue = (value, depth = 0) => {
  if (_.isBoolean(value)) {
    return value.toString()
  }
  if (_.isNull(value)) {
    return 'null'
  }
  if (!_.isPlainObject(value)) {
    return value;
  }

  const indent = '    '.repeat(depth)
  const lines = Object.entries(value).map(([key, val]) => {
    const formattedValue = formatValue(val, depth + 1)
    return `${indent}    ${key}: ${formattedValue}`
  })

  return `{\n${lines.join('\n')}\n${indent}}`
}

const formatStylish = (diff, depth = 0) => {
  const indent = '    '.repeat(depth)
  const lines = diff.map((item) => {
    const { key, status } = item

    if (status === 'nested') {
      const nestedContent = formatStylish(item.children, depth + 1)
      return `${indent}    ${key}: ${nestedContent}`
    }

    const value = formatValue(item.value, depth)
    const prefix = status === 'added' ? '  + ' :
      status === 'removed' ? '  - ' : '    '

    return `${indent}${prefix}${key}: ${value}`
  })

  return `{\n${lines.join('\n')}\n${indent}}`
}

export default formatStylish
