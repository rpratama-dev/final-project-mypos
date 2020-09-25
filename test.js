function generateRecomendedUang (uang, kelipatan) {
  let x = uang + kelipatan;
  let y = Math.floor(x / kelipatan);
  return y * kelipatan; 
}

console.log(generateRecomendedUang(45000, 10000));