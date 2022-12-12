import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";

function ChangeBatch() {
  const [newbatch, setBatch] = useState("6AM-7AM");

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = localStorage.getItem("userEmail");
    fetch(`${process.env.REACT_APP_SERVER_URL}/updatebatch`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, batch: newbatch }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box w="100vw" display="flex" justifyContent="center" p={4}>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "800px",
          minWidth: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Heading marginTop="30px" marginBottom="20px" as="h1">
          Fill the Form for Change Batch
        </Heading>

        <FormControl marginBottom="21px">
          <FormLabel>Select Batch</FormLabel>
          <Select
            placeholder="Select Batch"
            value={newbatch}
            onChange={(e) => {
              setBatch(e.target.value);
            }}
          >
            <option value="6AM-7AM">6AM-7AM</option>
            <option value="7AM-8AM">7AM-8AM</option>
            <option value="8AM-9AM">8AM-9AM</option>
            <option value="5PM-6PM">5PM-6PM</option>
          </Select>
        </FormControl>

        <Button colorScheme="teal" type="submit">
          Change Batch
        </Button>
      </form>
    </Box>
  );
}

export default ChangeBatch;
