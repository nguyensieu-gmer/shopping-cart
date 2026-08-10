import { Link } from "react-router";

export function Home() {
  return (
    <div>
      <h1>Hi there! What are you looking for today?</h1>
      <Link to="/shop">Shop Now</Link>
    </div>
  );
}
