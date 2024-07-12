// const express = require('express');
// const axios = require('axios');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(express.json());

// // Endpoint para consultar productos en Mercado Libre
// app.get('/api/items', async (req, res) => {
//     const query = req.query.q; // Obtener el parámetro de búsqueda desde la URL
//     try {
//         const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
//         const data = response.data;

//         // Mapear los resultados en el formato requerido
//         const items = data.results.slice(0, 4).map(result => ({
//             id: result.id,
//             title: result.title,
//             price: {
//                 currency: result.currency_id,
//                 amount: Math.floor(result.price),
//                 decimals: (result.price % 1).toFixed(2).substring(2),
//             },
//             picture: result.thumbnail.replace("-I", "-O").replace("I", "O"),
//             condition: result.condition,
//             free_shipping: result.shipping.free_shipping,
//         }));

//         // Formato de respuesta final
//         const responseFormat = {
//             author: {
//                 name: 'Tu Nombre',  // Nombre del autor
//                 lastname: 'Tu Apellido',  // Apellido del autor
//             },
//             categories: [],  // Aquí puedes incluir las categorías si las obtienes de la API
//             items: items,
//         };

//         res.json(responseFormat);
//     } catch (error) {
//         console.error('Error searching products:', error);
//         res.status(500).json({ error: 'Failed to fetch products' });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

