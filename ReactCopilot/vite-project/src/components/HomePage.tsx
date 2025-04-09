import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
} from "@mui/material";

const HomePage: React.FC = () => {
  return (
    <Box>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Course Management System
          </Typography>
          <Button color="inherit">Dashboard</Button>
          <Button color="inherit">Courses</Button>
          <Button color="inherit">Students</Button>
          <Button color="inherit">Teachers</Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Course Management System
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Manage your courses, teachers, and students efficiently with our
          system. Get started by navigating through the options.
        </Typography>

        {/* Info Cards */}
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Total Courses
                </Typography>
                <Typography variant="h6" color="primary">
                  15
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View Courses
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Total Students
                </Typography>
                <Typography variant="h6" color="secondary">
                  200
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View Students
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Total Teachers
                </Typography>
                <Typography variant="h6" color="error">
                  20
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View Teachers
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          py: 2,
          mt: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          &copy; 2025 Course Management System | All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;