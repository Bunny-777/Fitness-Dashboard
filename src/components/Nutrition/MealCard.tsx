// import React from 'react';
// import { Edit2, Plus } from 'lucide-react';
// import { MealData } from '../../types';

// interface MealCardProps {
//   meal: MealData;
//   isRecommended?: boolean;
// }

// const MealCard: React.FC<MealCardProps> = ({ meal, isRecommended = false }) => {
//   const getIconElement = () => {
//     return <span className="text-2xl">{meal.icon}</span>;
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 cursor-pointer">
//       <div className="flex items-start justify-between mb-4">
//         <div className={`w-12 h-12 rounded-full flex items-center justify-center ${meal.color}`}>
//           {getIconElement()}
//         </div>
//         <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200">
//           <Edit2 className="w-4 h-4" />
//         </button>
//       </div>

//       <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{meal.type}</h3>
      
//       {isRecommended ? (
//         <>
//           <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Recommended</p>
//           <div className="text-2xl font-bold text-gray-400 dark:text-gray-500 mb-4">{meal.calories} kcal</div>
//           <button className="w-full bg-orange-100 text-orange-600 py-3 rounded-lg font-medium hover:bg-orange-200 transition-colors duration-200 flex items-center justify-center space-x-2">
//             <Plus className="w-4 h-4" />
//             <span>ADD MENU</span>
//           </button>
//         </>
//       ) : (
//         <>
//           <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{meal.name}</p>
//           <div className="text-2xl font-bold text-gray-900 dark:text-white">
//             <span>{meal.calories}</span>
//             <span className="text-sm font-medium text-gray-500 dark:text-gray-400 ml-1">kcal</span>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default MealCard;


// import React, { useState } from "react";
// import { Edit2, Plus, Check, X } from "lucide-react";
// import { MealData } from "../../types";

// interface MealCardProps {
//   meal: MealData;
//   isRecommended?: boolean;
//   onSave?: (updatedMeal: MealData) => void;
// }

// const MealCard: React.FC<MealCardProps> = ({
//   meal,
//   isRecommended = false,
//   onSave,
// }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedMeal, setEditedMeal] = useState<MealData>(meal);

//   const handleChange = (field: keyof MealData, value: string | number) => {
//     setEditedMeal({ ...editedMeal, [field]: value });
//   };

//   const handleSave = () => {
//     setIsEditing(false);
//     onSave?.(editedMeal);
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 cursor-pointer">
//       <div className="flex items-start justify-between mb-4">
//         <div
//           className={`w-12 h-12 rounded-full flex items-center justify-center ${meal.color}`}
//         >
//           <span className="text-2xl">{meal.icon}</span>
//         </div>

//         {!isEditing ? (
//           <button
//             className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
//             onClick={() => setIsEditing(true)}
//           >
//             <Edit2 className="w-4 h-4" />
//           </button>
//         ) : (
//           <div className="flex space-x-2">
//             <button
//               className="p-1 text-green-500 hover:text-green-700"
//               onClick={handleSave}
//             >
//               <Check className="w-4 h-4" />
//             </button>
//             <button
//               className="p-1 text-red-500 hover:text-red-700"
//               onClick={() => {
//                 setIsEditing(false);
//                 setEditedMeal(meal);
//               }}
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         )}
//       </div>

//       {!isEditing ? (
//         <>
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//             {meal.type}
//           </h3>

//           {isRecommended ? (
//             <>
//               <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
//                 Recommended
//               </p>
//               <div className="text-2xl font-bold text-gray-400 dark:text-gray-500 mb-4">
//                 {meal.calories} kcal
//               </div>
//               <button className="w-full bg-orange-100 text-orange-600 py-3 rounded-lg font-medium hover:bg-orange-200 transition-colors duration-200 flex items-center justify-center space-x-2">
//                 <Plus className="w-4 h-4" />
//                 <span>ADD MENU</span>
//               </button>
//             </>
//           ) : (
//             <>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
//                 {meal.name}
//               </p>
//               <div className="text-2xl font-bold text-gray-900 dark:text-white">
//                 <span>{meal.calories}</span>
//                 <span className="text-sm font-medium text-gray-500 dark:text-gray-400 ml-1">
//                   kcal
//                 </span>
//               </div>
//             </>
//           )}
//         </>
//       ) : (
//         // Editable fields
//         <div className="space-y-3">
//           <input
//             type="text"
//             value={editedMeal.type}
//             onChange={(e) => handleChange("type", e.target.value)}
//             className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
//           />
//           {!isRecommended && (
//             <input
//               type="text"
//               value={editedMeal.name}
//               onChange={(e) => handleChange("name", e.target.value)}
//               className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
//             />
//           )}
//           <input
//             type="number"
//             value={editedMeal.calories}
//             onChange={(e) => handleChange("calories", Number(e.target.value))}
//             className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default MealCard;


import React, { useState } from "react";
import { Edit2, Check, X } from "lucide-react";
import { MealData } from "../../types";

interface MealCardProps {
  meal: MealData;
  onSave?: (updatedMeal: MealData) => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMeal, setEditedMeal] = useState<MealData>(meal);

  const handleChange = (field: keyof MealData, value: string | number) => {
    setEditedMeal({ ...editedMeal, [field]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    onSave?.(editedMeal);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${meal.color}`}
        >
          <span className="text-2xl">{meal.icon}</span>
        </div>

        {!isEditing ? (
          <button
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            onClick={() => setIsEditing(true)}
          >
            <Edit2 className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              className="p-1 text-green-500 hover:text-green-700"
              onClick={handleSave}
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              className="p-1 text-red-500 hover:text-red-700"
              onClick={() => {
                setIsEditing(false);
                setEditedMeal(meal);
              }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {!isEditing ? (
        <>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {meal.type}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {meal.name}
          </p>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            <span>{meal.calories}</span>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 ml-1">
              kcal
            </span>
          </div>
        </>
      ) : (
        // Editable fields
        <div className="space-y-3">
          <input
            type="text"
            value={editedMeal.type}
            onChange={(e) => handleChange("type", e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          <input
            type="text"
            value={editedMeal.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          <input
            type="number"
            value={editedMeal.calories}
            onChange={(e) => handleChange("calories", Number(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
      )}
    </div>
  );
};

export default MealCard;
