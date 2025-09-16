import _ from 'lodash'
import parseFile from './parsers.js'

const formatValue = (value, depth = 0) => {
  if (_.isBoolean(value)) {
    return value.toString()
  }
  if (_.isNull(value)) {
    return 'null'
  }
  if (!_.isPlainObject(value)) {
    return value
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

const buildDiff = (data1, data2) => {
  const allKeys = _.union(_.keys(data1), _.keys(data2))
  const sortedKeys = _.sortBy(allKeys)

  return sortedKeys.flatMap((key) => {
    const hasInFirst = _.has(data1, key)
    const hasInSecond = _.has(data2, key)
    const value1 = data1[key]
    const value2 = data2[key]

    if (!hasInFirst) {
      return { key, value: value2, status: 'added' }
    }

    if (!hasInSecond) {
      return { key, value: value1, status: 'removed' }
    }

    if (_.isEqual(value1, value2)) {
      return { key, value: value1, status: 'unchanged' }
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key,
        children: buildDiff(value1, value2),
        status: 'nested'
      }
    }

    return [
      { key, value: value1, status: 'removed' },
      { key, value: value2, status: 'added' }
    ]
  })
}

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)

  const diff = buildDiff(data1, data2)

  if (format === 'stylish') {
    return formatStylish(diff)
  }

  throw new Error(`Unsupported format: ${format}`)
}

export default genDiff
