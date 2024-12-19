'use client';

import { useState } from "react";
import { UserProfile } from "./interface/UserProfile";

const Profile: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile>({
      name: 'John Doe',
      email: 'john.doe@example.com',
      bio: 'Software developer with a passion for building efficient and scalable web applications.',
      joinedDate: 'January 1, 2023',
    });
  
    return (
      <main className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Profile</h1>
  
          <div className="flex flex-col items-center gap-4">
            <img
              src="/profile-placeholder.png"
              alt="Profile Picture"
              className="w-32 h-32 rounded-full shadow-lg"
            />
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-700">{profile.name}</h2>
              <p className="text-gray-500">{profile.email}</p>
            </div>
          </div>
  
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-gray-600 font-medium">Bio:</span>
              <span className="text-gray-800">{profile.bio}</span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-gray-600 font-medium">Joined:</span>
              <span className="text-gray-800">{profile.joinedDate}</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300"
              onClick={() => alert('Edit Profile')}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </main>
    );
  };
  
  export default Profile;