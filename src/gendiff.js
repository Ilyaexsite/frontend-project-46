import _ from 'lodash'
import parseFile from './parsers.js'

const buildDiff = (data1, data2) => {
  const allKeys = _.union(_.keys(data1), _.keys(data2))
  const sortedKeys = _.sortBy(allKeys)

  return sortedKeys.flatMap((key) => {
    const hasInFirst = _.has(data1, key)
    const hasInSecond = _.has(data2, key)
    const value1 = data1[key]
    const value2 = data2[key]

    if (!hasInFirst) {
      return [{ key, value: value2, status: 'added' }]
    }

    if (!hasInSecond) {
      return [{ key, value: value1, status: 'removed' }]
    }

    if (_.isEqual(value1, value2)) {
      return [{ key, value: value1, status: 'unchanged' }]
    }

    return [
      { key, value: value1, status: 'removed' },
      { key, value: value2, status: 'added' }
    ]
  })
}

const formatValue = (value) => {
  if (_.isBoolean(value)) {
    return value.toString()
  }
  if (_.isNull(value)) {
    return 'null';
  }
  if (_.isObject(value)) {
    return '[complex value]'
  }
  return value
}

const formatStylish = (diffItems) => {
  const lines = diffItems.map((item) => {
    const prefix = item.status === 'added' ? '  + ' :
      item.status === 'removed' ? '  - ' :
        '    '
    return `${prefix}${item.key}: ${formatValue(item.value)}`
  })

  return `{\n${lines.join('\n')}\n}`
}

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)

  const diffItems = buildDiff(data1, data2)

  if (format === 'stylish') {
    return formatStylish(diffItems)
  }

  throw new Error(`Unsupported format: ${format}`)
}

export default genDiff
