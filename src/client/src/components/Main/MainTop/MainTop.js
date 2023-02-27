import './MainTop.css';

export const MainTop = ({
  onButtonClick
}) => {
  return (
    <div className="top-part">
      <button onClick={() => onButtonClick(true)} className="add-post">Add new post</button>
    </div>
  );
};
