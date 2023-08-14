import { useState } from 'react';
import './App.css';

function App() {
  // estado vai comecar como objeto que vai ser atualizado
  const [endereco, setEndereco] = useState({})

  function manipularEndereco (evento) {
    const cep = evento.target.value

    // passando o objeto
    setEndereco({
      cep
    })

    // verificando o cep
    if(cep && cep.length === 8) {
      // indo la na api viacep, ${cep} usuario vai passar o cep
      fetch(`https://viacep.com.br/ws/${cep}/json/`)

      // pegando a resposta e transformando em json
      .then(resposta => resposta.json())

      // pegando os dados que vai ser atualizados frequentemente com a troca de cep
      .then(dados => {

        // vai permitir atualizando o estado
        setEndereco(cep => {
          return {
            ...cep,
            bairro: dados.bairro,
            cidade: dados.localidade,
            rua: dados.logradouro,
            estado: dados.uf
          }
        })
      })
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* formulario do cep */}
        <form className='form'>
          <label>Digite o CEP</label>
          <input placeholder='01032001' onChange={manipularEndereco} />
        </form>

        {/* resultado da busca do cep */}
        <ul>
          {/* informaçoes do resulltado*/}
          <li>CEP: {endereco.cep}</li>
          <li>Bairro: {endereco.bairro}</li>
          <li>Cidade: {endereco.cidade}</li>
          <li>Rua: {endereco.rua}</li>
          <li>Estado: {endereco.estado}</li>
        </ul>
      </header>
    </div>
  );
}

export default App;
