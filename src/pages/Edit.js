import { useSearchParams, useNavigate } from "react-router-dom";

const Edit = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const id = searchParams.get("id");
  console.log(id);

  const mode = searchParams.get("mode");
  console.log(mode);

  const onClickHome = () => {
    navigate("/home");
  };

  return (
    <>
      <h1>Edit</h1>
      <p>This is edit</p>
      <button onClick={onClickHome}>TO HOME</button>
    </>
  );
};
export default Edit;
