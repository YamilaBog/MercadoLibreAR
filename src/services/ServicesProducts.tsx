// const express = require('express');
// const axios = require('axios');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(express.json());

// app.get('/api/items', async (req, res) => {
//     const query = req.query.q;
//     try {
//         const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
//         const data = response.data;

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

        
//         const responseFormat = {
//             author: {
//                 name: 'Yamila',  
//                 lastname: 'Bogarin',  
//             },
//             categories: [],  
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

