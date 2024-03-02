import React from "react";
import {Box, Divider, Stack, Button, Typography} from "@mui/material";

interface IProps {
  cancelDelete: () => void;
  confirmDelete: () => void;
}

export function ConfirmDeleteModal({cancelDelete, confirmDelete}: IProps) {
  return (
    <Box 
      sx={{
        p: "15px",
        width: "100%",
        boxShadow: 24,
        maxWidth: "456px",
        borderRadius: "8px",
        bgcolor: "background.paper",
      }}
    >
      <Typography 
        variant="h5"
        className="whitespace-normal"
      >Are you sure to delete recipe.</Typography>
      <Typography 
        variant="subtitle2"
        className="whitespace-normal mt-[20px]"
      >You will never restore it.</Typography>
      <Divider className="my-[50px]"/>
      <Stack 
        spacing="20px"
        direction="row"
      >
        <Button 
          variant="outlined"
          className="w-full"
          onClick={cancelDelete}
        >Cancel</Button>
        <Button 
          className="w-full"
          variant="contained"
          onClick={confirmDelete}
        >Delete</Button>
      </Stack>
    </Box>
  );
}