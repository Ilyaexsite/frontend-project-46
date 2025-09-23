import _ from 'lodash'
import parseFile from './parsers.js'
import getFormatter from './formatters/index.js'

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

    return {
      key,
      value: value2,
      oldValue: value1,
      status: 'updated'
    }
  })
}

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)

  const diff = buildDiff(data1, data2)
  const formatter = getFormatter(format)

  return formatter(diff)
}

export default genDiff
