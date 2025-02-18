'use client'
import React from 'react';

export function StatusDisplay({ status, error }) {
  const getStatusMessage = () => {
    const messages = {
      idle: 'Ready to verify location',
      'getting-location': 'Getting your location...',
      'generating-proof': 'Generating zero-knowledge proof...',
      'server-verifying': 'Verifying proof on server...', // Added new status
      success: 'Location verified successfully! ✨',
      error: error || 'An error occurred'
    };
    return messages[status] || 'Unknown status';
  };

  const getStatusColor = () => {
    const colors = {
      idle: 'text-blue-300',
      'getting-location': 'text-blue-400',
      'generating-proof': 'text-blue-500',
      'server-verifying': 'text-blue-500', // Added new status
      success: 'text-green-400',
      error: 'text-red-400'
    };
    return colors[status] || 'text-blue-300';
  };

  const getBackgroundColor = () => {
    if (status === 'error') return 'bg-red-900/20';
    if (status === 'success') return 'bg-green-900/20';
    return 'bg-blue-900/20'; // Updated to blue background for non-error statuses
  };

  if (status === 'idle') return null;

  return (
    <div className={`mt-4 p-3 rounded-lg backdrop-blur-sm border ${
      status === 'error' ? 'border-red-500/20' : 'border-blue-500/20'
    } ${getBackgroundColor()}`}>
      <p className={`${getStatusColor()} font-caudex text-center`}>
        {getStatusMessage()}
      </p>
    </div>
  );
}
