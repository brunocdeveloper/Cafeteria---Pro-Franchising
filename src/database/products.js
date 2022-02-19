// Coleção criada para ter uma base de produtos

db.products.insertMany([
  {
    name: "Café",
    image: '',
    price: 2.50,
    ingredients: [
      {
        name: "Pó de café",
        measure: "Gramas",
        quantity: 30,
      },
    ]
  },
  {
    name: "Omelete",
    image: '',
    price: 9.00,
    ingredients: [
      {
        name: "Queijo minas",
        measure: "Gramas",
        quantity: 80,
      },
      {
        name: "Ovo",
        measure: "Unidade",
        quantity: 2,
      },
      {
        name: "Presunto",
        measure: "Gramas",
        quantity: 80,
      }
    ]
  },
  {
    name: "Pão de queijo",
    image: '',
    price: 9.00,
    ingredients: [
      {
        name: "Queijo minas",
        measure: "Gramas",
        quantity: 150,
      },
      {
        name: "Leite",
        measure: "ML",
        quantity: 200,
      },
    ]
  },
]);
