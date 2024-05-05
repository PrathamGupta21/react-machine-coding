import { useState } from 'react';
import AccordionItem from './AccordionItem';
import questions from './data';

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
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
  );
};

export default Accordion;
