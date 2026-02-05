import { LucideProps } from 'lucide-react';
import { iconMap } from '@/app/lib/iconLibrary';

interface AppIconProps extends LucideProps {
    name: string;
}

export function AppIcon({ name, ...props }: AppIconProps) {
    const IconComponent = iconMap[name];

    if (!IconComponent) {
        return null; // or return a fallback icon like <HelpCircle {...props} />
    }

    return <IconComponent {...props} />;
}
