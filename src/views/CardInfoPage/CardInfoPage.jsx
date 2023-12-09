import Cards from 'react-credit-cards-2';
import './customCard.css'
import Box from "@mui/material/Box";
export default function CardInfoPage() {
  return (
  <Box sx={{mt:5}}>
    <Cards
      className={"customCard"}
      number={'1234 1234 1234 1234'}
      expiry={'05/27'}
      cvc={'123'}
      name={'User whoever'}
      focused={true}
    />
  </Box>
  );
}