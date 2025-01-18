import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Chip,
  Box,
  Button,
} from "@mui/material";
import axios from "axios";
import Cartcontext from "./Context/Cartcontext";

export default function Newdrop() {
  const [products, setProducts] = useState([]);
  



  // Fetch product data on component mount
  useEffect(() => {
    async function productdata() {
      try {
        const response = await axios.get(`https://backend-one-brown-50.vercel.app/product`);
        setProducts(response.data); // Use response.data to set the products
      } catch (error) {
        console.log(error);
      }
    }
    productdata();
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <div style={{ backgroundColor: "#f8f8f8", padding: "2rem 0" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Typography
          variant="h4"
          component="h2"
          fontWeight="bold"
          gutterBottom
          sx={{
            color: "#333",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Customers Also Purchased
        </Typography>

        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                sx={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                  },
                  borderRadius: "12px",
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Link
                  to="/productdetails"
                  state={{ product }}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <CardMedia
                    component="img"
                    image={product.images[0].src}
                    alt={product.images[0].alt}
                    sx={{
                      aspectRatio: "1/1",
                      borderRadius: "12px 12px 0 0",
                      objectFit: "cover",
                      backgroundColor: "#f5f5f5",
                    }}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#555",
                        fontWeight: "bold",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#ff5722",
                        fontWeight: "bold",
                        marginTop: "0.5rem",
                      }}
                    >
                      Rs. {product.price}
                    </Typography>
                    <Box mt={2} display="flex" flexWrap="wrap">
                      {product.size.map((sizeOption, index) => (
                        <Chip
                          key={index}
                          label={sizeOption}
                          size="small"
                          sx={{
                            margin: "2px",
                            fontSize: "0.75rem",
                            bgcolor: "#ffebee",
                            color: "#d32f2f",
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Link>
                <Box
                  sx={{
                    padding: "0.5rem 1rem",
                    borderTop: "1px solid #f0f0f0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Link to='/productdetails' state={{ product }}>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      color: "#ff5722",
                      borderColor: "#ff5722",
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#ffebee",
                        borderColor: "#ff5722",
                      },
                    }}
                  >
                    Add to Cart
                  </Button>
                  </Link>
                  <Button
                    variant="text"
                    size="small"
                    sx={{
                      color: "#555",
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      "&:hover": {
                        color: "#ff5722",
                      },
                    }}
                  >
                    Quick View
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
