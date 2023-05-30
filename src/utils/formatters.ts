import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function capitalizeWord(word:string) {
    return word[0].toUpperCase() + word.slice(1, word.length);
}

export function formatToDate(date:string) {
    const generatedDate = new Date(date);

    return format(generatedDate, 'dd/MM/yyyy');
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