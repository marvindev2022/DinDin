import './styles.css';
interface ConfirmProps {
  open: boolean;
  handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleConfirm: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
function Confirm({ open, handleClose, handleConfirm }:ConfirmProps):JSX.Element {
    return (
        <>
            {open &&
                <div className='container-confirm'>
                    <div className='arrow-up'>

                    </div>
                    <span>Apagar item?</span>
                    <div className='container-buttons'>
                        <button
                            className='btn-extra-small btn-blue'
                            onClick={handleConfirm}
                        >
                            Sim
                        </button>
                        <button
                            className='btn-extra-small btn-red'
                            onClick={handleClose}
                        >
                            Não
                        </button>
                    </div>
                </div>
            }
        </>
    );
}

export default Confirm;