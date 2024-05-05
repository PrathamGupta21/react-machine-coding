import './styles.css';

const AccordionItem = ({ title, content, isOpen, onToggle }) => {
  return (
    <div className='accordion-item'>
      <div className='accordion-header' onClick={onToggle}>
        {title}
        <span className='accordion-toggle'>{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && <div className='accordion-content'>{content}</div>}
    </div>
  );
};

export default AccordionItem;
