import { twMerge } from "tailwind-merge";

interface IAiBoxProps {
    children: React.ReactNode;
    className?: string;
}

const AiBox: React.FC<IAiBoxProps> = ({
    children,
    className
}) => {
    return (
        <div className={twMerge(`bg-neutral-900 rounded-lg overflow-y-auto h-full`, className)}>
            {children}
        </div>
    )
}

export default AiBox