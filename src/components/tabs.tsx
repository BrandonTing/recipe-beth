export type TabProps = {
    label: string
    type: string
    active: boolean
}
const TabList: Array<Omit<TabProps, "active">> = [
    {
      label: "原料清單",
      type: "ingredients"
    },
    {
      label: "步驟",
      type: "steps"
    },
    {
      label: "參考資料",
      type: "references"
    }
  
  ]
  
function Tab ({label, active, type}: TabProps) {
    const activeClass = active ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500" : "border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
    return (
        <li 
            hx-get={`/api/detail/content/1?type=${type}`}
            hx-target="closest div"
            hx-swap="innerHTML"
            class={`${activeClass} cursor-pointer inline-block rounded-t-lg border-b-2  p-4`}
        >
            {label}
        </li>
    )
}
export default function Tabs ({activeType}: {activeType: string}) {
    {/* tabs for ingredients, seasonings, steps, reference, etc */}
    return (
        <ul class="-mb-px flex justify-center gap-2 border-b border-gray-200 text-center text-base font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
            {
                TabList.map(({type, label}) => (
                    <Tab label={label} type={type} active={type===activeType} />
                ))
            }
        </ul>
    )
}