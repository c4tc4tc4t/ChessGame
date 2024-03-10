import axios from 'axios';



export async function stockFishRequest(fen: string): Promise<bestMoveStockFish[]> {
  const apiUrl = 'http://localhost:3000';
  const params = { fen };

  return await axios.get(apiUrl, { params })
    .then(response => {
      return response.data.bestmoves
    })
    .catch(error => {

      console.error('Erro ao fazer a solicitação:', error);
      throw error;
    });
}

export interface bestMoveStockFish {
  move: string,
  score: number
}
