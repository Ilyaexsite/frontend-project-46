import _ from 'lodash'
import { readFileSync } from 'fs'
import path from 'path'

const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  const content = readFileSync(absolutePath, 'utf-8')
  return JSON.parse(content)
}

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)))

  return keys.map((key) => {
    const value1 = data1[key]
    const value2 = data2[key]

    if (!_.has(data1, key)) {
      return { key, status: 'added', value: value2 }
    } if (!_.has(data2, key)) {
      return { key, status: 'removed', value: value1 }
    }
    
    if (_.isEqual(value1, value2)) {
      return { key, status: 'unchanged', value: value1 }
    }
    
    return {
      key,
      status: 'updated',
      oldValue: value1,
      newValue: value2
    }
  })
}

const formatDiff = (diff) => {
  const lines = diff.map((item) => {
    switch (item.status) {
      case 'added':
        return `  + ${item.key}: ${item.value}`
      case 'removed':
        return `  - ${item.key}: ${item.value}`
      case 'unchanged':
        return `    ${item.key}: ${item.value}`
      case 'updated':
        return [
          `  - ${item.key}: ${item.oldValue}`,
          `  + ${item.key}: ${item.newValue}`
        ].join('\n');
      default:
        return ''
    }
  })
  return `{\n${lines.join('\n')}\n}`
}

export const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)
  const diff = buildDiff(data1, data2)
  return formatDiff(diff)
}
