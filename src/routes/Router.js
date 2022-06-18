import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Products } from "../pages/Products";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { Signup } from "../pages/Signup";
import { StockList } from "../pages/StockList";


export function Router() {
  return(
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/products" element={<Products />}/>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/signup" element={<Signup />}/>
        <Route exact path="/stock" element={<StockList />}/>
      </Routes>
    </BrowserRouter>
  )
}