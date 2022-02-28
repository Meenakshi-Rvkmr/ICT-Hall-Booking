import React from "react";
import { Container, Stack } from "@mui/material";
import SingleHallDetail from "../singlehalldetail/SingleHallDetail";
import AddHall from "../../components/createhall/AddHall";

const HallList = ({ allHalls }) => {
  const listHalls = allHalls.map((hall, key) => (
    // Correct! Key should be specified inside the array.
    <SingleHallDetail key={key} value={hall} />
  ));
  return (
    <>
      <Container>
        <Stack direction="column" spacing={2}>
          <AddHall />
          {listHalls}
        </Stack>
      </Container>
    </>
  );
};

export default HallList;
