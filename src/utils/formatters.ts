import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function capitalizeWord(word:string) {
    return word[0].toUpperCase() + word.slice(1, word.length);
}

export function formatToDate(date:string) {
    const generatedDate = new Date(date);

    return format(generatedDate, 'dd/MM/yyyy');
}
export function validateFormatDate(date:any){
let day;
let month;
let year;
if (date.length === 8) {
  day = `${date[0]}${date[1]}`;
  month = `${date[2]}${date[3]}`;
  year = `${date[4]}${date[5]}${date[6]}${date[7]}`;
} else {
  day = `${date[0]}${date[1]}`;
  month = `${date[3]}${date[4]}`;
  year = `${date[6]}${date[7]}${date[8]}${date[9]}`;
}
const dateFormated = {
  day,
  month,
  year,
};
return dateFormated;
}

export function formatToWeekDay(date:string) {
    const generatedDate = new Date(date);

    const weekDay = format(generatedDate, 'eee', {
        locale: ptBR
    });

    return capitalizeWord(weekDay);
}

export function formatToMoney(value:string|number) {
    return value.toLocaleString('pt-br',
        { style: 'currency', currency: 'BRL' }
    );
}