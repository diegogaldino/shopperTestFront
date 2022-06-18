import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Link, Text, useToast } from "@chakra-ui/react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Header } from "../../components/Header"
import useForm from "../../hooks/useForm"
import { baseURL } from "../../parameters"
import { goToHome } from "../../routes/Coordinator"

export function Signup() {
	const [form, onChange, clear] = useForm({ email: "", password: "", name: "" })
	const toast = useToast()

	const navigate = useNavigate()

	const createLogin = async (event) => {
		event.preventDefault()

		try {
			await axios.post(`${baseURL}/user/signup`, form)
			toast({
				title: "Conta criada.",
				description: "Nós criamos uma conta para você.",
				status: "success",
				duration: 9000,
				isClosable: true,
			})
			goToHome(navigate)
			clear()
		} catch (error) {
			toast({
				title: "Ocorreu um erro.",
				description: "Não foi possivel criar uma conta.",
				status: "error",
				duration: 9000,
				isClosable: true,
			})
		}
	}

	return (
		<>
			<Header />
			<Flex
				align="center"
				justify="center"
				h="90vh" w="100%" p={5}
				direction="column">
				<Box borderWidth={2}
					p={5}
					borderRadius={5}
					maxWidth="500px"
				>
					<Heading>Crie sua conta</Heading>
					<form onSubmit={createLogin} >
						<FormControl mt="20px">
							<FormLabel>Nome</FormLabel>
							<Input
								value={form.name}
								name={"name"}
								onChange={onChange}
								type="text"
								variant="outline"
								placeholder="Digite seu nome"
								isRequired
							/>
						</FormControl>
						<FormControl mt="10px">
							<FormLabel>Email</FormLabel>
							<Input
								value={form.email}
								name={"email"}
								onChange={onChange}
								type="email" variant="outline"
								placeholder="Digite seu email"
								isRequired
							/>
						</FormControl>
						<FormControl mt="10px">
							<FormLabel >Senha</FormLabel>
							<Input
								value={form.password}
								name={"password"}
								onChange={onChange}
								type="password"
								variant="outline"
								placeholder="Digite sua senha"
								isRequired
							/>
							<Link
								onClick={() => goToHome(navigate)}
								color="grey"
								display="block"
								textAlign="right"
							>
								Você tem uma conta?
							</Link>
						</FormControl>

						<Button mt="20px" bg="teal" size="lg" w="full" type="submit">Criar conta</Button>
					</form>
					<Text mt="10px" fontSize="xs">Ao criar uma conta, você concorda com os Termos de Serviço. Para obter mais informações sobre as práticas de privacidade da Shopper, consulte a Declaração de Privacidade da Shopper. Ocasionalmente, enviaremos e-mails relacionados à conta. </Text>
				</Box>
			</Flex>
		</>
	)
}