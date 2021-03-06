// Coleção criada para ter uma base de ingredientes;

db.ingredients.insertMany([
  {
    name: "Pó de café",
    quantity: 1800,
    measure: "Gramas",
    cost: {
      price: 34.90,
      measurement: 500,
      size: "Gramas"
    }
  },
  {
    name: "Leite",
    quantity: 8000,
    measure: "ML",
    cost: {
      price: 4.52,
      measurement: 1000,
      size: "ML"
    }
  },
  {
    name: "Leite em pó",
    quantity: 5700,
    measure: "Gramas",
    cost: {
      price: 16.00,
      measurement: 380,
      size: "Gramas"
    }
  },
  {
    name: "Queijo minas",
    quantity: 2600,
    measure: "Gramas",
    cost: {
      price: 15.50,
      measurement: 500,
      size: "Gramas"
    }
  },
  {
    name: "Presunto",
    quantity: 3800,
    measure: "Gramas",
    cost: {
      price: 19.50,
      measurement: 500,
      size: "Gramas"
    }
  },
  {
    name: "Cookie",
    quantity: 22,
    measure: "Unidade",
    cost: {
      price: 5.00,
      measurement: 1,
      size: "Unidade"
    }
  },
  {
    name: "Farinha",
    quantity: 4500,
    measure: "Gramas",
    cost: {
      price: 3.89,
      measurement: 1000,
      size: "Gramas"
    }
  },
  {
    name: "Pão francês",
    quantity: 3600,
    measure: "Gramas",
    cost: {
      price: 13.99,
      measurement: 1000,
      size: "Gramas"
    }
  },
  {
    name: "Manteiga",
    quantity: 600,
    measure: "Gramas",
    cost: {
      price: 8.90,
      measurement: 200,
      size: "Gramas"
    }
  },
  {
    name: "Leite Condensado",
    quantity: 900,
    measure: "Gramas",
    cost: {
      price: 5.09,
      measurement: 395,
      size: "Gramas"
    }
  },
  {
    name: "Ovo",
    quantity: 16,
    measure: "Unidade",
    price: 11.00,
    cost: {
      price: 11.00,
      measurement: 30,
      size: "Unidade"
    }
  }
]);