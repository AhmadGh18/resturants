import { CardContent, Collapse, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ManageItemComponents = (props) => {
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const date = new Date(props.created_at);
  const formattedDate = `${date.getDate()} ${date.toLocaleString("default", {
    month: "long",
  })} ${date.getFullYear()}`;
  return (
    <Card sx={{ maxWidth: 345 }} className="mr-2 mt-3 relative">
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src={`http://localhost:8000/storage/${props.logo}`}
          ></Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={handleEditClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={props.title}
        subheader={formattedDate}
      />
      {editMode && (
        <div
          style={{
            position: "absolute",
            top: "43px",
            right: "8px",
            backgroundColor: "#dedddd",
            width: "100px",
            textAlign: "center",
            borderRadius: "5px",
            cursor: "pointer",
            padding: "8px",
          }}
          onClick={handleEditClick}
        >
          <Link to={`/main/restaurantPage/itemsedit/${props.id}`}> Edit</Link>
        </div>
      )}
      <CardMedia
        component="img"
        height=""
        image={`http://localhost:8000/storage/${props.image}`}
        alt="Paella dish"
        style={{ minHeight: "250px", maxHeight: "250px" }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ManageItemComponents;
