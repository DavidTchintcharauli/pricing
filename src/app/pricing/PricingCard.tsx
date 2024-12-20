'use client';

import { PricingCardProps } from "./interface/PricingCardProps";

const PricingCard: React.FC<PricingCardProps> = ({
    title,
    description,
    price,
    buttonText,
    isCurrentPlan = false,
    onButtonClick,
}) => {
    return (
        <div className="border rounded-lg shadow-md p-6 text-center bg-white hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="text-4xl font-bold mb-6">
                {price}
                {price !== '$0' && <span className="text-sm text-gray-500">/month</span>}
            </div>
            <button
                onClick={onButtonClick}
                disabled={isCurrentPlan}
                aria-disabled={isCurrentPlan}
                className={`w-full py-2 px-4 rounded-lg ${
                    isCurrentPlan
                        ? 'bg-gray-400 cursor-not-allowed text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
            >
                {isCurrentPlan ? 'Current Plan' : buttonText}
            </button>
        </div>
    );
};

export default PricingCard;