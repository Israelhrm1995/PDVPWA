import { executarCargaGeral } from "@/infrastructure/services/externo/carga/carga.service";
import { doLogin } from "@/infrastructure/services/externo/login.service";
import { DialogType } from "@sankhyalabs/ezui/dist/types/utils";
import {
  EzButton,
  EzModalContainer,
  EzNumberInput,
  EzPopup,
  EzTextInput,
} from "@sankhyalabs/ezui/react/components";
import { RefObject, useState } from "react";

type PagamentoModal = {
    popUpRef: RefObject<HTMLEzPopupElement>;
    dialog: RefObject<Partial<any>>;
}

export default function PagamentoModal({ popUpRef, dialog }: PagamentoModal) {
  const [url, setUrl] = useState<string>("");
  const [usuario, setUsuario] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [empresa, setEmpresa] = useState<number>();
  const [serie, setSerie] = useState<string>("");

  const handleLogin = async () => {
    try {
      await doLogin(usuario, senha, url);
      console.log("✅ Login realizado com sucesso!");

      await executarCargaGeral(serie, empresa);
      console.log("📦 Carga de dados finalizada!");
    } catch (e: any) {
        console.log(e)
        dialog.current.show('Erro', e.message, "critical" as DialogType)
    }
  };

  return (
    <EzPopup
      ref={popUpRef}
      size="x-small"
      heightMode="auto"
      useHeader={false}
    >
      <EzModalContainer
        modalTitle="Login ERP"
        showCloseButton={false}
        // modalSubTitle="Bastante parecido com o modal"
        // onEzModalAction={() => (popUp.current.opened = false)}
      >
    <div>
      <EzTextInput
        label="URL da API"
        value={url}
        onEzChange={(e) => setUrl(e.target.value)}
      /><br />
      <EzTextInput
        label="Usuário"
        value={usuario}
        onEzChange={(e) => setUsuario(e.target.value)}
      /><br />
      <EzTextInput
        label="Senha"
        password={true}
        value={senha}
        onEzChange={(e) => setSenha(e.target.value)}
      /><br />
      <EzNumberInput
        label="Empresa"
        value={empresa}
        onEzChange={(e) => setEmpresa(Number(e.target.value))}
      /><br />
      <EzTextInput
        label="Serie"
        value={serie}
        onEzChange={(e) => setSerie(e.target.value)}
      /><br />
      <div className="flex justify-end gap-2">
        <EzButton onClick={() => popUpRef.current.opened = false} label="Cancelar" />
        <EzButton onClick={handleLogin} label="Entrar e Sincronizar" className="ez-button--primary" />
      </div>
    </div>
      </EzModalContainer>
    </EzPopup>
  );
}
