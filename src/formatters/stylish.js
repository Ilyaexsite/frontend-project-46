import _ from 'lodash'

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    if (value === null) return 'null'
    if (_.isBoolean(value)) return value.toString()
    return value
  }

  const indentSize = depth * 4
  const currentIndent = ' '.repeat(indentSize)
  const bracketIndent = ' '.repeat(indentSize - 4)

  const lines = Object.entries(value).map(([key, val]) => {
    const formattedValue = stringify(val, depth + 1)
    return `${currentIndent}${key}: ${formattedValue}`
  })

  return ['{', ...lines, `${bracketIndent}}`].join('\n')
}

const formatStylish = (diff, depth = 1) => {
  const indentSize = depth * 4
  const indent = ' '.repeat(indentSize - 2)

  const lines = diff.map((node) => {
    switch (node.type) {
    case 'added':
      return `${indent}+ ${node.key}: ${stringify(node.value, depth + 1)}`
    case 'removed':
      return `${indent}- ${node.key}: ${stringify(node.value, depth + 1)}`
    case 'unchanged':
      return `${indent}  ${node.key}: ${stringify(node.value, depth + 1)}`
    case 'changed':
      return [
        `${indent}- ${node.key}: ${stringify(node.oldValue, depth + 1)}`,
        `${indent}+ ${node.key}: ${stringify(node.newValue, depth + 1)}`
      ].join('\n')
    case 'nested':
      return `${indent}  ${node.key}: ${formatStylish(node.children, depth + 1)}`
    default:
      throw new Error(`Unknown node type: ${node.type}`)
    }
  })

  return ['{', ...lines, `${' '.repeat(indentSize - 4)}}`].join('\n')
}

export default formatStylish
