import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import MinusIcon from "@mui/icons-material/Remove";
import { styled } from "@mui/system";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  paddingTop: 0,
  paddingBottom: 0,
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  "&.expanded": {
    transform: "rotate(180deg)",
  },
}));

const ExpandButton = ({ hide, isOpen, onClick }) => {
  return (
    <StyledIconButton onClick={onClick} className={isOpen ? "expanded" : ""}>
      {hide ? null : isOpen ? (
        <AddIcon size="small" />
      ) : (
        <MinusIcon size="small" />
      )}
    </StyledIconButton>
  );
};

export default ExpandButton;
