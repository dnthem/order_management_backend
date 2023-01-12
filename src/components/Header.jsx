function Header(props) {
  return (
    <>
      <h1 className="mt-4 d-flex align-items-center">{props.icon} {props.title}</h1>
    </>
  );
}


export default Header;
