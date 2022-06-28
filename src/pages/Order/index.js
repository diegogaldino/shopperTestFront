import React, { useEffect, useState } from "react"

import {
  Tr,
  Tbody,
  Table,
  TableContainer,
  Thead,
  Flex,
  Heading,
  TableCaption,
  Th,
  Tfoot,
  Td,
} from '@chakra-ui/react'

import axios from "axios"
import { baseURL, config } from "../../parameters"
import { Header } from "../../components/Header"

export function Order() {
  const [orders, setOrders] = useState([])
  
  useEffect(() => {
    getAllOrdersByUserId()
  }, [])

  const getAllOrdersByUserId = async () => {
    let user = JSON.parse(localStorage.getItem("user"))
    try {
      const response = await axios.get(`${baseURL}/order/all/user/${user.id}`, config)

      if (response.data) setOrders(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Header />
      <Flex w="100vw" flexWrap="wrap" justify="center">

        <TableContainer m={3}>
          <Flex p={3} justify='space-between' align="center" border='1px' borderColor='gray.200' >
            <Heading size='xl'>Meus Pedidos</Heading>
          </Flex>
          <Table variant='striped' colorScheme='teal'>
            <TableCaption>Lista de pedidos Shopper</TableCaption>
            <Thead>
              <Tr>
                <Th>Pedido</Th>
                <Th>Entrega</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                orders&&orders.map((o,i)=>{
                  return(

                    <Tr key={o.id}>
                      <Td>{++i}</Td>
                      <Td>{new Date(o.delivery).toLocaleDateString()}</Td>
                    </Tr>
                  )
                })
              }

            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Pedido</Th>
                <Th>Entrega</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>

      </Flex>
    </>
  )
}

