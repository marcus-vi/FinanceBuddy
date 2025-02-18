function BlueButton(props) {
  return (
    <>
      <button
        type="button"
        className={`bg-blue-500 text-white font-bold py-2 px-4 rounded  hover:bg-blue-700 focus:bg-blue-800 cursor-pointer ${props.className}`} // Corrigir interpolação
        onClick={props.onClick}
      >
        {props.text}
      </button>
    </>
  );
}

export default BlueButton;