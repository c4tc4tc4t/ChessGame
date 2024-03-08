import axios from 'axios';



export async function stockFishRequest(fen: string): Promise<string> {
  const apiUrl = 'http://localhost:3000';
  const params = { fen };

  return await axios.get(apiUrl, { params })
    .then(response => {
      console.log('Resposta da API:', response.data);
      return response.data;
    })
    .catch(error => {

      console.error('Erro ao fazer a solicitação:', error);
      throw error;
    });
}
