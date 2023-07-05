import { TableCell, TableRow, styled } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const EmptyTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#fff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const ColumnTableCell = styled(TableCell)(({ theme }) => ({
  padding: "15px",
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.mode === "dark" ? "#232323" : "#EBEEFE",
    color: theme.palette.mode === "dark" ? "#fff" : "#000",
    textTransform: "capitalize",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const RowTableCell = styled(TableCell)(({ theme }) => ({
  padding: "10px",
}));
