'use client'

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import DynamicStep from '@/components/onboarding/DynamicStep';

async function getOnBoardingConfig() {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/onboarding_config', {
    method: 'GET'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const AdminPage = () => {
  const [configId, setConfigId] = useState(null);
  const [components, setComponents] = useState<{ [key: string]: string[] }>({ stepOne: [], stepTwo: [], stepThree: [] });

  const stepKeys = ['stepOne', 'stepTwo', 'stepThree'];

  useEffect(() => {
    async function fetchConfig() {
      const config = await getOnBoardingConfig();

      setConfigId(config[0]?.id);

      setComponents({
        stepOne: config[0]?.stepOne || [],
        stepTwo: config[0]?.stepTwo || [],
        stepThree: config[0]?.stepThree || [],
      });
    }

    fetchConfig();
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const start = components[source.droppableId as keyof typeof components];
    const finish = components[destination.droppableId as keyof typeof components];

    if (source.droppableId === destination.droppableId) {
      const newItems = Array.from(start);
      const [removed] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, removed);

      setComponents({
        ...components,
        [source.droppableId]: newItems,
      });
      return;
    }

    const startItems = Array.from(start);
    const [removed] = startItems.splice(source.index, 1);
    const finishItems = Array.from(finish);
    finishItems.splice(destination.index, 0, removed);

    setComponents({
      ...components,
      [source.droppableId]: startItems,
      [destination.droppableId]: finishItems,
    });
  };

  function omitId(onboardingConfigData: OnboardingConfigData): Omit<OnboardingConfigData, 'id'> {
    return {
      stepOne: onboardingConfigData.stepOne,
      stepTwo: onboardingConfigData.stepTwo,
      stepThree: onboardingConfigData.stepThree
    };
  }

  async function saveOrder() {
    if (!components.stepOne.includes('Credentials')) {
      toast.warn('Credentials must remain in the first step!');
      return;
    }

    if (components.stepOne.length === 0 || components.stepTwo.length === 0 || components.stepThree.length === 0) {
      toast.warn('Please ensure each step has at least one component.');
      return;
    }

    const onboardingConfigDataToSend = omitId(components);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/onboarding_config/${configId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(onboardingConfigDataToSend),
    });

    if (res && res.ok) {
      toast.success('Config saved successfully!');
    } else {
      toast.error('Failed to save config.');
    }
  }

  return (
    <div className='pt-16'>
      <h1 className='text-3xl font-bold text-primary-500 text-center mt-8'>Admin Page</h1>
      <p className='text-1xl font-bold text-primary-500 text-center mb-4'>Drag and drop components to reorder them!</p>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className='flex flex-row'>
          {stepKeys.map((key, index) => (
            <Droppable key={key} droppableId={key} isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={false}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className='w-full bg-primary-200 shadow-lg rounded p-4 m-4'
                >
                  <h3 className='text-primary-500 text-2xl font-bold mb-4 text-center'>
                    {`Step ${index + 1}`}
                  </h3>

                  {components[key].map((component, index) => (
                    <Draggable key={component} draggableId={component} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <DynamicStep componentNames={[component]} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <button
        onClick={saveOrder}
        className='bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded mx-auto flex w-72 mt-10 justify-center'
      >
        Save
      </button>
    </div>
  );
};

export default AdminPage;
