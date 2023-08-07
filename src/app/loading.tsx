import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <CircularProgress />
    </div>
  );
};

export default Loading;