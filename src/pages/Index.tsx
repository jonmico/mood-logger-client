import { Link } from "react-router";

export default function Index() {
  return (
    <div>
      <div>This is the index page.</div>
      <div>
        <Link to={"/dashboard"}>Here is a link to the dashboard.</Link>
      </div>
    </div>
  );
}
