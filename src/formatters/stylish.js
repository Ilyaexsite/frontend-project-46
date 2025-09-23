import _ from 'lodash'

const formatValue = (value, depth = 0) => {
  if (_.isBoolean(value)) {
    return value.toString()
  }
  if (_.isNull(value)) {
    return 'null'
  }
  if (!_.isPlainObject(value)) {
    return String(value)
  }

  const indent = '    '.repeat(depth + 1)
  const bracketIndent = '    '.repeat(depth)
  const lines = Object.entries(value).map(([key, val]) => {
    const formattedValue = formatValue(val, depth + 1)
    return `${indent}${key}: ${formattedValue}`
  })

  return `{\n${lines.join('\n')}\n${bracketIndent}}`
}

const formatStylish = (diff, depth = 0) => {
  const indent = '    '.repeat(depth)
  const bracketIndent = '    '.repeat(depth)

  const lines = diff.map((item) => {
    const { key, status } = item

    switch (status) {
      case 'nested':
        const nestedContent = formatStylish(item.children, depth + 1)
        return `${indent}  ${key}: ${nestedContent}`

      case 'added':
        const addedValue = formatValue(item.value, depth + 1)
        return `${indent}+ ${key}: ${addedValue}`

      case 'removed':
        const removedValue = formatValue(item.value, depth + 1)
        return `${indent}- ${key}: ${removedValue}`

      case 'updated':
        const oldValue = formatValue(item.oldValue, depth + 1)
        const newValue = formatValue(item.value, depth + 1)
        return [
          `${indent}- ${key}: ${oldValue}`,
          `${indent}+ ${key}: ${newValue}`
        ].join('\n')

      case 'unchanged':
        const unchangedValue = formatValue(item.value, depth + 1)
        return `${indent}  ${key}: ${unchangedValue}`

      default:
        throw new Error(`Unknown status: ${status}`)
    }
  })

  return `{\n${lines.join('\n')}\n${bracketIndent}}`
}

export default formatStylish
