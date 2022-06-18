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
} from '@chakra-ui/react'

import axios from "axios";
import { baseURL, config } from "../../parameters";
import { Header } from "../../components/Header";
import { ItemTable } from "../../components/ItemTable";

export function StockList() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    getAllProducts()
  }, [])

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${baseURL}/product/all`, config)
      if (response.data.products) setProducts(response.data.products)

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
            <Heading size='xl'>Estoque de produtos</Heading>
          </Flex>
          <Table variant='striped' colorScheme='teal'>
            <TableCaption>Estoque de produtos oferecidos Shopper</TableCaption>
            <Thead>
              <Tr>
                <Th>Produto</Th>
                <Th isNumeric>Quantidade</Th>
              </Tr>
            </Thead>
            <Tbody>
              <ItemTable
                products={products}
                type={'products'}
              />
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Produto</Th>
                <Th isNumeric>Quantidade</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>

      </Flex>
    </>
  )
}

