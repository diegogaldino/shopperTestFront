import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Link, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import useForm from "../../hooks/useForm";
import { baseURL } from "../../parameters";
import { goToProducts, goToSignup } from "../../routes/Coordinator";
import { getUserToken } from "../../token/getUserToken";

export function Login() {
  const [form, onChange, clear] = useForm({ email: "", password: "" })
  const toast = useToast()

  const navigate = useNavigate()

  const login = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(`${baseURL}/user/login`, form)

      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", getUserToken(response.data.token))
      toast({
        title: "Conta aceita.",
        description: "Você esta logado.",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
      goToProducts(navigate)
      clear()
    } catch (error) {
      toast({
        title: "Ocorreu um erro.",
        description: "Verificar email e senha",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
  }
  return (

    <Flex
      justify="center"
      align="center"
      h="90vh" w="100%" p={5}
      direction="column">
      <Box borderWidth={2}
        p={5}
        borderRadius={5}
        maxWidth="500px"
      >

        <Heading>Fazer login</Heading>
        <form onSubmit={login} >
          <FormControl mt="20px">
            <FormLabel>Email</FormLabel>
            <Input
              value={form.email}
              name={"email"}
              onChange={onChange}
              type="email"
              variant="outline"
              placeholder="Entre com seu email"
              isRequired
            />
          </FormControl>
          <FormControl mt="10px">
            <FormLabel>Senha</FormLabel>
            <Input
              value={form.password}
              name={"password"}
              onChange={onChange}
              type="password"
              variant="outline"
              placeholder="Entre com sua senha"
              isRequired
            />
            <Link
              onClick={() => goToSignup(navigate)}
              color="grey"
              display="block"
              textAlign="right"
            >Criar conta</Link>
          </FormControl>

          <Button mt="20px" bg="teal" size="lg" w="full" type="submit" >Entrar</Button>
        </form>
      </Box>
    </Flex>

  )
}