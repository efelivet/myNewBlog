import React from "react";
import { Container, Typography, Box } from "@mui/material";
import BlogCard from "./BlogCard";
import { dummyBlogPosts } from "./dummyBlogData";

const BlogList = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
        fontWeight="bold"
        color="primary"
      >
        Latest Blog Posts
      </Typography>
      <Box sx={{ mt: 4 }}>
        {dummyBlogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </Box>
    </Container>
  );
};

export default BlogList;