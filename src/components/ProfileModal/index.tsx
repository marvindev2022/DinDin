import { FormEvent, useEffect, useState } from "react";
import CloseIcon from "../../assets/close-icon.svg";
import api from "../../services/api";
import { notifyError, notifySucess } from "../../utils/notifications";
import { getItem, setItem } from "../../utils/storage";
import "./styles.css";

interface ProfileProps {
  open: boolean;
  handleClose:  React.Dispatch<React.SetStateAction<boolean>>;
}

interface DefaultForm {
  name: string | null;
  email: string | null;
  password: string;
  confirmPassword: string;
}

const defaultForm: DefaultForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function ProfileModal({ open, handleClose }: ProfileProps): JSX.Element {
  const token = getItem("token");

  const [form, setForm] = useState<DefaultForm>({ ...defaultForm });

  function handleChangeForm(event: React.ChangeEvent<HTMLInputElement>): void {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();

    try {
      if (
        !form.name ||
        !form.email ||
        !form.password ||
        !form.confirmPassword
      ) {
        return notifyError("Todos os campos são obrigatórios.");
      }

      if (form.password !== form.confirmPassword) {
        return notifyError("As senhas precisam ser iguais.");
      }

      const {data,status} = await api.put(
        `/usuario/${getItem("userId")}/editar`,
        {
          nome: form.name,
          email: form.email,
          senha: form.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (status > 204) {
        return notifyError(data);
      }

      setItem("userName", form.name);

      notifySucess("Perfil atualizado.");

      handleClose(true);
      handleClearForm();
    } catch (error: any) {
      notifyError(error.response.data.mensagem);
    }
  }

  function handleClearForm(): void {
    setForm({ ...defaultForm });
  }

  useEffect(() => {
    async function loadUserProfile() {
      try {
        const {data}= await api.get("/usuario", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { nome, email } = data;

        setForm({
          name: nome,
          email: email,
          password: "",
          confirmPassword: "",
        });
      } catch (error: any) {
        notifyError(error.response.data.mensagem);
      }
    }

    if (open) {
      loadUserProfile();
    }
  }, [open, token]);
  return (
    <>
      {open && (
        <div className="backdrop">
          <div className="modal">
            <img
              className="close-button"
              src={CloseIcon}
              alt="close-button"
              onClick={() => handleClose(false)}
            />
            <h2>Editar Perfil</h2>
            <form onSubmit={handleSubmit}>
              <div className="container-inputs">
                <label>Nome</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChangeForm}
                  required
                />
              </div>
              <div className="container-inputs">
                <label>E-mail</label>
                <input
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={handleChangeForm}
                  required
                />
              </div>
              <div className="container-inputs">
                <label>Senha</label>
                <input
                  type="password"
                  name="password"
                  value={form.password ?? ""}
                  onChange={handleChangeForm}
                  required
                />
              </div>
              <div className="container-inputs">
                <label>Confirmação de senha</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword ?? ""}
                  onChange={handleChangeForm}
                  required
                />
              </div>
              <button className="btn-purple btn-small">Confirmar</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
export default ProfileModal;
