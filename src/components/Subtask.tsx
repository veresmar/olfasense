import Box from "@mui/material/Box";

export type Subtask = {
  id: number;
  title: string;
  duration: number; // сколько должно выполняться (сек/мин — решишь сама)
  status: "idle" | "running" | "done";
  startedAt: number | null; // timestamp
  elapsed: number; // сколько уже прошло (сек)
};

type Props = {
  subtask: Subtask;
  onStart: () => void;
  onDone: () => void;
};


export default function Subtask({ subtask, onStart, onDone }: Props) {
  return (
    <Box component="div" display="flex" flexDirection='row' gap={2} sx={{
      border: "1px solid red",
      backgroundColor: "#fff3cd"
      }}>
      <Box component="span">
        {subtask.title}
      </Box>
      <Box component="div" display="flex" flexDirection='row' gap={2}>
        <button onClick={onStart}>Start</button>
        <button onClick={onDone}>Done</button>
      </Box>
    </Box>
  );
}