import { useEffect, useState } from "react";
import "./styles.css";
import Header from "src/components/Header";
import Filter from "src/components/Filter";
import Table from "src/components/Table";
import Resume from "src/components/Resume";
import AddTransactionModal from "src/components/AddTransactionModal";
import EditTransactionModal from "src/components/EditTransactionModal";
import ProfileModal from "src/components/ProfileModal";
import { loadTransactions } from "src/utils/requisitions";

function Main(): JSX.Element {
  const [openModalProfile, setOpenModalProfile] = useState<boolean>(false);
  const [openModalAddTransaction, setOpenModalAddTransaction] =
    useState<boolean>(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [currentItemToEdit, setCurrentItemToEdit] = useState<any | null>(null);

  useEffect(() => {
    async function fetchTransactions() {
      const allTransactions: any[] = await loadTransactions();
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
