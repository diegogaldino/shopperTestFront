import React from "react"

import {
  Tr,
  Td,
  IconButton,
  Flex,
  Button,
} from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'

export function ItemTable(props) {
  return (
    props.type === 'products' ? props.products.map(p => {
      return (
        <Tr key={p.id}>
          <Td>{p.name}</Td>
          <Td isNumeric>{p.price}</Td>
          {props.hasOwnProperty('addCart')&&
            <Td >
              <Flex justify="center">
                <Button
                  aria-label='Adicionar no carrinho'
                  icon={<AddIcon />}
                  colorScheme='teal'
                  variant='outline'
                  mx={1}

                  onClick={() => props.addCart(p)}
                >Adicionar</Button>
              </Flex>
            </Td>
          }
        </Tr>
      )
    })

    :

    props.type === 'cart' && props.cart.map(c => {
      return (
        <Tr key={c.id}>
          <Td>{c.name}</Td>
          <Td isNumeric>{c.price}</Td>
          <Td isNumeric>{c.qty}</Td>
          <Td isNumeric>{(c.qty * c.price).toFixed(2)}</Td>
          
          <Td >
            <Flex justify="center">
              <IconButton
                aria-label='Adicionar no carrinho'
                icon={<AddIcon />}
                colorScheme='teal'
                variant='outline'
                mx={1}

                onClick={() => props.addCart(c)}
              />

              <IconButton
                aria-label='Remover do carrinho'
                icon={<MinusIcon />}
                colorScheme='red'
                variant='outline'
                mx={1}

                onClick={() => props.removeCart(c)}
              />
            </Flex>
          </Td>
        </Tr>
      )
    })
  )
}