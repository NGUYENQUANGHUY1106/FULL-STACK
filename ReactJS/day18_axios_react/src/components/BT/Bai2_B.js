function Bai2_B(props) {
  let data = props.data;
  console.log(data);

  function dataRender() {
    if (data) {
      return (
        <>
          <p>{data.id}</p>
          <p>{data.name}</p>
          <p>{data.username}</p>
          <p>{data.email}</p>
          <p>
            Address :
            <br />
            <p>{data.address.street}</p>
            <p>{data.address.suite}</p>
          </p>
          <p>{data.address.website}</p>
          <p>{data.address.phone}</p>
          <p>
            Company :
            <br />
            <p>{data.company.name}</p>
            <p>{data.company.catchPhrase}</p>
          </p>
        </>
      );
    }
  }
  return <>{dataRender()}</>;
}
export default Bai2_B;
