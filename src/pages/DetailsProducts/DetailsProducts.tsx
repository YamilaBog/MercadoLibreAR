import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { ProductDetail, Products } from "../../domain/Products";
import Search from "../../components/Search/Search";

const DetailsProducts: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [searchResults, setSearchResults] = useState<Products[]>([]);
  const navigate = useNavigate();

  // Función para obtener los detalles de un producto específico
  const fetchProductDetails = async (productId: string) => {
    setLoadingProduct(true);
    try {
      const response = await fetch(
        `https://api.mercadolibre.com/items/${productId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();

      const formattedProduct: ProductDetail = {
        ...data,
      };

      setProduct(formattedProduct);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoadingProduct(false);
    }
  };

  // Función para manejar la búsqueda de productos relacionados
  const handleSearch = async (query: string) => {
    setLoadingProduct(true);
    try {
      const response = await fetch(
        `https://api.mercadolibre.com/sites/MLA/search?q=${query}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const data = await response.json();
      setSearchResults(data.results.slice(0, 4)); // Limitar a los primeros 4 resultados

      // Limpiar detalles del producto al realizar la búsqueda
      setProduct(null);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoadingProduct(false);
    }
  };

  // Efecto para cargar los detalles del producto cuando el ID cambia
  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, [id]);

  return (
    <Stack
      direction="column"
      alignItems="center"
      spacing={4}
      sx={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}
    >
      <Search placeholder="Buscar productos" onSearch={handleSearch} />
      {loadingProduct ? (
        <CircularProgress />
      ) : (
        product && (
          <Card sx={{ width: "100%", maxWidth: 900, height: 700 }}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <CardMedia
                component="img"
                image={product.thumbnail}
                alt={product.title}
                sx={{
                  width: "400px", // Tamaño fijo deseado
                  height: "400px", // Tamaño fijo deseado
                  objectFit: "cover", // Ajuste para rellenar sin distorsión
                   marginTop: 10 ,
                }}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h3" gutterBottom>
                  {product.title}
                </Typography>
                <Typography variant="h2" gutterBottom>
                  {" "}
                  ${product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  href={product.buying_mode}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "#ffffff",
                    minWidth: "300px",
                    height: "50px",
                    marginTop: 10,
                  }}
                >
                  Comprar
                </Button>
              </CardContent>
            </Stack>
            <Typography variant="h5" sx={{ marginTop: 14 }}>
              <strong>Descripción del Producto:</strong> {product.descriptions}
            </Typography>
          </Card>
        )
      )}
    </Stack>
  );
};

export default DetailsProducts;
