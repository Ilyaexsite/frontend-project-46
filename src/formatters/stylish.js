import _ from 'lodash'

const formatValue = (value, depth) => {
  if (_.isBoolean(value)) {
    return value.toString()
  }
  if (_.isNull(value)) {
    return 'null'
  }
  if (!_.isPlainObject(value)) {
    return String(value)
  }

  const indentSize = 4
  const currentIndent = ' '.repeat(depth * indentSize)
  const bracketIndent = ' '.repeat((depth - 1) * indentSize)

  const lines = Object.entries(value).map(([key, val]) =>
    `${currentIndent}${key}: ${formatValue(val, depth + 1)}`,
  )

  return ['{', ...lines, `${bracketIndent}}`].join('\n')
}

const formatStylish = (diff, depth = 1) => {
  const indentSize = 4
  const currentIndent = ' '.repeat(depth * indentSize - 2)
  const bracketIndent = ' '.repeat((depth - 1) * indentSize)

  const lines = diff.map((item) => {
    const { key, status } = item

    switch (status) {
      case 'nested': {
        const nestedContent = formatStylish(item.children, depth + 1)
        return `${currentIndent}  ${key}: ${nestedContent}`
      }

      case 'added': {
        const value = formatValue(item.value, depth + 1)
        return `${currentIndent}+ ${key}: ${value}`
      }

      case 'removed': {
        const value = formatValue(item.value, depth + 1)
        return `${currentIndent}- ${key}: ${value}`
      }

      case 'updated': {
        const oldValue = formatValue(item.oldValue, depth + 1)
        const newValue = formatValue(item.value, depth + 1)
        return [
          `${currentIndent}- ${key}: ${oldValue}`,
          `${currentIndent}+ ${key}: ${newValue}`,
        ].join('\n')
      }
 
      case 'unchanged': {
        const value = formatValue(item.value, depth + 1)
        return `${currentIndent}  ${key}: ${value}`
      }

      default:
        throw new Error(`Unknown status: ${status}`)
    }
  })

  return ['{', ...lines, `${bracketIndent}}`].join('\n')
}

export default formatStylish
