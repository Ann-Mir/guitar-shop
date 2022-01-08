import './spinner.css';

function Spinner(): JSX.Element {
  return (
    <div className="spinner">
      <div className="spinner-dual">
        <div className="spinner-dual"></div>
      </div>
    </div>
  );
}

export default Spinner;
