import BotaoConclui from './componentes/concluiTarefa.js'
import BotaoDeleta from './componentes/deletaTarefa.js'

//criando uma funcao so para a parte de datas e valores   
const handleNovoItem = (evento)=>{
    evento.preventDefault();
    const lista = document.querySelector('[data-list]')
    const input = document.querySelector('[data-form-input]')
    const valor = input.value

    var calendario = document.querySelector(".data-hora");
    //ultilizando o moment para capturar a data no formato desejado
    var data = moment(calendario.value);
    var dataFormatada = data.format('DD/MM/YYYY');

    const dados = {
        valor,
        dataFormatada
    }
    //criando uma variavel para salvar os valores das tarefas e se for nulo cria um arrary
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || []
    //pega o objeto e preeche com os dados
    const tarefasAtualizadas = [...tarefas, dados];
    
    //adicionando na lista a tarefa
    const criaTarefa = criarTarefa(dados);
    lista.appendChild(criaTarefa);
    input.value = " ";
    //armazenando os dados com localStorage e passando as tarefas para string
    localStorage.setItem("tarefas", JSON.stringify(tarefasAtualizadas));
}
//criando uma funcao para só a criacao de tarefas
    const criarTarefa = ({valor, dataFormatada}) => {
    //criando a li e adicionando uma classe a ela
    const tarefa = document.createElement('li');
    tarefa.classList.add('task');
    //criando o conteudo da li com templates
    const conteudo = `<p class="content">${dataFormatada} * ${valor}</p>`
    //adicionando o conteudo na li
    tarefa.innerHTML = conteudo

    //adionando na ul os botoes e
    tarefa.appendChild(BotaoConclui());
    tarefa.appendChild(BotaoDeleta());
   
    return tarefa;
}

const novaTarefa = document.querySelector('[data-form-button]');
//escutando o botao de clique e executando a funcao
novaTarefa.addEventListener('click', handleNovoItem);