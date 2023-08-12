/* Puntos de interés cercanos: Dado un conjunto de puntos de interés (como restaurantes, tiendas, etc.) y tu ubicación actual, encuentra el punto de interés más cercano utilizando algoritmos de búsqueda espacial, como el árbol KD.*/

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Node {
  constructor(point, left = null, right = null) {
    this.point = point;
    this.left = left;
    this.right = right;
  }
}

class KDTree {
  constructor(points) {
    this.root = this.buildTree(points, 0);
  }

  buildTree(points, depth) {
    if (points.length === 0) {
      return null;
    }

    const axis = depth % 2 === 0 ? 'x' : 'y';

    points.sort((a, b) => a[axis] - b[axis]);

    const medianIndex = Math.floor(points.length / 2);
    const medianPoint = points[medianIndex];
    const leftPoints = points.slice(0, medianIndex);
    const rightPoints = points.slice(medianIndex + 1);

    return new Node(
      medianPoint,
      this.buildTree(leftPoints, depth + 1),
      this.buildTree(rightPoints, depth + 1)
    );
  }

  findNearestNeighbor(queryPoint) {
    let bestNode = null;
    let bestDistance = Infinity;

    const search = (node, depth = 0) => {
      if (node === null) {
        return;
      }

      const currentDistance = this.distance(queryPoint, node.point);

      if (currentDistance < bestDistance) {
        bestNode = node;
        bestDistance = currentDistance;
      }

      const axis = depth % 2 === 0 ? 'x' : 'y';

      if (queryPoint[axis] < node.point[axis]) {
        search(node.left, depth + 1);
        if (node.point[axis] - queryPoint[axis] < bestDistance) {
          search(node.right, depth + 1);
        }
      } else {
        search(node.right, depth + 1);
        if (queryPoint[axis] - node.point[axis] < bestDistance) {
          search(node.left, depth + 1);
        }
      }
    };

    search(this.root);

    return bestNode ? bestNode.point : null;
  }

  distance(point1, point2) {
    const dx = point1.x - point2.x;
    const dy = point1.y - point2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

// Ejemplo de puntos de interés
const pointsOfInterest = [
  new Point(2, 3),
  new Point(5, 9),
  new Point(8, 1),
  new Point(10, 6),
  new Point(4, 7),
  new Point(1, 4)
];

// Tu ubicación actual
const myLocation = new Point(7, 5);

// Crear el árbol KD con los puntos de interés
const kdTree = new KDTree(pointsOfInterest);

// Encontrar el punto de interés más cercano a tu ubicación
const nearestPoint = kdTree.findNearestNeighbor(myLocation);

console.log('Ubicación actual:', myLocation);
console.log('Punto de interés más cercano:', nearestPoint);
