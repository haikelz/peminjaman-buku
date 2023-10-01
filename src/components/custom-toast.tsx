import { toast } from "react-hot-toast";

type CustomToastProps = {
  text: string;
  status: "error" | "success";
};

export default function customToast({ text, status }: CustomToastProps) {
  if (status === "error") {
    return toast.error(text, {
      style: {
        fontWeight: "bold",
      },
    });
  }

  if (status === "success") {
    return toast.success(text, {
      style: {
        fontWeight: "bold",
      },
    });
  }
}
