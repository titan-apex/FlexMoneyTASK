import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Heading,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

function LoginForm({ login }) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => setShow(!show);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res.status === 200) return res.json();

        alert("Invalid Credentials");
        throw new Error("Invalid Credentials");
      })
      .then((data) => {
        localStorage.setItem("userEmail", data.user);
        login(true);
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
          Login
        </Heading>

        <FormControl isRequired marginBottom="21px">
          <FormLabel>Email address</FormLabel>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
          />
        </FormControl>

        <FormControl isRequired marginBottom="21px">
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button colorScheme="teal" type="submit">
          Login!
        </Button>
      </form>
    </Box>
  );
}

export default LoginForm;
