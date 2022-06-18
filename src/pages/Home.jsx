import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Login } from "./Login";

export function Home() {

	return (
		<>
			<Header />
			<Flex w="100vw" h="90vh" flexWrap="wrap" justify="center">
				<Flex

					w="50%"
					minWidth="400px"
					align="center"
					justify="center"

					bgGradient="linear(to-l,#10ac78, #22B8F6)"
				>
					<Box
						m={5}
						w="90%"
						p={6}
						borderLeftWidth={3}
						maxWidth="600px"
						boxShadow="5px 5px 5px rgba(0,0,0,0.3)"
						color="white"
					>
						<Heading fontSize="6xl">Aqui você compra sem ir ao mercado</Heading>
						<Text mt={4} fontSize="2xl">Automatizamos seu processo de compras, entregando melhores preços e uma experiencia encantadora</Text>
						<Text as="i" mt={4} fontSize="2xl" >Comece agora! </Text>
					</Box>
				</Flex>

				<Flex
					w="50%"
					justify="center"
					minWidth="400px"
					pt={5}
				>
					<Login/>
				</Flex>
			</Flex>
		</>
	)
}