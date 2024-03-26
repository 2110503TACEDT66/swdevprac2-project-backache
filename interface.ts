interface BookItem {
    _id: string;
    bookDate: string;
    user: string;
    dentist: {
        name: string;
    };
}
interface DentistItem {
    _id: string;
    name: string;
    year_exp: number;
    clinic: string;
    booking: BookItem[]
}