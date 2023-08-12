/* Desafío de área de un polígono:
Planteamiento: Dados los puntos que representan los vértices de un polígono en un plano cartesiano, tu objetivo es calcular el área del polígono.
Ejemplo de entrada: [(0, 0), (4, 0), (4, 3), (0, 3)]
Ejemplo de salida: 12 */

function calcularAreaPoligono(vertices) {
  if (vertices.length < 3) {
    return 0; // No se puede formar un polígono con menos de 3 vértices
  }

  let suma1 = 0;
  let suma2 = 0;

  for (let i = 0; i < vertices.length; i++) {
    let x1 = vertices[i][0];
    let y1 = vertices[i][1];
    let x2, y2;

    if (i === vertices.length - 1) {
      x2 = vertices[0][0];
      y2 = vertices[0][1];
    } else {
      x2 = vertices[i + 1][0];
      y2 = vertices[i + 1][1];
    }

    suma1 += x1 * y2;
    suma2 += y1 * x2;
  }

  const area = 0.5 * Math.abs(suma1 - suma2);
  return area;
}

// Ejemplo de entrada
const vertices = [
  [0, 0],
  [4, 0],
  [4, 3],
  [0, 3]
];

// Calcular el área del polígono
const area = calcularAreaPoligono(vertices);

// Mostrar el resultado
console.log(`El área del polígono es: ${area}`);
