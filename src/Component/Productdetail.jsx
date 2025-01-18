import React, { useContext, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  Chip,
  Card,
  CardContent,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import Slider from "react-slick"; // Carousel library
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLocation } from "react-router-dom";
import Cartcontext from "./Context/Cartcontext";

function ProductDetail() {
  const { addToCart } = useContext(Cartcontext);
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const { product } = location.state || {};
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [massage, setMassage] = useState(false);

  

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      setOpenSnackbar(true); // Show validation message
      return;
    } else {
      setMassage(true);
    }

    const newProduct = {
      product,
      quantity,
      selectedSize,
      selectedColor,
    };

    addToCart(newProduct); // Add product to the cart
    setQuantity((prev) => prev + 1);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setMassage(false);
  };

  

  return (
    <>
      <Card
        sx={{
          maxWidth: 1200,
          mx: "auto",
          p: 4,
          mt: 5,
          boxShadow: 6,
          borderRadius: 2,
        }}
      >
        <Grid container spacing={4}>
          {/* Image Carousel */}
          <Grid item xs={12} md={6}>
            <Box  sx={{ p: 2 }}>
              

              <img
                src={product.images[0].src}
                alt={product.images[0].alt}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "12px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Box>
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <CardContent>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: "#333", mb: 2 }}
              >
                {product.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: "regular", mb: 1, color: "#333" }}
              >
                Description:{product.description}
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 2, color: "#555", fontStyle: "italic" }}
              >
                {product.category}
              </Typography>
              <Typography variant="h5" sx={{ mb: 3, color: "#1A73E8" }}>
                ₹{product.price}
              </Typography>

              {/* Highlights */}
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", mb: 1, color: "#333" }}
              >
                Highlights:
              </Typography>
              <Box sx={{ pl: 2 }}>
                {product.highlights.map((highlight, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{
                      mb: 0.5,
                      color: "#666",
                      "&::before": {
                        content: '"• "',
                        color: "#1A73E8",
                        fontWeight: "bold",
                      },
                    }}
                  >
                    {highlight}
                  </Typography>
                ))}
              </Box>

              {/* Size Selection */}
              <Box sx={{ mt: 3 }}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  Select Size:
                </Typography>
                <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                  {product.size.map((size, index) => (
                    <Chip
                      key={index}
                      label={size}
                      clickable
                      onClick={() => setSelectedSize(size)}
                      sx={{
                        backgroundColor:
                          selectedSize === size ? "#1A73E8" : "#f5f5f5",
                        color: selectedSize === size ? "#fff" : "#333",
                        fontWeight: "bold",
                        borderRadius: 1,
                        "&:hover": {
                          backgroundColor: "#1A73E8",
                          color: "#fff",
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Color Selection */}
              <Box sx={{ mt: 3 }}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  Select Color:
                </Typography>
                <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                  {product.colors.map((color, index) => (
                    <Box
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: color,
                        borderRadius: "50%",
                        cursor: "pointer",
                        border:
                          selectedColor === color
                            ? "3px solid #1A73E8"
                            : "1px solid #ddd",
                        transition: "border 0.3s ease",
                        "&:hover": {
                          border: "3px solid #1A73E8",
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Add to Cart Button */}
              <Button
                variant="contained"
                onClick={handleAddToCart}
                sx={{
                  backgroundColor: "#1A73E8",
                  color: "#fff",
                  fontWeight: "bold",
                  padding: "12px 24px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#0a5ec2",
                  },
                }}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      {/* Snackbar Notifications */}
      <Snackbar
        open={massage}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity="success">Item added to cart!</Alert>
      </Snackbar>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity="error">Please select size and color.</Alert>
      </Snackbar>
    </>
  );
}

export default ProductDetail;
