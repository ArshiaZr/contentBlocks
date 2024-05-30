import buttonStyles from "../styles/ui/button.module.scss";
import { useAtom } from "jotai";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { loadingAtom } from "../utils/atoms";

export default function Button({ onClick, title, type = "button" }) {
  const [loading, setLoading] = useAtom(loadingAtom);

  return (
    <button
      type={type}
      className={`w-full ${buttonStyles.button} ${buttonStyles.primary} ${
        loading ? buttonStyles.loading : ""
      }`}
      disabled={loading}
    >
      {loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : title}
    </button>
  );
}
