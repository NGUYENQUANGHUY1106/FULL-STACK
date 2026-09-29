function B(props) {
  const xx = props.user;

  function renderUser() {
    if (xx.length > 0) {
      return xx.map((value, key) => {
        return (
          <li>
            <p key={key}>ID :{value.id}</p>
            <p>Name :{value.name}</p>
            <p>-username : {value.username}</p>
            <p>-email : {value.email}</p>
            <ul>
              -address :<li>+ street : {value.address.street}</li>
              <li>+ suite : {value.address.suite}</li>
            </ul>

            <p>-phone : {value.phone}</p>
            <p>-phone : {value.phone}</p>
            <p>-website : {value.website}</p>



            <ul>
              -Company :
              <li>+ name : {value.company.name}</li>
              <li>+ catchPhrase : {value.company.catchPhrase}</li>
            </ul>
          </li>
        );
      });
    }
  }

  return <ul style={{display: 'flex', gap: '10px', textAlign: 'left'}}>{renderUser()}</ul>;
}
export default B;
