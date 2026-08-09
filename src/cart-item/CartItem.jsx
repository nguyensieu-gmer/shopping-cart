export function CartItem({ item }) {
  return (
    <li key={item.id}>
      <img src={item.image} alt={item.title} />
      <h1>{item.quantity}</h1>
      <h2>{item.price}</h2>
    </li>
  );
}
