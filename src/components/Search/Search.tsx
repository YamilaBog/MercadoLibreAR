import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Breadcrumbs,
  Link,
  Stack,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Category, Products } from "../../domain/Products";




interface ISearchProps {
  placeholder: string;
  onSearch: (textFilter: string) => void; // Prop para pasar la función de búsqueda
}

const Search: React.FC<ISearchProps> = ({ placeholder, onSearch }) => {
  const [textFilter, setTextFilter] = useState("");
  const [results, setResults] = useState<Products[]>([]);
  const [loading, setLoading] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.mercadolibre.com/sites/MLA/search?q=${textFilter}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();

      // Extract categories from filters
      const categoriesFilter = data.filters.find(
        (filter: any) => filter.id === "category"
      );
      if (categoriesFilter) {
        setCategories(categoriesFilter.values);
      }

      const products = data.results.map((result: any) => ({
        id: result.id,
        title: result.title,
        thumbnail: result.thumbnail.replace("-I", "-O").replace("I", "O"),
        price: result.price,
        permalink: result.permalink,
        category_id: result.category_id,
      }));

      setResults(products);

      // Call onSearch prop from parent component with textFilter
      onSearch(textFilter);
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchData();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextFilter(e.target.value);
  };

  const handleCardClick = (id: string) => {
    navigate(`/items/${id}`);
  };

  const handleSearchClick = () => {
    fetchData();
  };

  useEffect(() => {
    // Calculate category with most results
    let mostResultsCategory: Category | undefined;
    let maxResults = 0;

    categories.forEach((category) => {
      const categoryResults = results.filter(
        (product: { category_id: string }) =>
          product.category_id === category.id
      ).length;
      if (categoryResults > maxResults) {
        maxResults = categoryResults;
        mostResultsCategory = category;
      }
    });

    if (mostResultsCategory) {
      const categoryName = mostResultsCategory.name;
      const categoryResults = maxResults;
      setBreadcrumb([
        categoryName,
        `${categoryName} (${categoryResults} resultados)`,
      ]);
    } else {
      setBreadcrumb([]);
    }
  }, [results]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      sx={{ backgroundColor: "#f2f2f2" }}
    >
      <Grid
        item
        container
        direction="row"
        maxWidth="100%"
        width="100%"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: "yellow",
          borderRadius: "8px",
          padding: "8px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
        }}
      >
         <Grid item>
         <img src={"mercadoLibre"} alt="Logo" style={{ width: 40, height: 40 }} />
            </Grid>
            <Grid item>
          <Input
            disableUnderline
            placeholder={placeholder}
            value={textFilter}
            onChange={handleChange}
            onKeyPress={handleKeyPress} // Detectar la tecla Enter
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "8px 0 0 8px",
              height: "40px",
              width: "900px",
              justifyContent: "center",
              "& input": {
                padding: "10px 12px",
                border: "none",
                outline: "none",
                width: "100%",
              },
            }}
          />
        </Grid>
        <Grid item xs={2} md={1}>
          <Button
            variant="contained"
            onClick={handleSearchClick}
            disabled={loading}
            sx={{
              borderRadius: "0 8px 8px 0",
              height: "40px",
              minWidth: "auto",
              backgroundColor: "f2f2f2",
              color: "f2f2f2",
              padding: "0 20px",
            }}
          >
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </Grid>
      </Grid>
      {breadcrumb.length > 0 && (
        <Breadcrumbs aria-label="breadcrumb">
          {breadcrumb.map((crumb, index) => (
            <Link key={index} color="inherit" href="/">
              {crumb}
            </Link>
          ))}
        </Breadcrumbs>
      )}
      {loading && results.length === 0 ? ( // Mostrar CircularProgress solo si loading es true y no hay resultados
        <CircularProgress />
      ) : (
        <Grid container justifyContent="center" spacing={0}>
          {results.slice(0, 4).map((product, index) => (
            <React.Fragment key={product.id}>
              {index !== 0}
              <Grid item xs={12} md={10} lg={8}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    maxWidth: "100%",
                    cursor: "pointer",
                    marginBottom: "16px",
                  }}
                  onClick={() => handleCardClick(product.id)}
                >
                  <CardMedia
                    component="img"
                    image={product.thumbnail}
                    alt={product.title}
                    sx={{
                      width: "300px", // Tamaño fijo deseado
                      height: "300px", // Tamaño fijo deseado
                      objectFit: "cover", // Ajuste para rellenar sin distorsión
                      flexShrink: 0,
                    }}
                  />

                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      padding: "8px",
                      paddingRight: "16px",
                    }}
                  >
                    <Typography variant="h4" gutterBottom>
                      Precio: $ {product.price}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                      {product.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      )}
    </Grid>
  );
};

export default Search;
