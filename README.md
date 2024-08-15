# ChessGame

ChessGame é um jogo de xadrez interativo onde os jogadores enfrentam a máquina usando o poderoso engine Stockfish. Este projeto foi desenvolvido usando React e TypeScript.

## Funcionalidades

- **Jogue contra a IA**: Desafie a inteligência artificial do Stockfish em partidas de xadrez.
- **Movimentos Agressivos**: A lógica especial `isAgressiveMove` avalia se a IA pode sacrificar uma peça ou a qualidade (troca de uma peça de maior valor por uma de menor valor) para obter uma posição vantajosa no jogo.


## Como Rodar o Projeto

### Pré-requisitos

Para rodar o ChessGame, você precisará clonar e configurar dois repositórios: o back-end (`chessApi`) e o front-end (`ChessGame`).

### Configuração

1. **Clone os repositórios**:
   ```bash
   git clone https://github.com/c4tc4tc4t/ChessGame.git
   git clone https://github.com/c4tc4tc4t/chessApi.git

2. **Instalação**:
  ```bash
  execute npm install em ambos os repositórios

3. **Execução**:
  ```bash
  npm start no diretório do jogo
  node chessApi.js no diretório da api

## Testes

Este projeto utiliza Jest para realizar testes unitários. Para rodar os testes, execute:

```bash
npm test
