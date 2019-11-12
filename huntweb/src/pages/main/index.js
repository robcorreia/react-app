import React, { Component } from 'react';
import api from '../../services/api';

import './styles.css'

export default class Main extends Component {
  //armazenar variaveis no react
  state = {
    products: [],
  }

  //metodo executado assim que o component for mostrado em tela
  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async () => {
    const response = await api.get('/products');

    /* console.log(response.data.docs); */

    //aqui eu seto um valor dentro da variavel products que está no state 
    this.setState( { products: response.data.docs});
  };

  render() {
    const { products} = this.state; //desestruturação do objeto
    
    /* return {<h1>Contagem de produtos: {this.state.products.length}</h1>; */
    return (
      <div className="product-list">
        {products.map(product => (
          /* <h2 key={product._id}>{product.title}</h2> */ //key serve para retirar o erro do console que o react pede para passar um valor unico para cada item do map, no caso foi passado o id
          <article key={product._id}>
            <strong>{product.title}</strong>
            <p>{product.description}</p>

            <a href="">Acessar</a>
          </article>
        
        ))}
      </div>
    )
  }
}

