import { useEffect, useState } from "react";
import "./styles.css";
import Header from "./../../components/Header";
import Filter from "./../../components/Filter";
import Table from "./../../components/Table";
import Resume from "./../../components/Resume";
import AddTransactionModal from "./../../components/AddTransactionModal";
import EditTransactionModal from "./../../components/EditTransactionModal";
import ProfileModal from "./../../components/ProfileModal";
import { loadTransactions } from "./../../utils/requisitions";

interface Transaction {
  id: string;
  data: string;
  descricao: string;
  categoria_id: string;
  categoria_nome: string;
  tipo: string;
  valor: number | string;
}

function Main(): JSX.Element {
  const [openModalProfile, setOpenModalProfile] = useState<boolean>(false);
  const [openModalAddTransaction, setOpenModalAddTransaction] =
    useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [currentItemToEdit, setCurrentItemToEdit] =
    useState<Transaction | null>(null);

  useEffect(() => {
    async function fetchTransactions() {
      const allTransactions: Transaction[] = await loadTransactions();
      setTransactions(allTransactions);
    }
    fetchTransactions();
  }, []);

  return (
    <div className="container-main">
      <Header handleEditProfile={() => setOpenModalProfile(true)} />
      <section>
        <div className="width-limit">
          <div className="container-data">
            <div className="container-left">
              <Filter setTransactions={setTransactions} />
              <Table
                transactions={transactions}
                setTransactions={setTransactions}
                setOpenModalEdit={setOpenModalEdit}
                setCurrentItemToEdit={setCurrentItemToEdit}
              />
            </div>
            <div className="container-right">
              <Resume transactions={transactions} />
              <button
                className="btn-purple btn-small"
                onClick={() => setOpenModalAddTransaction(true)}
              >
                Adicionar Registro
              </button>
            </div>
          </div>
        </div>
      </section>
      <AddTransactionModal
        open={openModalAddTransaction}
        handleClose={() => setOpenModalAddTransaction(false)}
        setTransactions={setTransactions}
      />
      <EditTransactionModal
        open={openModalEdit}
        setTransactions={setTransactions}
        handleClose={() => setOpenModalEdit(false)}
        currentItemToEdit={currentItemToEdit}
      />
      <ProfileModal
        open={openModalProfile}
        handleClose={() => setOpenModalProfile(false)}
      />
    </div>
  );
}

export default Main;
