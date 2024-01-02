export interface TabProps {
    label: string;
    type: string;
    active: boolean;
}

export default function ({ label, active, type }: TabProps) {
    const activeClass = active
        ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
        : "border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300";
    return (
        <li
            hx-get={`/api/detail/content/1?type=${type}`}
            hx-target="next div"
            hx-swap="innerHTML"
            class={`${activeClass} inline-block cursor-pointer rounded-t-lg border-b-2  p-4`}
        >
            {label}
        </li>
    );
}
