import React, { useEffect, useState } from "react";
import ArrowDown from "../../assets/arrow-down.svg";
import ArrowUp from "../../assets/arrow-up.svg";
import DeleteIcon from "../../assets/delete-icon.svg";
import EditIcon from "../../assets/edit-icon.svg";
import api from "src/services/api";
import {
  formatToDate,
  formatToMoney,
  formatToWeekDay,
} from "src/utils/formatters";
import { notifyError, notifySucess } from "src/utils/notifications";
import { loadTransactions } from "src/utils/requisitions";
import { getItem } from "src/utils/storage";
import Confirm from "src/components/Confirm";
import "./styles.css";

interface Transaction {
  id: string;
  data: string;
  descricao: string;
  categoria_id: string;
  categoria_nome: string;
  tipo: string;
  valor: number;
}

interface TableProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  setOpenModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentItemToEdit: React.Dispatch<React.SetStateAction<any>>;
}

function Table({
  transactions,
  setTransactions,
  setOpenModalEdit,
  setCurrentItemToEdit,
}: TableProps) {
  const token = getItem("token");

  const [asc, setAsc] = useState<Boolean>(true);
  const [openConfirm, setOpenConfirm] = useState<Boolean>(false);
  const [currentItem, setCurrentItem] = useState<Transaction | null>(null);

  const [orderedTransactions, setOrderedTransactions] = useState([]);

  function handleOpenConfirm(transact: any) {
    setCurrentItem(transact);
    setOpenConfirm(!openConfirm);
  }

  async function handleDeleteItem() {
    try {
      const response = await api.delete(
        `/transacao/${currentItem?.id as string}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status > 204) {
        return notifyError(response.data);
      }

      notifySucess("Transação excluída.");

      const allTransactions = await loadTransactions();

      setTransactions([...allTransactions]);
    } catch (error: any) {
      notifyError(error.response.data);
    } finally {
      setOpenConfirm(false);
    }
  }

  function handelOpenEdit(transact: any) {
    setOpenModalEdit(true);
    setCurrentItemToEdit(transact);
  }

  function compareTransactions(a: Transaction, b: Transaction): number {
    const dateA = new Date(a.data);
    const dateB = new Date(b.data);
    return asc
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();
  }

  useEffect(() => {
    const localTransactions: Transaction[] = [...transactions];

    localTransactions.sort(compareTransactions);
    setOrderedTransactions([...localTransactions]);
  }, [asc, transactions]);

  return (
    <div className="container-table">
      <div className="table-head">
        <div
          className="table-column-small content-date"
          onClick={() => setAsc(!asc)}
        >
          <strong>Data</strong>
          <img src={asc ? ArrowUp : ArrowDown} alt="order" />
        </div>
        <strong className="table-column-middle">Dia da semana</strong>
        <strong className="table-column-big">Descrição</strong>
        <strong className="table-column-small">Categoria</strong>
        <strong className="table-column-small">Valor</strong>
        <div className="table-column-small"></div>
      </div>

      <div className="table-body">
        {orderedTransactions.map((transact: any) => {
          return (
            <div className="table-row" key={transact.id}>
              <strong className="table-column-small content-date">
                {formatToDate(transact.data)}
              </strong>
              <span className="table-column-middle">
                {formatToWeekDay(transact.data)}
              </span>
              <span className="table-column-big">
                {transact.descricao === "" ? "-" : transact.descricao}
              </span>
              <span className="table-column-small">
                {transact.categoria_nome}
              </span>
              <strong
                className={`table-column-small values ${
                  transact.tipo === "entrada"
                    ? "positive-value"
                    : "negative-value"
                }`}
              >
                {parseFloat(Number(formatToMoney(transact.valor) / 100))
                  .toFixed(2)
                  .replace(".", ",")}
              </strong>
              <div className="table-column-small action-buttons">
                <img
                  src={EditIcon}
                  alt="edit"
                  onClick={() => handelOpenEdit(transact)}
                />
                <img
                  src={DeleteIcon}
                  alt="delete"
                  onClick={() => handleOpenConfirm(transact)}
                />
              </div>
              <Confirm
                open={openConfirm && transact?.id === currentItem?.id}
                handleClose={() => setOpenConfirm(false)}
                handleConfirm={handleDeleteItem}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Table;
