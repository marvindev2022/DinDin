import "./styles.css";

interface Category {
  id: string;
  descricao: string;
  checked: boolean;
}

interface ConfirmChipProps {
  id: string | number;
  title: string;
  checked: boolean;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

function Chip({
  id,
  title,
  checked,
  categories,
  setCategories,
}: ConfirmChipProps): JSX.Element {
  function handleCheckCategory() {
    const localCategories: Category[] = [...categories];

    localCategories.forEach((category: Category) => {
      if (category.id === id) {
        category.checked = !category.checked;
      }
    });

    setCategories([...localCategories]);
  }

  return (
    <div
      className={`container-chip ${checked ? "checked" : "unchecked"}`}
      onClick={handleCheckCategory}
    >
      <span>{title}</span>
      {checked ? "x" : "+"}
    </div>
  );
}

export default Chip;
