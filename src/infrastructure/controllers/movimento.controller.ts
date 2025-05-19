import { MovimentoService } from "../services/movimento.service";
import { Movimento } from "../models/movimento.model";
import { ItemService } from "../services/item.service";

export const cancelarMovimento = async () => {
  const movimento: Movimento = await MovimentoService.buscarPorStatus('A');

  await ItemService.deletarPorIdMovimento(movimento.id_movimento);

  return await MovimentoService.remover(movimento.id_movimento);
};