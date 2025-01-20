'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import DynamicStep from '@/components/onboarding/DynamicStep';
import useUserState from '@/store/userStore';
import { useRouter } from 'next/navigation';

function omitId(userData: UserData): Omit<UserData, 'id'> {
  return {
    email: userData.email,
    password: userData.password,
    streetAddress: userData.streetAddress,
    city: userData.city,
    state: userData.state,
    zipCode: userData.zipCode,
    birthdate: userData.birthdate,
    aboutMe: userData.aboutMe,
    stepNumber: userData.stepNumber
  };
}

async function getOnBoardingConfig() {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/onboarding_config', {
    method: 'GET'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

async function saveUserData(data: UserData, updateUserData: (patch: Partial<UserData>) => void) {
  const userDataToSend = omitId(data);

  let res: Response;

  if (data.id) {
    res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/users/${data.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDataToSend),
    });
  } else {
    res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDataToSend),
    });
  }

  if (res && res.ok) {
    const responseData = await res.json();
    updateUserData({ ...responseData[0] });

    toast.success('Data saved successfully!');
  } else {
    toast.error('Failed to save data.');
  }
}


async function getUserByCredentials(data: UserData, updateUserData: (patch: Partial<UserData>) => void, router, setCurrentStep: (step: number) => void) {
  const userDataToSend = omitId(data);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/users/check`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userDataToSend),
  });

  if (res && res.ok) {
    const responseData = await res.json();

    if (responseData[0]) {
      updateUserData({ ...responseData[0] });

      if(responseData.length === 0) {
        return false;
      }

      if(responseData[0].stepNumber === 4) {
        router.push('/data');

        return toast.success('You have already onboarded!');
      } else {
        setCurrentStep(responseData[0].stepNumber);
      }

      toast.success('Found your saved progress!');

      return true;
    }

  } else {
    toast.error('Failed to find saved progress.');
  }

  return false;
}

export default function Home() {
  const [ currentStep, setCurrentStep ] = useState(1);
  const [ onboardingConfig, setOnboardingConfig ] = useState(null);
  const { userData, updateUserData } = useUserState();
  const router = useRouter();

  useEffect(() => {
    async function fetchConfig() {
      const config = await getOnBoardingConfig();
      setOnboardingConfig(config[0]);
    }

    fetchConfig();

    const numDots = 50;
    const backgroundDots = document.getElementById('background-dots');

    if (backgroundDots) {
      for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.left = `${Math.random() * 100}vw`;
        dot.style.top = `${Math.random() * 100}vh`;
        dot.style.animationDelay = `${Math.random() * 2}s`;
        backgroundDots.appendChild(dot);
      }
    }
  }, []);

  if (!onboardingConfig) {
    return <p>Loading onboarding configuration...</p>;
  }

  const { stepOne, stepTwo, stepThree } = onboardingConfig;

  const handleNextStep = async () => {
    let currentStepComponents: string[] = [];

    if (onboardingConfig) {
      if (currentStep === 1) {
        currentStepComponents = stepOne;
      } else if (currentStep === 2) {
        currentStepComponents = stepTwo;
      } else if (currentStep === 3) {
        currentStepComponents = stepThree;
      }
    }

    const componentFieldMap: { [key: string]: (keyof UserData)[] } = {
      Credentials: ['email', 'password'],
      Address: ['streetAddress', 'city', 'state', 'zipCode'],
      Birthdate: ['birthdate'],
      AboutMe: ['aboutMe'],
    };

    const requiredFields: (keyof UserData)[] = [];

    currentStepComponents.forEach((componentName: string) => {
      if (componentFieldMap[componentName]) {
        requiredFields.push(...componentFieldMap[componentName]);
      }
    });

    const missingFields = requiredFields.filter((field) => !userData[field]);

    if (missingFields.length > 0) {
      return toast.warning('Please enter the following information: ' + missingFields.join(', ') + '!');
    }

    if (currentStep === 1) {
      const foundUser = await getUserByCredentials(userData, updateUserData, router, setCurrentStep);

      if (!foundUser) {
        const nextStep = currentStep + 1;
        updateUserData({ stepNumber: nextStep });
        const userDataWithNextStep = { ...userData, stepNumber: nextStep };

        await saveUserData(userDataWithNextStep, updateUserData);
        setCurrentStep((prevStep) => prevStep + 1);
      }
    } else {
      const nextStep = currentStep + 1;
      updateUserData({ stepNumber: nextStep });
      const userDataWithNextStep = { ...userData, stepNumber: nextStep };

      await saveUserData(userDataWithNextStep, updateUserData);

      if (currentStep < 3) {
        setCurrentStep((prevStep) => prevStep + 1);
      } else if (currentStep === 3) {
        router.push('/data');
      }
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary-500 py-16 sm:py-16">

      {/* Step indicators */}
      <div className="flex items-center justify-between w-full max-w-md mb-8 text-2xl">
        {[1, 2, 3].map((step) => (
          <div key={step} className={`${step !== 3 && 'flex-1'} flex items-center`}>
            <div className={`rounded-full h-10 w-10 flex items-center justify-center ${currentStep >= step ? 'bg-accent-500 text-primary-500 shadow' : 'bg-tertiary-500 text-gray-500'}`}>
              {step}
            </div>
            {step < 3 && (
              <div className={`flex-1 h-1 ${currentStep > step ? 'bg-primary-500' : 'bg-tertiary-500'}`}></div>
            )}
          </div>
        ))}
      </div>

      {/* Onboarding steps */}
      <div className="px-8 pt-6 pb-8 mb-16 h-[300px]">
        {currentStep === 1 && <DynamicStep componentNames={stepOne} />}
        {currentStep === 2 && <DynamicStep componentNames={stepTwo} />}
        {currentStep === 3 && <DynamicStep componentNames={stepThree} />}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between max-w-md">
        <button
          onClick={handlePreviousStep}
          disabled={currentStep === 1}
          className="bg-accent-500 hover:bg-accent-600 text-primary-500 font-bold py-2 px-4 w-36 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          Previous
        </button>

        <button
          onClick={handleNextStep}
          className="bg-accent-500 hover:bg-accent-600 text-primary-500 font-bold py-2 px-4 w-36 rounded focus:outline-none focus:shadow-outline ml-4"
          disabled={!onboardingConfig}
        >
          {currentStep === 3 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
}
