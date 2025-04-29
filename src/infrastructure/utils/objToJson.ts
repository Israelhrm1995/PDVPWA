type JsonObject = Record<string, any>;
type CampoAlias<T = JsonObject> = Record<string, keyof T>; // Ex: { CODPDV: "id" }

export function utilsObjToJson<T extends JsonObject>(
  nomeObjeto: string,
  origem: T,
  alias?: CampoAlias<T>
): JsonObject {
  const resultado: JsonObject = {};

  // 1️⃣ Aplica aliases: { CODPDV: "id" } → resultado[CODPDV] = origem["id"]
  const camposUsados = new Set<keyof T>();
  if (alias) {
    for (const [chaveFinal, campoOrigem] of Object.entries(alias)) {
      resultado[chaveFinal] = origem[campoOrigem];
      camposUsados.add(campoOrigem);
    }
  }

  // 2️⃣ Adiciona os demais campos, ignorando os que já foram usados por alias
  for (const [key, value] of Object.entries(origem)) {
    if (camposUsados.has(key)) continue; // pula se já foi usado via alias

    const chaveTransformada = transformaChave(key);
    if (!(chaveTransformada in resultado)) {
      resultado[chaveTransformada] = value;
    }
  }

  return {
    [nomeObjeto]: resultado
  };
}

function transformaChave(chave: string): string {
  return chave
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .toUpperCase();
}