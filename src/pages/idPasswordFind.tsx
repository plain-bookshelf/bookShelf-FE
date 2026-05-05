import { useNavigate } from "react-router-dom";
import { Intro } from "../features/auth/idFind/intro";

/**
 *
 */
export default function IdPasswordFind() {
  const navigate = useNavigate();

  return <Intro onStart={() => navigate("/idFind")} />;
}

