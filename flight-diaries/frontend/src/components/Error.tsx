function Error(props: { errorMsg: string }) {
  return <p style={{ color: 'red' }}>{props.errorMsg}</p>;
}

export default Error;