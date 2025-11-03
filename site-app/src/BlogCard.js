// src/components/BlogCard.jsx
import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Tooltip,
  TextField,
  Button,
  Avatar,
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  Comment,
  Share,
  Send,
} from "@mui/icons-material";

/**
 * BlogCard – displays a single post with:
 *   • Image, title, description
 *   • Like, Comment, Share buttons
 *   • Collapsible comment input
 *   • List of existing comments
 */
const BlogCard = ({ post }) => {
  // ---------- Like ----------
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  // ---------- Share ----------
 // In BlogCard.jsx (or ShareButton.jsx)
const handleShare = async () => {
  // Fallback for unsupported browsers
  if (!navigator.share) {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");  // Or use a toast/snackbar
    } catch (err) {
      console.error("Clipboard copy failed:", err);
      alert("Failed to copy link. Please copy manually: " + window.location.href);
    }
    return;
  }

  // Web Share API
  try {
    await navigator.share({
      title: post.title,
      text: post.description.substring(0, 100) + "...",  // Shorten for better UX
      url: window.location.href,
    });
    console.log("Share successful!");
  } catch (err) {
    if (err.name !== "AbortError") {  // Ignore user cancellations
      console.error("Share failed:", err);
      // Fallback to clipboard on error
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Share failed—link copied to clipboard instead!");
      } catch (clipboardErr) {
        alert("Share failed. Manual link: " + window.location.href);
      }
    }
  }
};

  // ---------- Comment ----------
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Alice Johnson",
      text: "Great article! Really helped me understand hooks better.",
      avatar: "A",
      time: "2 hours ago",
    },
    {
      id: 2,
      author: "Bob Smith",
      text: "Thanks for the clear explanation!",
      avatar: "B",
      time: "5 hours ago",
    },
  ]);

  const handleCommentClick = () => setShowCommentBox(true);
  const handleCancelComment = () => {
    setShowCommentBox(false);
    setCommentText("");
  };
  const handleSubmitComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: comments.length + 1,
      author: "You",               // replace with auth user later
      text: commentText,
      avatar: "Y",
      time: "Just now",
    };

    setComments((prev) => [newComment, ...prev]);
    setCommentText("");
    setShowCommentBox(false);
  };

  // ---------- Render ----------
  return (
    <Card sx={{ maxWidth: 600, mx: "auto", mb: 4, boxShadow: 3, borderRadius: 2 }}>
      {/* Image */}
      <CardMedia
        component="img"
        height="250"
        image={post.imageUrl}
        alt={post.title}
        sx={{ objectFit: "cover" }}
      />

      <CardContent>
        {/* Title */}
        <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
          {post.title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebKitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.description}
        </Typography>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 3,
            pt: 2,
            borderTop: "1px solid #e0e0e0",
          }}
        >
          <Tooltip title="Like">
            <IconButton onClick={handleLike} color={liked ? "error" : "default"}>
              {liked ? <Favorite /> : <FavoriteBorder />}
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {likeCount}
              </Typography>
            </IconButton>
          </Tooltip>

          <Tooltip title="Comment">
            <IconButton onClick={handleCommentClick} color="primary">
              <Comment />
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {comments.length}
              </Typography>
            </IconButton>
          </Tooltip>

          <Tooltip title="Share">
            <IconButton onClick={handleShare} color="primary">
              <Share />
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {post.shares}
              </Typography>
            </IconButton>
          </Tooltip>
        </Box>

        {/* Comment Input (collapsible) */}
        <Collapse in={showCommentBox}>
          <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}>
            <TextField
              placeholder="Write a comment..."
              variant="outlined"
              size="small"
              fullWidth
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSubmitComment()}
              autoFocus
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Button size="small" onClick={handleCancelComment}>
                Cancel
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={handleSubmitComment}
                disabled={!commentText.trim()}
                startIcon={<Send />}
              >
                Post
              </Button>
            </Box>
          </Box>
        </Collapse>

        {/* Existing Comments */}
        <List sx={{ mt: 2 }}>
          {comments.map((c, idx) => (
            <React.Fragment key={c.id}>
              {idx > 0 && <Divider />}
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}>
                    {c.avatar}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" fontWeight="medium">
                      {c.author}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="text.primary">
                        {c.text}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {c.time}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default BlogCard;