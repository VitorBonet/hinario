"use client"

import React from 'react';
import { useTransition, animated } from '@react-spring/web'

import Toast from './Toast';

import { ToastMessage, useToast } from '../../contexts/ToastContext';

interface ToastContainerProps {
  messages: ToastMessage[],
}

export default function ToastContainer({ messages }: ToastContainerProps) {
  const transitions = useTransition(
    messages,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '-0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    }
  )

  return (
    <div className='fixed right-0 top-[2rem] p-8 overflow-hidden z-10'>
      
      {transitions((style, item, t, index) => (
        <animated.div>
          <Toast key={item.id} style={style} message={item} />
        </animated.div>
      ))} 
    </div>
  );
}