import { useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import type { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import type { AccordionSummaryProps } from "@mui/material/AccordionSummary";
import { accordionSummaryClasses } from "@mui/material/AccordionSummary";
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import type { Subtask as SubtaskType } from "./Subtask";
import Subtask from './Subtask';
import type { Action } from "./Tasks";

export type TaskType = {
  id: number;
  title: string;
  subtasks: SubtaskType[];
};

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
  borderRadius: '.8em',
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
  flexDirection: 'row',
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
      transform: 'rotate(90deg)',
    },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(255, 255, 255, .05)',
    
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(55, 54, 118, 0.13)',
  
  border: '#414eb4'
}));

export default function Task({
  task,
  dispatch,
}: {
  task: TaskType;
  dispatch: React.Dispatch<Action>;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <AccordionSummary>
        <Typography>{task.title}</Typography>
      </AccordionSummary>

      <AccordionDetails>
        {task.subtasks.map((subtask) => (
          <Subtask
            key={subtask.id}
            subtask={subtask}
            onStart={() =>
              dispatch({
                type: "START_SUBTASK",
                taskId: task.id,
                subtaskId: subtask.id,
              })
            }
            onDone={() =>
              dispatch({
                type: "DONE_SUBTASK",
                taskId: task.id,
                subtaskId: subtask.id,
              })
            }
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
}