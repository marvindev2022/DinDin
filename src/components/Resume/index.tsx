import { useEffect, useState } from "react";
import api from "../../services/api";
import { formatToMoney } from "../../utils/formatters";
import { notifyError } from "../../utils/notifications";
import { getItem } from "../../utils/storage";
import "./styles.css";
interface Transaction {
  id: string;
  data: string;
  descricao: string;
  categoria_id: string;
  categoria_nome: string;
  tipo: string;
  valor: number | string;
}
interface ResumeProp {
  transactions: Transaction[];
}
type Extract = {
  in: number | string;
  out: number | string;
  balance: number | string;
};
function Resume({ transactions }: ResumeProp) {
  const [extract, setExtract] = useState<Extract>({
    in: 0,
    out: 0,
    balance: 0,
  });

  useEffect(() => {
    const token = getItem("token");

    async function loadExtract() {
      try {
        const response = await api.get("/transacao/extrato", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status > 204) {
          return notifyError(response.data);
        }

        const { entrada, saida } = response.data;

        setExtract({
          in: formatToMoney(Number(entrada) / 100),
          out: formatToMoney(Number(saida) / 100),
          balance: formatToMoney(Number(entrada - saida) / 100),
        });
      } catch (error: unknown) {
        notifyError((error as any).response.data);
      }
    }

    loadExtract();
  }, [transactions]);

  return (
    <div className="container-resume">
      <h1>Resumo</h1>
      <div className="line-resume">
        <span>Entradas</span>
        <span className="in">{extract.in}</span>
      </div>
      <div className="line-resume">
        <span>Saídas</span>
        <span className="out">{extract.out}</span>
      </div>
      <div className="horizontal-line"></div>
      <div className="line-resume">
        <h3>Saldo</h3>
        <span className="resume">{extract.balance}</span>
      </div>
    </div>
  );
}

export default Resume;
