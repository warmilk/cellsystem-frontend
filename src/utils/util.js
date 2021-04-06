export function staticsCells(cells, curr) {
  const tmp = {}
  for (let i = 0; i < cells.length; i++) {
    tmp[cells[i].label] = 0
  }

  for (let i = 0; i < curr.length; i++) {
    const shapes = curr[i].shapes
    for (let j = 0; j < shapes.length; j++) {
      tmp[shapes[j].label] += 1
    }
  }

  const res = []
  for (let i = 0; i < cells.length; i++) {
    res.push({
      id: cells[i].id,
      name: cells[i].name,
      label: cells[i].label,
      color: cells[i].color,
      num: tmp[cells[i].label],
      reference: cells[i].reference
    })
  }
  return res
}

export function staticsCell(cells, curr) {
  const tmp = {}
  for (let i = 0; i < cells.length; i++) {
    tmp[cells[i].label] = 0
  }

  const shapes = curr.shapes
  for (let j = 0; j < shapes.length; j++) {
    tmp[shapes[j].label] += 1
  }

  const res = []
  for (let i = 0; i < cells.length; i++) {
    res.push({
      id: cells[i].id,
      name: cells[i].name,
      label: cells[i].label,
      color: cells[i].color,
      num: tmp[cells[i].label],
      reference: cells[i].reference
    })
  }
  return res
}

export function stdOrderParam({ prop, order }) {
  const newParam = {
    prop: 'create_time',
    order: 'desc'
  }
  if (order === null) return newParam
  if (order === 'descending') newParam.order = 'desc'
  if (order === 'ascending') newParam.order = 'asc'
  newParam.prop = toUnderScoreCase(prop)
  return newParam
}

// function toCamelCase(name) {
//   return name.replace(/\_(\w)/g, function (all, letter) {
//     return letter.toUpperCase()
//   })
// }

export function toUnderScoreCase(name) {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase()
}

export function findCell(shapes, x, y) {
  for (let i = 0; i < shapes.length; i++) {
    const points = shapes[i].points
    let count = 0
    for (let j = 0; j < points.length; j++) {
      const x1 = points[j][0]
      const y1 = points[j][1]
      const x2 = points[(j + 1) % points.length][0]
      const y2 = points[(j + 1) % points.length][1]
      if ((x > x1 && x <= x2) || (x <= x1 && x > x2)) {
        var t = (y2 - y1) * (x - x1) / (x2 - x1) + y1
        if (t > y) count++
      }
    }
    if (count % 2 === 1) return i
  }
  return -1
}
