import './styles.css';

interface ConfirmChip{
     id:string | number, title:string, checked:boolean, categories:string[], setCategories:any
}
function Chip({ id, title, checked, categories, setCategories }:ConfirmChip) {

    function handleCheckCategorie() {
        const localCategories:string[] = [...categories];

        localCategories.forEach((categorie:any) => {
            if (categorie.id === id) {
                categorie.checked = !categorie.checked;
            }
        });

        setCategories([...localCategories]);

    }

    return (
        <div
            className={`container-chip ${checked ? 'checked' : 'unchecked'}`}
            onClick={handleCheckCategorie}
        >
            <span>{title}</span>
            {checked ? 'x' : '+'}
        </div>
    );
}

 export default Chip;