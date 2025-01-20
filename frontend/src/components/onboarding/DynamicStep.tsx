import React from 'react';
import Credentials from './Credentials';
import AboutMe from './AboutMe';
import Address from './Address';
import Birthdate from './Birthdate';

const componentMap: ComponentMap = {
  'Credentials': <Credentials />,
  'Address': <Address />,
  'AboutMe': <AboutMe />,
  'Birthdate': <Birthdate />
};

function DynamicStep({ componentNames }: { componentNames: string[] }) {
  return (
    <div className='flex flex-row mx-auto mb-8 justify-center'>
      {
        componentNames.map((componentName, index) => (
          <div key={componentName} className={index > 0 ? 'ml-5' : ''}>
            {componentMap[componentName]}
          </div>
        ))
      }
    </div>
  );
}

export default DynamicStep;
