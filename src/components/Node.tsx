import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import colors from "../constants/colors";
import Status from "./Status";
import { Node as NodeType } from "../types/Node";

type Props = {
  node: NodeType;
  expanded: boolean;
  toggleNodeExpanded: (node: NodeType) => void;
};

const AccordionRoot = styled(Accordion)({
  margin: "16px 0",
  boxShadow: "0px 3px 6px 1px rgba(0,0,0,0.15)",

  "&:before": {
    backgroundColor: "unset",
  },
});

const AccordionSummaryContainer = styled(AccordionSummary)({
  padding: "0 24px",
  "& .MuiAccordionSummary-content": {
    margin: "10px 0 !important", // Avoid change of sizing on expanded
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: colors.faded,
  },
});

const BoxSummaryContent = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  paddingRight: 20,
});

const TypographyHeading = styled(Typography)({
  fontSize: 17,
  display: "block",
  color: colors.text,
  lineHeight: 1.5,
});

const TypographySecondaryHeading = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: colors.faded,
  lineHeight: 2,
}));

const AccordionDetailsBlock = styled(Typography)(({ theme }) => ({
  background: 'rgba(0, 0, 0, 0.12)',
  borderRadius: '2px',
  padding: '10px',
  marginTop: '4px',
}));

const AccordionBlockHeading = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '10px',
  lineHeight: '16px',
  color: colors.blue,
}));

const AccordionBlockParagraph = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: '0.25px',
  color: colors.text,
}));

const NoBlockFound = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: '0.25px',
  color: colors.danger,
}));

const Node: React.FC<Props> = ({ node, expanded, toggleNodeExpanded }) => {
  return (
    <AccordionRoot
      elevation={3}
      expanded={expanded}
      onChange={() => toggleNodeExpanded(node)}
    >
      <AccordionSummaryContainer expandIcon={<ExpandMoreIcon />}>
        <BoxSummaryContent>
          <Box>
            <TypographyHeading variant="h5">
              {node.name || "Unknown"}
            </TypographyHeading>
            <TypographySecondaryHeading variant="subtitle1">
              {node.url}
            </TypographySecondaryHeading>
          </Box>
          <Status loading={node.loading} online={node.online} />
        </BoxSummaryContent>
      </AccordionSummaryContainer>
      <AccordionDetails>
        {node.block.length ? node.block.map(({ id, attributes }, i) => (
          <AccordionDetailsBlock key={id}>
            <AccordionBlockHeading>00{i + 1}</AccordionBlockHeading>
            <AccordionBlockParagraph>{attributes.data}</AccordionBlockParagraph>
          </AccordionDetailsBlock>
        )) : <NoBlockFound>No Blocks Found</NoBlockFound>}
      </AccordionDetails>
    </AccordionRoot>
  );
};

export default Node;
