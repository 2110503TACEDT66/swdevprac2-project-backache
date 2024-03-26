// // components/BookingForm.tsx
// import { DatePicker } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { Select, MenuItem } from "@mui/material";

// interface BookingFormProps {
//   dentists: any[];
//   onSubmit: (data: FormData) => void;
// }

// export default function BookingForm({ dentists, onSubmit }: BookingFormProps) {
//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="dentist">Dentist ID</label>
//         <Select id="dentist" name="dentist">
//           {dentists.map((dentist: any) => (
//             <MenuItem key={dentist.id} value={dentist.id}>
//               {dentist.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </div>
//       <div>
//         <label htmlFor="bookDate">Booking Date</label>
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DatePicker className="bg-white" value={new Date()} />
//         </LocalizationProvider>
//       </div>
//       <button type="submit">Create Booking</button>
//     </form>
//   );
// }