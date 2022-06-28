
import React, { useEffect, useState } from "react"

import { Box, Button, Center, Flex, Heading, Spinner, Table, TableCaption, TableContainer, Tbody, Text, Tfoot, Th, Thead, Tr, useToast } from '@chakra-ui/react'
import axios from "axios"
import { baseURL, config } from "../../parameters"

import { Header } from "../../components/Header"
import ReactDatePicker from "react-datepicker"

import { ItemTable } from "../../components/ItemTable"



export function Products() {

  const [user, setUser] = useState({})
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [deliveryDate, setDeliveryDate] = useState(new Date())
  const totalPrice = cart.reduce((acc, c) => acc + c.price * c.qty, 0)

  const toast = useToast()

  useEffect(() => {
    getAllProducts()
    getUserById()
    getCartLocal()
  }, [])

  const getCartLocal = () =>{
    setCart(JSON.parse(localStorage.getItem("cart")))
  }

  const getAllProducts = async () => {
    try {
      setIsLoading(true)

      const response = await axios.get(`${baseURL}/product/all`, config)

      if (response.data.products) setProducts(response.data.products)

      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const getUserById = async () => {
    try {
      setIsLoading(true)
      let user = JSON.parse(localStorage.getItem("user"))

      const response = await axios.get(`${baseURL}/user/${user.id}`, config)

      if (response.data) setUser(response.data)

      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const removeCart = (product) => {
    let newCart
    let existProduct = cart.find((c) => c.id === product.id)


    if (existProduct.qty === 1) {
      newCart = cart.filter((c) => c.id !== product.id)
    } else {
      newCart = cart.map((c) =>
        c.id === product.id ? { ...c, qty: c.qty - 1 } : c
      )
    }
    setCart(newCart)

    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  const addCart = (product) => {
    let newCart
    const existProduct = cart.find(c => c.id === product.id)
    if (existProduct) {
      newCart = cart.map((c) =>
        (c.id === product.id) && (c.qty < product.qty_stock) ? { ...c, qty: c.qty + 1 } : c
      )
    } else {
      newCart = [...cart, { ...product, qty: 1 }]
    }
    setCart(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
  }

  const createOrder = async () => {
    try {
      const order = {
        userId: user.id,
        products: cart,
        delivery: deliveryDate
      }

      await axios.post(`${baseURL}/order/register`, order, config)


      toast({
        title: "Pedido realizado",
        description: "Pedido realizado.",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
      setCart([])
      setDeliveryDate(new Date())
      localStorage.removeItem("cart")
    } catch (error) {
      toast({
        title: "Um erro ocorreu.",
        description: "Não foi possivel criar um pedido",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Header />
      <Flex w="100vw" flexWrap="wrap" justify="center">

        {isLoading && products ?
          <Spinner
            mb={10}
            thickness="6px"
            speed="0.75s"
            emptyColor="gray.200"
            color="teal.500"
            size="xl"
          />
          :
          <TableContainer m={3}>
            <Flex p={3} justify='space-between' align="center" border='1px' borderColor='gray.200' >
              <Heading size='xl'>Lista de Produtos</Heading>
            </Flex>
            <Table variant='striped' colorScheme='teal'>
              <TableCaption>Lista de produtos oferecidos Shopper</TableCaption>
              <Thead>
                <Tr>
                  <Th>Produto</Th>
                  <Th isNumeric>Preço</Th>
                  <Th ><Center>Ação</Center></Th>
                </Tr>
              </Thead>
              <Tbody>
                <ItemTable
                  products={products}
                  removeCart={removeCart}
                  addCart={addCart}
                  type={'products'}
                />
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Produto</Th>
                  <Th isNumeric>Preço</Th>
                  <Th isNumeric><Center>Ação</Center></Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        }

        <TableContainer m={3}>
          <Flex p={3} justify='space-between' align="center" border='1px' borderColor='gray.200' >
            <Text>Olá, <b>{user.name}</b>  escolha uma data para a entrega do pedido </Text>
            <Box mx={2} p={1} border='1px' borderColor='teal.200' width="100px" overflow="hidden">
              <ReactDatePicker
                selected={deliveryDate}
                dateFormat="dd/MM/yyyy"
                onChange={(date) => date > new Date() && setDeliveryDate(date)} 
              />
            </Box>
          </Flex>
          {
            totalPrice > 0 && (
              <Flex p={3} mt={1} justify='space-between' align="center" border='1px' borderColor='gray.200' >
                <Text >Preço total: </Text>
                <Text fontSize='2xl'>R$ {totalPrice.toFixed(2)}</Text>

                <Button
                  colorScheme='teal'
                  variant='solid'
                  onClick={() => createOrder()}
                >Fazer Pedido</Button>
              </Flex>
            )
          }
          <Table colorScheme='teal'>
            <TableCaption>Produtos Selecionados</TableCaption>
            <Thead>
              <Tr>
                <Th>Produto</Th>
                <Th isNumeric>Preço</Th>
                <Th isNumeric>Quatidade</Th>
                <Th isNumeric>SubTotal</Th>
                <Th ><Center>Ação</Center></Th>
              </Tr>
            </Thead>
            <Tbody>

              <ItemTable
                cart={cart}
                removeCart={removeCart}
                addCart={addCart}
                type={'cart'}
              />

            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Produto</Th>
                <Th isNumeric>Preço</Th>
                <Th isNumeric>Quatidade</Th>
                <Th isNumeric>SubTotal</Th>
                <Th isNumeric><Center>Ação</Center></Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>

      </Flex>
    </>
  )
}

