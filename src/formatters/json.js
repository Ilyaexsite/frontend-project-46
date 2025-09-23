const formatJson = (diff) => {
 const formatNode = (node) => {
      if (node.status === 'nested') {
        return {
          key: node.key,
          status: node.status,
          children: node.children.map(formatNode)
        }
      }

      const baseNode = {
        key: node.key,
        status: node.status
      }

      switch (node.status) {
        case 'added':
          return { ...baseNode, value: node.value }
        case 'removed':
          return { ...baseNode, value: node.value }
        case 'unchanged':
          return { ...baseNode, value: node.value }
        case 'updated':
          return {
            ...baseNode,
            oldValue: node.oldValue,
            value: node.value
          }
        default:
          throw new Error(`Unknown node status: ${node.status}`)
      }
    }

    const formattedDiff = diff.map(formatNode)
    return JSON.stringify(formattedDiff, null, 2)
  }

export default formatJson
