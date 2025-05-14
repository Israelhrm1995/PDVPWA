export async function getValorTotal():Promise<number> {
    
    return await item.service.calcularTotalPorIdMovimento();
  }