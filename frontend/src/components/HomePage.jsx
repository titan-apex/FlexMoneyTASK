import { Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import ChangeBatch from "./ChangeBatch";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const HomePage = () => {
  const [form, setForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleClick = (whichForm) => setForm(whichForm);

  useEffect(() => {
    fetch("http://localhost:4000")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "20px",
          gap: "10px",
        }}
      >
        {isLoggedIn ? (
          <Button
            colorScheme="teal"
            onClick={() => {
              localStorage.removeItem("userEmail");
              setIsLoggedIn(false);
            }}
          >
            Logout
          </Button>
        ) : (
          <>
            <Button colorScheme="teal" onClick={() => handleClick(true)}>
              Login
            </Button>
            <Button colorScheme="teal" onClick={() => handleClick(false)}>
              Signup
            </Button>
          </>
        )}
      </nav>

      {isLoggedIn ? (
        <ChangeBatch />
      ) : form ? (
        <LoginForm login={setIsLoggedIn} />
      ) : (
        <SignupForm />
      )}
    </>
  );
};

export default HomePage;
