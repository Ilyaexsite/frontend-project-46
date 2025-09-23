const formatToJson = (diff) => {
    const formatValue = (value) => {
      if (value === null) return null
      if (typeof value === 'object' && !Array.isArray(value)) {
        return '[complex value]'
      }
      return value
    }
  
    const formatNode = (node) => {
      const {
        key, status, value, oldValue, children,
      } = node
  
      switch (status) {
        case 'added':
          return {
            key,
            status: 'added',
            value: formatValue(value),
          }
        
        case 'removed':
          return {
            key,
            status: 'removed',
            value: formatValue(value),
          }
        
        case 'unchanged':
          return {
            key,
            status: 'unchanged',
            value: formatValue(value),
          }
        
        case 'updated':
          return {
            key,
            status: 'updated',
            oldValue: formatValue(oldValue),
            value: formatValue(value),
          }
        
        case 'nested':
          return {
            key,
            status: 'nested',
            children: children.flatMap((child) => formatNode(child)),
          }
        
        default:
          throw new Error(`Unknown status: ${status}`)
      }
    }
  
    const jsonOutput = diff.flatMap((node) => formatNode(node))
    return JSON.stringify(jsonOutput, null, 2)
  }
  
  export default formatToJson
  