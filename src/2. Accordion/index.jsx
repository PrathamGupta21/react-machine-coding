import { useState } from 'react';
import AccordionItem from './AccordionItem';
import questions from './data';
import './styles.css';

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <h1>Accordion</h1>
      <div className='accordion'>
        {questions.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            content={item.info}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </>
  );
};

export default Accordion;
