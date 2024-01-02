import { Step } from "../db/schema"

export default function steps({steps}: {steps: Array<Step>}) {
    return (
        <ul class="inline-block">
            {
                steps.map((step, i) => (
                    <li class="flex items-start">
                        <div class="ml-4">
                            <h2 class="text-xl font-bold">步驟{i+1}：{step.title}</h2>
                            <p class="mt-1 text-base text-gray-500">
                                {step.description}
                            </p>
                        </div>
                    </li>    
                ))
            }
       </ul>
    )
}