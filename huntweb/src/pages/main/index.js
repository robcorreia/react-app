import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css'

export default class Main extends Component {
  //armazenar variaveis no react
  state = {
    products: [],
    productInfo: {},
    page: 1,
  }

  //metodo executado assim que o component for mostrado em tela
  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);

    /* console.log(response.data.docs); */

    //ta pegando o restante de todas informações e armaenando na variavel prodcInfo (dados que vem do response.data)
    const { docs, ...productInfo } = response.data;

    //aqui eu seto um valor dentro da variavel products que está no state 
    this.setState( { products: docs, productInfo, page });
  };

  //metodos para trocar de página

  prevPage = () => {
    const { page, productInfo } = this.state;

    if(page === 1) return;

    const pageNumber = page - 1;

    this.loadProducts(pageNumber);
  }

  nextPage = () => {
    const { page, productInfo } = this.state;

    //se a pagina for a ultima ele retorna (.pages pega o total de paginas)
    if( page === productInfo.pages) return;

    const pageNumber = page + 1;

    this.loadProducts(pageNumber);
  }



  render() {
    const { products, page, productInfo} = this.state; //desestruturação do objeto
    
    /* return {<h1>Contagem de produtos: {this.state.products.length}</h1>; */
    return (
      <div className="product-list">
        {products.map(product => (
          /* <h2 key={product._id}>{product.title}</h2> */ //key serve para retirar o erro do console que o react pede para passar um valor unico para cada item do map, no caso foi passado o id
          <article key={product._id}>
            <strong>{product.title}</strong>
            <p>{product.description}</p>

            <Link to={`/products/${product._id}`}>Acessar</Link>
          </article>
        
        ))}
        <div className="actions">
          <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
          <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próximo</button>
        </div>
      </div>
    )
  }
}

