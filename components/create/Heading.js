function Heading({ title, desc }) {
  return (
    <div className="mt-5 mb-5">
      <h1 className="font-bold text-2xl">{title}</h1>
      <p className="text-md">{desc}</p>
    </div>
  );
}

export default Heading;
