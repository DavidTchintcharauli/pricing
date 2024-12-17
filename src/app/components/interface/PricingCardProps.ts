interface PricingCardProps {
    title: string;
    description: string;
    price: string;
    buttonText: string;
    isCurrentPlan?: boolean;
    onButtonClick?: () => void;
}