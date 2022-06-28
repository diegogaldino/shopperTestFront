import { Flex, Image, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logo from "../../img/shopper_logo_c96d7a0414.png"
import { goToHome, goToOrderList, goToProducts, goToSignup, goToStockList } from "../../routes/Coordinator";
import { useLocation } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate()
  const location = useLocation();
  
  return (
    <Flex as="header" justify="center" align="center" p={1} borderBottom="1px">
      <Flex w="70%" justify="space-between" align="center" >
        <Image w={200} m={2} src={logo} onClick={() => goToProducts(navigate)} cursor="pointer" />
        {
          localStorage.getItem("token") ? (
            <Flex justify="center" alignItems="center">
              <Link
                px={2}
                color="teal"
                display="block"
                onClick={() => goToProducts(navigate)}
              >
                Produtos
              </Link>
              
              <Link
                px={2}
                color="teal"
                display="block"
                onClick={() => goToStockList(navigate)}
              >
                Estoque
              </Link>
              
              <Link
                px={2}
                color="teal"
                display="block"
                onClick={() => goToOrderList(navigate)}
              >
                Meus pedidos
              </Link>

              <Link
                px={2}
                onClick={() => goToHome(navigate) & localStorage.removeItem("token")}
                color="teal"
                display="block"
              >
                Sair
              </Link>
            </Flex>
          )
          :
          location.pathname==="/signup"?
          (
            <Flex justify="center" alignItems="center">
              <Link
                px={2}
                onClick={() => goToHome(navigate)}
                color="teal"
                display="block"
              >
                Entrar
              </Link>
            </Flex>
          ):
          (
            <Flex justify="center" alignItems="center">
              <Link
                px={2}
                onClick={() => goToSignup(navigate)}
                color="teal"
                display="block"
              >
                Criar conta
              </Link>
            </Flex>
          )
        }
      </Flex>
    </Flex>
  )
}