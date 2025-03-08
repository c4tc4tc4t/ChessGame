import axios from 'axios';
import { stockFishRequest, bestMoveStockFish } from '../../otherFunctions/APIRequest';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("stockFishRequest", () => {
  
  it("Deve retornar os melhores movimentos quando a API responde corretamente", async () => {
    const mockResponse: bestMoveStockFish[] = [
      { move: "e2e4", score: 50 },
      { move: "d2d4", score: 40 }
    ];

    mockedAxios.get.mockResolvedValue({ data: { bestmoves: mockResponse } });

    const result = await stockFishRequest("some FEN string");

    expect(result).toEqual(mockResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000', { params: { fen: "some FEN string" } });
  });

  it("Deve lançar erro quando a API retorna erro", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Erro na API"));

    await expect(stockFishRequest("some FEN string")).rejects.toThrow("Erro na API");

    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000', { params: { fen: "some FEN string" } });
  });
});
