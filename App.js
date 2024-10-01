import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = 'https:// 66f0bc4cf2a8bce81be6886d .mockapi.io / :endpoint';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({ nome: '', preco: '', descricao: '' });

  // Função para listar produtos
  const listarProdutos = async () => {
    const response = await axios.get(apiUrl);
    setProdutos(response.data);
  };

  // Função para adicionar um novo produto
  const adicionarProduto = async () => {
    await axios.post(apiUrl, novoProduto);
    listarProdutos();
  };

  // Função para remover um produto
  const removerProduto = async (id) => {
    await axios.delete(`${apiUrl}/${id}`);
    listarProdutos();
  };

  useEffect(() => {
    listarProdutos();
  }, []);

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <ul>
        {produtos.map(produto => (
          <li key={produto.id}>
            {produto.nome} - {produto.preco}
            <button onClick={() => removerProduto(produto.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <h2>Adicionar Produto</h2>
      <input 
        type="text" 
        placeholder="Nome" 
        value={novoProduto.nome} 
        onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })} 
      />
      <input 
        type="text" 
        placeholder="Preço" 
        value={novoProduto.preco} 
        onChange={(e) => setNovoProduto({ ...novoProduto, preco: e.target.value })} 
      />
      <button onClick={adicionarProduto}>Adicionar</button>
    </div>
  );
}

export default App;
