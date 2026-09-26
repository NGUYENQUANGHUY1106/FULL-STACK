function Mailbox(props) {
  // nhận data bằng props
  const xx = props.data;
  return (
    <div>
      <h1>Hello</h1>
      {xx.length > 0 && <h2>You have {xx.length}</h2>}
    </div>
  );
}
export default Mailbox;