import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Heading,
  NumberInput,
  NumberInputField,
  Select,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

function SignupForm() {
  const [show, setShow] = useState(false);
  const [batch, setBatch] = useState("6AM-7AM");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(18);

  const handleClick = () => setShow(!show);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, age: +age, batch }),
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
          Register for Yoga Classes
        </Heading>

        <FormControl marginBottom="21px">
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </FormControl>

        <FormControl marginBottom="21px">
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FormControl>

        <FormControl marginBottom="21px">
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl marginBottom="21px">
          <FormLabel>Age</FormLabel>
          <NumberInput max={65} min={18}>
            <NumberInputField
              placeholder="Age"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
            />
          </NumberInput>
        </FormControl>

        <FormControl marginBottom="21px">
          <FormLabel>Select Batch</FormLabel>
          <Select
            placeholder="Select Batch"
            value={batch}
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
          Sign Up!
        </Button>
      </form>
    </Box>
  );
}

export default SignupForm;
